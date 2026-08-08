import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Check, ShieldCheck, Lock, 
  Info, AlertCircle, Loader2, Box, User, Monitor, Rocket, GraduationCap
} from 'lucide-react';
import { CONTESTS } from '../data/contests';
import { paymentService } from '../services/payment';
import { supabase } from '../lib/supabase';
import type { ContestConfig } from '../types/contest';

// We won't import the standard Header/Footer to keep this a focused onboarding flow,
// similar to Stripe or Linear. A simple brand header is better for checkout/registration.

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse initial contest from URL
  const [selectedContestIds, setSelectedContestIds] = useState<string[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contestParam = params.get('contest');
    if (contestParam) {
      const valid = CONTESTS.find(c => c.id === contestParam && c.status !== 'COMING_SOON');
      if (valid) setSelectedContestIds([valid.id]);
    }

    // Referral Tracking Logic
    const refParam = params.get('ref');
    if (refParam) {
      // Save for when they successfully pay
      sessionStorage.setItem('referral_code', refParam);
      
      // Fire click increment
      const incrementClick = async () => {
        try {
          await supabase.rpc('increment_click', { ref_code: refParam });
        } catch (e) {
          console.error("Failed to track click", e);
        }
      };
      // We only want to fire it once per session to avoid refreshing abuse
      if (!sessionStorage.getItem('click_tracked_' + refParam)) {
        incrementClick();
        sessionStorage.setItem('click_tracked_' + refParam, 'true');
      }
    }
  }, [location.search]);

  const selectedContests = useMemo(() => {
    return CONTESTS.filter(c => selectedContestIds.includes(c.id));
  }, [selectedContestIds]);

  const toggleContest = (id: string) => {
    setSelectedContestIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
    if (errors.contest) setErrors(prev => ({ ...prev, contest: undefined } as any));
  };

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    role: '' as 'student' | 'professional' | '',
    collegeCompany: '',
    linkedin: '',
    portfolio: '',
    github: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedContestIds.length === 0) newErrors.contest = 'Please select at least one contest to register for.';
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid email required';
    
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.country.trim()) newErrors.country = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.role) newErrors.role = 'Please select your role';
    
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the Terms & Conditions to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on type
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined } as any));
    }
  };

  const fee = selectedContests.reduce((sum, c) => sum + (c.registrationFee || 0), 0);
  const currency = selectedContests[0]?.currency || 'INR';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || selectedContests.length === 0) return;

    setIsSubmitting(true);
    try {
      // 1. Create Order via our abstracted payment service
      const receiptId = `rcpt_${Math.random().toString(36).substring(7)}`;
      const amount = fee;
      
      const order = await paymentService.createOrder(amount, currency, receiptId);
      
      // 2. Initialize Payment Gateway (Mocking Razorpay flow)
      const paymentDetails = await paymentService.initializePayment(order, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      });

      // 3. Verify Payment
      const isVerified = await paymentService.verifyPayment(paymentDetails);

      if (isVerified) {
        // Success! Navigate to success page with state payload
        navigate('/register/success', {
          state: {
            registrationId: `REG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            contestName: selectedContests.length > 1 ? `${selectedContests.length} Contests` : selectedContests[0].title,
            participantName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            paymentStatus: amount > 0 ? 'Completed' : 'Free Entry',
            amount,
            currency
          }
        });
      } else {
        setErrors({ submit: 'Payment verification failed. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'An error occurred during registration. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatCurrency = (amt: number) => {
    if (amt === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(amt);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-purple-200">
      
      {/* Minimal Brand Header */}
      <header className="w-full bg-white border-b border-gray-100 py-6 px-6 md:px-12 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          <span className="font-futuristic font-bold text-xl tracking-tighter text-[#1e2335]">
            GLOBAL<span className="text-purple-600">TALENT</span>HUNT
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 tracking-widest uppercase">
          <Lock className="w-4 h-4" /> Secure Registration
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <div className="mb-12 max-w-2xl text-left">
          <h1 className="text-4xl md:text-[40px] font-sans font-bold text-gray-900 tracking-tight mb-3">
            Register for Global Challenges
          </h1>
          <p className="text-base text-gray-500 font-medium">
            Join exciting competitions. Showcase your talent. Win big.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              {/* SECTION 1: CHOOSE CONTEST */}
              <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase flex items-center gap-2">
                      <span className="text-purple-600">01.</span> Select Contests
                    </h2>
                    {errors.contest && <span className="text-xs font-semibold text-red-500">{errors.contest}</span>}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Choose one or more contests you want to participate in.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONTESTS.map(contest => {
                    const isSelected = selectedContestIds.includes(contest.id);
                    const isComingSoon = contest.status === 'COMING_SOON';
                    const feeText = contest.registrationFee === 0 ? 'Free' : `₹${contest.registrationFee}`;
                    
                    const getIcon = () => {
                      if (contest.id.includes('ai') || contest.id.includes('asset')) return <Box className="w-5 h-5 text-blue-500" />;
                      if (contest.id.includes('character')) return <User className="w-5 h-5 text-blue-500" />;
                      if (contest.id.includes('ui-ux') || contest.id.includes('web')) return <Monitor className="w-5 h-5 text-blue-500" />;
                      if (contest.id.includes('job') || contest.id.includes('career')) return <Rocket className="w-5 h-5 text-blue-500" />;
                      return <GraduationCap className="w-5 h-5 text-gray-400" />;
                    };

                    const getBadge = () => {
                      if (isComingSoon) return <span className="mt-3 inline-block px-2 py-1 bg-gray-100 text-gray-500 text-[9px] font-bold tracking-widest uppercase rounded">Coming Soon</span>;
                      if (contest.id === 'ai-innovation-contest') return <span className="mt-3 inline-block px-2 py-1 bg-purple-100 text-purple-700 text-[9px] font-bold tracking-widest uppercase rounded">Highest Prize</span>;
                      return null;
                    };

                    return (
                      <button
                        key={contest.id}
                        type="button"
                        disabled={isComingSoon}
                        onClick={() => toggleContest(contest.id)}
                        className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col group min-h-[160px]
                          ${isComingSoon ? 'opacity-50 cursor-not-allowed bg-gray-50/50 border-gray-100' : 'cursor-pointer bg-white'}
                          ${isSelected ? `border-purple-500 shadow-md shadow-purple-500/10` : 'border-gray-200 hover:border-gray-300'}
                        `}
                      >
                        <div className="flex items-start gap-3 w-full mb-4">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 transition-colors
                            ${isSelected ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}
                          `}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isComingSoon ? 'bg-gray-100' : 'bg-blue-50'}`}>
                            {getIcon()}
                          </div>
                        </div>

                        <div className="flex flex-col gap-0.5 mt-auto">
                          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-tight">
                            {contest.title}
                          </h3>
                          <span className="text-xs text-gray-500 font-medium">
                            {contest.category}
                          </span>
                          <span className="text-sm font-bold text-gray-900 mt-2">
                            {feeText}
                          </span>
                          {getBadge()}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100 mt-2">
                  <Info className="w-4 h-4" />
                  You can select multiple contests. Total fee will be calculated automatically.
                </div>
              </section>

              {/* SECTION 2: PARTICIPANT DETAILS */}
              <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase flex items-center gap-2">
                      <span className="text-purple-600">02.</span> Participant Details
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Please fill in your details accurately.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} error={errors.firstName} required placeholder="Enter first name" />
                  <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} error={errors.lastName} required placeholder="Enter last name" />
                  
                  <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} required placeholder="Enter email address" />
                  
                  {/* Phone Number Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-center rounded-xl border ${errors.phone ? 'border-red-300 ring-4 ring-red-50 bg-white' : 'border-gray-200 bg-white focus-within:border-black focus-within:ring-4 focus-within:ring-gray-100'} transition-all overflow-hidden`}>
                      <div className="flex items-center gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50 shrink-0">
                        <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-auto rounded-sm shadow-sm" />
                        <span className="text-sm font-medium text-gray-700">+91</span>
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 text-gray-900 text-sm font-medium outline-none bg-transparent"
                      />
                    </div>
                    {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
                  </div>
                  
                  {/* Country, State, City Row */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          name="country" 
                          value={formData.country || ''} 
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200 focus:border-black focus:ring-4 focus:ring-gray-100'} bg-white text-gray-900 text-sm font-medium transition-all outline-none appearance-none`}
                        >
                          <option value="" disabled>Select country</option>
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                        </select>
                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                      {errors.country && <span className="text-[10px] text-red-500 font-semibold">{errors.country}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                        State <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          name="state" 
                          value={(formData as any).state || ''} 
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${(errors as any).state ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200 focus:border-black focus:ring-4 focus:ring-gray-100'} bg-white text-gray-900 text-sm font-medium transition-all outline-none appearance-none`}
                        >
                          <option value="" disabled>Select state</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Delhi">Delhi</option>
                        </select>
                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>

                    <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} required placeholder="Enter city" />
                  </div>

                  {/* Role & College */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.role ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200 focus:border-black focus:ring-4 focus:ring-gray-100'} bg-white text-gray-900 text-sm font-medium transition-all outline-none appearance-none`}
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                      </select>
                      <svg className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {errors.role && <span className="text-[10px] text-red-500 font-semibold">{errors.role}</span>}
                  </div>

                  <InputField label="College / Company" name="collegeCompany" value={formData.collegeCompany} onChange={handleInputChange} placeholder="Enter college or company" required />
                  
                  {/* Social Links */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 pt-4 border-t border-gray-50">
                    <InputField label="LinkedIn Profile (Optional)" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" />
                    <InputField label="Portfolio / Website (Optional)" name="portfolio" value={formData.portfolio} onChange={handleInputChange} placeholder="https://yourportfolio.com" />
                    <InputField label="GitHub Profile (Optional)" name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/username" />
                  </div>
                </div>
              </section>

              {/* SECTION 3: TERMS & CONDITIONS */}
              <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase flex items-center gap-2">
                      <span className="text-purple-600">03.</span> Terms & Conditions
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all duration-200
                      ${termsAccepted ? 'bg-purple-600 border-2 border-purple-600' : 'bg-white border-2 border-gray-300'}
                    `} onClick={() => !termsAccepted && setIsTermsModalOpen(true)}>
                      <Check className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${termsAccepted ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    I have read and agree to the <button type="button" onClick={() => setIsTermsModalOpen(true)} className="text-purple-600 hover:text-purple-700 underline underline-offset-2">Terms & Conditions.</button> <span className="text-red-500">*</span>
                  </span>
                </div>
              </section>

              {/* SECURE INFO BANNER */}
              <div className="flex items-center justify-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm mt-2 text-xs font-medium text-gray-600">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                Your information is secure and will only be used for contest communication.
              </div>
            </div>

            {/* RIGHT COLUMN: REGISTRATION SUMMARY */}
            <div className="lg:col-span-2 relative">
              <div className="sticky top-24 flex flex-col gap-6">
                {errors.submit && (
                  <div className="w-full p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 shadow-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{errors.submit}</p>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                
                <h3 className="font-bold text-[11px] text-gray-900 uppercase tracking-[0.2em]">
                  Registration Summary
                </h3>
                
                {selectedContests.length > 0 ? (
                  <>
                    <div className="bg-[#0b0f19] rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden shadow-lg shadow-black/10">
                      {/* Decorative gradient glow inside the card */}
                      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-purple-600/20 to-transparent blur-2xl" />
                      
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 relative z-10">
                        <img src="/favicon.svg" alt="Fundfy" className="w-6 h-6 object-contain" />
                      </div>
                      
                      <div className="flex flex-col justify-center relative z-10 h-full">
                        <span className="text-base font-bold text-white leading-tight">Selected Contests</span>
                        <span className="text-xs font-medium text-gray-400 mt-0.5">{selectedContests.length} {selectedContests.length === 1 ? 'contest' : 'contests'} selected</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                        FEE BREAKDOWN
                      </span>
                      <div className="flex flex-col gap-3">
                        {selectedContests.map(c => (
                          <div key={c.id} className="flex justify-between items-start gap-4">
                            <span className="text-sm font-bold text-gray-900 leading-tight">{c.title}</span>
                            <span className="text-sm font-medium text-gray-600 shrink-0">₹{c.registrationFee}</span>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center gap-4 mt-2">
                          <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                            Processing Fee <Info className="w-3.5 h-3.5 text-gray-400" />
                          </span>
                          <span className="text-sm font-medium text-gray-500 shrink-0">₹0</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 border-dashed" />

                    <div className="flex justify-between items-end gap-4">
                      <span className="text-[10px] font-bold text-gray-900 tracking-[0.2em] uppercase mb-1.5">
                        TOTAL AMOUNT
                      </span>
                      <span className="text-4xl font-sans font-bold text-gray-900 tracking-tight">
                        ₹{fee}
                      </span>
                    </div>

                    <div className="border-t border-gray-100 border-dashed" />

                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                        YOUR REGISTRATION INCLUDES
                      </span>
                      <ul className="flex flex-col gap-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Lifetime JobFinderAI Premium</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Official Participation Certificate</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Access to Judging & Evaluation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Eligibility for Grand Prizes</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Exclusive Updates & Opportunities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Secure payments powered by <span className="text-purple-700 italic">Razorpay</span></span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || selectedContests.length === 0 || !termsAccepted}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300
                          ${isSubmitting || selectedContests.length === 0 || !termsAccepted
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-purple-700 text-white hover:bg-purple-800 hover:shadow-xl hover:shadow-purple-700/20 hover:-translate-y-0.5'
                          }
                        `}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span className="text-[13px] font-bold tracking-widest uppercase">PROCEED TO PAYMENT</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                      
                      <div className="text-center text-xs text-gray-400 mt-1">
                        You will be redirected to a secure payment page
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-12 border border-gray-100 text-sm text-gray-400 font-medium italic text-center bg-gray-50 rounded-xl">
                    Select a contest to view details.
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
        </form>
      </main>

      <AnimatePresence>
        {isTermsModalOpen && (
          <TermsModal
            onClose={() => setIsTermsModalOpen(false)}
            onAccept={() => {
              setTermsAccepted(true);
              setIsTermsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Reusable Input Field Component matching editorial aesthetics
function InputField({ label, name, value, onChange, type = "text", error, required, placeholder, className = "" }: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide flex justify-between">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 ring-4 ring-red-50 bg-white' : 'border-gray-200 bg-white focus:border-black focus:ring-4 focus:ring-gray-100'} text-gray-900 text-sm font-medium transition-all outline-none`}
      />
      {error && <span className="text-[10px] text-red-500 font-semibold">{error}</span>}
    </div>
  );
}

// Reusable Checkbox Component
function Checkbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          className="peer sr-only"
        />
        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
          ${checked ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-gray-400'}
        `}>
          <Check className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
        </div>
      </div>
      <span className={`text-sm font-medium select-none transition-colors duration-200 ${checked ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
        {label}
      </span>
    </label>
  );
}

// Terms & Conditions Interactive Modal
function TermsModal({ onClose, onAccept }: { onClose: () => void, onAccept: () => void }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollHeight - scrollTop - clientHeight < 20) {
        setHasScrolledToBottom(true);
      }
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      if (scrollHeight <= clientHeight) {
        setHasScrolledToBottom(true);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-full flex flex-col overflow-hidden shadow-2xl relative z-10"
      >
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Terms & Conditions</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div 
          ref={contentRef} 
          onScroll={handleScroll}
          className="p-6 md:p-8 overflow-y-auto flex-1 text-sm md:text-base text-gray-600 leading-relaxed font-medium space-y-6"
        >
          <p className="font-bold text-gray-900">Last Updated: August 2026</p>
          <p>Welcome to Global Talent Hunt.</p>
          <p>By registering for any contest hosted on this platform, you acknowledge that you have read, understood, and agree to the following Terms & Conditions.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">1. ELIGIBILITY</h3>
          <p>Participation is open to individuals who satisfy the eligibility requirements of the selected contest.</p>
          <p>Certain contests may have age, educational, geographical, or professional eligibility criteria.</p>
          <p>Participants are responsible for ensuring they meet the requirements before registering.</p>
          
          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">2. REGISTRATION</h3>
          <p>Your registration is considered complete only after:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The registration form has been successfully submitted.</li>
            <li>The applicable registration fee has been successfully paid.</li>
          </ul>
          <p>Registration fees are non-refundable except where required by applicable law.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">3. MULTIPLE CONTESTS</h3>
          <p>Participants may register for multiple contests.</p>
          <p>Each contest requires its own registration fee.</p>
          <p>Selecting multiple contests will automatically calculate the final payable amount.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">4. ORIGINAL WORK</h3>
          <p>All submitted work must be the participant's original creation.</p>
          <p>Plagiarism, copied work, unauthorized assets, or intellectual property infringement may result in immediate disqualification.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">5. USE OF AI</h3>
          <p>Where permitted by individual contest guidelines, participants may use Artificial Intelligence tools.</p>
          <p>However, the submitted work must demonstrate meaningful personal contribution, creativity, and understanding.</p>
          <p>Contest-specific AI usage rules will always take precedence.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">6. SUBMISSIONS</h3>
          <p>Participants are solely responsible for ensuring that submissions are uploaded before the contest deadline.</p>
          <p>Late submissions may not be accepted.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">7. JUDGING</h3>
          <p>Entries will be evaluated according to the published judging criteria.</p>
          <p>The decision of the judges shall be final.</p>
          <p>No correspondence regarding judging decisions will be entertained.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">8. PRIZES</h3>
          <p>Prizes will only be awarded to participants who satisfy all contest requirements.</p>
          <p>Global Talent Hunt reserves the right to substitute prizes with alternatives of equal value should unforeseen circumstances arise.</p>
          <p>Prize distribution timelines may vary depending on verification requirements.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">9. PARTICIPATION BENEFITS</h3>
          <p>Eligible registered participants may receive:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Lifetime JobFinderAI Premium Subscription</li>
            <li>Official Participation Certificate</li>
            <li>Contest Updates</li>
            <li>Eligibility for Grand Prizes</li>
          </ul>
          <p>Benefits vary by contest and may be updated from time to time.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">10. CODE OF CONDUCT</h3>
          <p>Participants must maintain respectful and professional conduct throughout the competition.</p>
          <p>Harassment, cheating, impersonation, fraudulent activity, or abuse of the platform may result in immediate disqualification.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">11. INTELLECTUAL PROPERTY</h3>
          <p>Participants retain ownership of their original work.</p>
          <p>By submitting an entry, participants grant Global Talent Hunt a non-exclusive, worldwide, royalty-free license to display, promote, evaluate, and showcase submitted work for contest-related marketing, judging, educational, and promotional purposes with appropriate attribution.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">12. PRIVACY</h3>
          <p>Personal information collected during registration will only be used for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contest administration</li>
            <li>Participant communication</li>
            <li>Prize distribution</li>
            <li>Verification</li>
            <li>Platform improvements</li>
          </ul>
          <p>Data will never be sold to third parties.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">13. CHANGES TO CONTESTS</h3>
          <p>Global Talent Hunt reserves the right to modify:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contest schedules</li>
            <li>Deadlines</li>
            <li>Prize structures</li>
            <li>Rules</li>
            <li>Judging timelines</li>
          </ul>
          <p>Participants will be notified of any significant changes.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">14. LIMITATION OF LIABILITY</h3>
          <p>Global Talent Hunt shall not be held responsible for technical failures, internet disruptions, third-party payment gateway failures, or circumstances beyond reasonable control affecting participation.</p>

          <hr className="border-gray-200" />
          
          <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs mt-8">15. ACCEPTANCE</h3>
          <p>By selecting "I Agree" and proceeding with registration, you confirm that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You have read these Terms & Conditions.</li>
            <li>You agree to abide by all contest rules.</li>
            <li>All information submitted by you is accurate.</li>
            <li>You understand that violation of these Terms may result in disqualification.</li>
          </ul>
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col gap-5 shrink-0">
          <label className={`flex items-start gap-3 cursor-pointer group transition-opacity duration-300 ${hasScrolledToBottom ? 'opacity-100' : 'opacity-40 select-none'}`}>
            <div className="relative flex items-center justify-center mt-0.5">
              <input type="checkbox" disabled={!hasScrolledToBottom} checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="peer sr-only" />
              <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${isChecked ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                <Check className={`w-3 h-3 text-white transition-opacity duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">
                I have read and agree to these Terms & Conditions.
              </span>
              {!hasScrolledToBottom && (
                <span className="text-xs text-gray-500 font-medium mt-1">Please read through all terms to accept.</span>
              )}
            </div>
          </label>
          
          <button
            onClick={onAccept}
            disabled={!hasScrolledToBottom || !isChecked}
            className={`w-full py-4 rounded-xl text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
              ${(!hasScrolledToBottom || !isChecked) 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#11131c] text-white hover:bg-black hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-300'
              }
            `}
          >
            Accept & Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

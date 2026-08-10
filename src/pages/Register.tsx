import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Check, ShieldCheck, Lock, 
  Info, AlertCircle, Loader2, Box, User, Monitor, Rocket, GraduationCap, Eye, EyeOff
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
  
  const [selectedContestIds, setSelectedContestIds] = useState<string[]>([]);
  const [customFee, setCustomFee] = useState<number | null>(null);
  const [checkingReferral, setCheckingReferral] = useState(false);

  const [entries, setEntries] = useState(1243); // Start at a base number
  
  useEffect(() => {
    // Fake live counter effect
    const interval = setInterval(() => {
      setEntries(prev => prev + Math.floor(Math.random() * 3));
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contestParam = params.get('contest');
    if (contestParam) {
      const valid = CONTESTS.find(c => c.id === contestParam && c.status !== 'COMING_SOON');
      if (valid) {
        setSelectedContestIds([valid.id]);
      } else {
        setSelectedContestIds([CONTESTS.filter(c => c.status !== 'COMING_SOON')[0].id]);
      }
    } else {
      setSelectedContestIds([CONTESTS.filter(c => c.status !== 'COMING_SOON')[0].id]);
    }

    // Referral Tracking Logic
    const refParam = params.get('ref');
    const storedRef = sessionStorage.getItem('referral_code');
    const activeRef = refParam || storedRef;
    
    if (refParam) {
      // Save for when they successfully pay
      sessionStorage.setItem('referral_code', refParam);
      // Click tracking is handled globally by App.tsx
    }
    
    if (activeRef) {
      const checkRef = async () => {
        setCheckingReferral(true);
        try {
          const { data } = await supabase
            .from('profiles')
            .select('referral_price')
            .eq('referral_code', activeRef)
            .single();
            
          if (data && data.referral_price !== null) {
            setCustomFee(data.referral_price);
          } else {
            setCustomFee(100); // fallback
          }
        } catch (err) {
          setCustomFee(100);
        } finally {
          setCheckingReferral(false);
        }
      };
      checkRef();
    }
  }, [location.search]);

  const selectedContests = useMemo(() => {
    return CONTESTS.filter(c => selectedContestIds.includes(c.id));
  }, [selectedContestIds]);

  const toggleContest = (id: string) => {
    setSelectedContestIds(prev => prev.includes(id) ? [] : [id]);
    if (errors.contest) setErrors(prev => ({ ...prev, contest: undefined } as any));
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '' as 'student' | 'professional' | '',
    linkedin: '',
    portfolio: '',
    github: ''
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  // Auto-reopen modal if they hit the back button from Razorpay and landed back on the form
  useEffect(() => {
    const pending = localStorage.getItem('pending_registration');
    const modalWasShown = localStorage.getItem('payment_modal_shown');
    if (pending && modalWasShown === 'true') {
      const data = JSON.parse(pending);
      if (data && data.amount > 0) {
        const link = data.amount === 100 ? "https://rzp.io/rzp/Bz7zEuCn" : "https://rzp.io/rzp/4JOE0dy";
        setPaymentLink(link);
        setShowPaymentModal(true);
      }
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedContestIds.length === 0) newErrors.contest = 'Please select at least one contest to register for.';
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid email required';
    
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.role) newErrors.role = 'Please select your role';
    if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
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

  const hasReferral = !!sessionStorage.getItem('referral_code') || new URLSearchParams(location.search).has('ref');
  const fee = selectedContests.length > 0 ? (hasReferral ? (customFee !== null ? customFee : 100) : 200) : 0;
  const currency = 'INR';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || selectedContests.length === 0) return;

    setIsSubmitting(true);
    try {
      const amount = fee;
      
      const registrationId = `REG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const statePayload = {
        registrationId,
        contestName: selectedContests.length > 1 ? `${selectedContests.length} Contests` : selectedContests[0].title,
        participantName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        paymentStatus: amount > 0 ? 'Completed' : 'Free Entry',
        amount,
        currency
      };

      // Ensure the backend Webhook knows what to do if their phone dies:
      // We insert a PENDING record so the webhook can extract their requested password later.
      try {
        await supabase.from('registrations').insert({
          user_name: formData.fullName,
          user_email: formData.email,
          user_phone: formData.password ? `${formData.phone} || PWD:${formData.password}` : formData.phone,
          amount_paid: 0,
          payment_id: 'PENDING',
          referral_code: hasReferral ? (new URLSearchParams(location.search).get('ref') || sessionStorage.getItem('referral_code')) : null
        });
      } catch (dbErr) {
        // If it already exists or fails, it's fine, the webhook or frontend will just update the existing one
      }

      localStorage.setItem('pending_registration', JSON.stringify(statePayload));
      
      if (amount === 0) {
        navigate('/register/success', { state: statePayload });
        return;
      }

      // For paid flow, show the manual confirmation modal
      const link = amount === 100 ? "https://rzp.io/rzp/Bz7zEuCn" : "https://rzp.io/rzp/4JOE0dy";
      setPaymentLink(link);
      localStorage.setItem('payment_modal_shown', 'true');
      setShowPaymentModal(true);
      
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
    <div className="min-h-screen bg-gray-50  font-sans selection:bg-purple-200 relative">
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Complete Payment</h2>
            <p className="text-gray-600 mb-6 font-medium">Click the button below to pay securely on Razorpay. Once your payment is complete, return to this page and confirm.</p>
            
            <a 
              href={paymentLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-4 mb-4 bg-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-colors"
            >
              Pay {formatCurrency(fee)} Now
            </a>
            
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">After paying, click below:</p>
              <button 
                onClick={() => {
                  localStorage.setItem('payment_manually_confirmed', 'true');
                  setShowPaymentModal(false);
                  navigate('/register/success', { 
                    state: JSON.parse(localStorage.getItem('pending_registration') || '{}') 
                  });
                }}
                className="w-full px-4 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Yes, I Have Paid!
              </button>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('pending_registration');
                  localStorage.removeItem('payment_modal_shown');
                  setShowPaymentModal(false);
                }}
                className="w-full px-4 py-3 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-colors mt-2"
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-transparent to-blue-100/50 pointer-events-none z-0" />
      <div className="relative z-10">
      {/* Minimal Brand Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 py-6 px-6 md:px-12 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <Link to={new URLSearchParams(location.search).get('contest') ? `/contests/${new URLSearchParams(location.search).get('contest')}${new URLSearchParams(location.search).has('ref') ? `?ref=${new URLSearchParams(location.search).get('ref')}` : ''}` : (new URLSearchParams(location.search).has('ref') ? `/?ref=${new URLSearchParams(location.search).get('ref')}` : '/')} className="flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
          <span className="font-futuristic font-bold text-xl tracking-tighter text-gray-900">
            GLOBAL<span className="text-purple-400">TALENT</span>HUNT
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2 md:gap-3">
          <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 md:h-7 w-auto object-contain shrink-0" />
          <span className="text-gray-300 font-light">|</span>
          <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-7 md:h-9 w-auto object-contain shrink-0" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <div className="mb-12 max-w-2xl text-left">
          <h1 className="text-4xl md:text-[40px] font-sans font-bold text-gray-900 tracking-tight mb-3">
            Register for Global Challenges
          </h1>
          <p className="text-base text-gray-600 font-medium">
            Join exciting competitions. Showcase your talent. Win big.
          </p>
          <p className="mt-4 text-sm text-gray-400 font-medium tracking-wide">
            Join {entries.toLocaleString()} other contestants who have already registered globally.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              {/* SECTION 1: CHOOSE CONTEST */}
              <section className="bg-white shadow-sm border border-gray-200 p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase flex items-center gap-2">
                      <span className="text-purple-400">01.</span> Select Contests
                    </h2>
                    {errors.contest && <span className="text-xs font-semibold text-red-400">{errors.contest}</span>}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Choose the contest you want to participate in.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedContests.map(contest => {
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
                      <div
                        key={contest.id}
                        className="relative p-5 rounded-2xl border text-left flex flex-col min-h-[160px] bg-gray-50 border-purple-500 shadow-md shadow-purple-500/10"
                      >
                        <div className="flex items-start gap-3 w-full mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 bg-white border border-gray-200">
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
                          <div className="mt-2">
                            {hasReferral ? (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 line-through text-xs font-medium">₹200</span>
                                <span className="text-green-400 font-bold text-sm">₹100</span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">₹200</span>
                            )}
                          </div>
                          {getBadge()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION 2: PARTICIPANT DETAILS */}
              <section className="bg-white shadow-sm border border-gray-200 p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase flex items-center gap-2">
                      <span className="text-purple-400">02.</span> Participant Details
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Please fill in your details accurately.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="md:col-span-2">
                    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} required placeholder="Enter your full name" />
                  </div>
                  
                  <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} required placeholder="Enter email address" />
                  
                  {/* Password with Eye Toggle */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                      Create Password <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-center rounded-xl border ${errors.password ? 'border-red-300 ring-4 ring-red-50 bg-white' : 'border-gray-200 bg-white focus-within:border-black focus-within:ring-4 focus-within:ring-gray-100'} transition-all overflow-hidden`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min 6 characters"
                        className="w-full px-4 py-3 text-gray-900 text-sm font-medium outline-none bg-transparent"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-gray-400 hover:text-gray-700 focus:outline-none">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <span className="text-[10px] text-red-500 font-semibold">{errors.password}</span>}
                  </div>
                  
                  {/* Confirm Password with Eye Toggle */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-center rounded-xl border ${errors.confirmPassword ? 'border-red-300 ring-4 ring-red-50 bg-white' : 'border-gray-200 bg-white focus-within:border-black focus-within:ring-4 focus-within:ring-gray-100'} transition-all overflow-hidden`}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Retype password"
                        className="w-full px-4 py-3 text-gray-900 text-sm font-medium outline-none bg-transparent"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="pr-4 text-gray-400 hover:text-gray-700 focus:outline-none">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="text-[10px] text-red-500 font-semibold">{errors.confirmPassword}</span>}
                  </div>

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
                      <Check className={`w-3.5 h-3.5 text-gray-900 transition-opacity duration-200 ${termsAccepted ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
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

                <div className="bg-white shadow-sm border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                
                <h3 className="font-bold text-[11px] text-gray-600 uppercase tracking-[0.2em]">
                  Registration Summary
                </h3>
                
                {selectedContests.length > 0 ? (
                  <>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden shadow-lg shadow-black/10">
                      {/* Decorative gradient glow inside the card */}
                      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent blur-2xl" />
                      
                      <div className="flex flex-col justify-center relative z-10 h-full">
                        <span className="text-base font-bold text-gray-900 leading-tight">Selected Contests</span>
                        <span className="text-xs font-medium text-gray-500 mt-0.5">{selectedContests.length} {selectedContests.length === 1 ? 'contest' : 'contests'} selected</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                        FEE BREAKDOWN
                      </span>
                      <div className="flex flex-col gap-3">
                        {selectedContests.map(c => (
                          <div key={c.id} className="flex flex-col gap-1">
                            <div className="flex justify-between items-start gap-4">
                              <span className="text-sm font-bold text-gray-900 leading-tight">{c.title}</span>
                              {hasReferral ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-gray-400 line-through">₹200</span>
                                  <span className="text-sm font-bold text-green-400 shrink-0">₹100</span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-500 shrink-0">₹200</span>
                              )}
                            </div>
                            {hasReferral && (
                              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-500/10 w-fit px-2 py-0.5 rounded mt-1">50% Referral Discount Applied</span>
                            )}
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

                    <div className="border-t border-gray-200 border-dashed" />

                    <div className="flex justify-between items-end gap-4">
                      <span className="text-[10px] font-bold text-gray-900 tracking-[0.2em] uppercase mb-1.5">
                        TOTAL AMOUNT
                      </span>
                      <span className="text-4xl font-sans font-bold text-gray-900 tracking-tight">
                        {checkingReferral ? '...' : formatCurrency(fee)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 border-dashed" />

                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                        YOUR REGISTRATION INCLUDES
                      </span>
                      <ul className="flex flex-col gap-3">
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Lifetime JobFinderAI Premium</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Official Participation Certificate</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Access to Judging & Evaluation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Eligibility for Grand Prizes</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-sm font-medium text-gray-500">Exclusive Updates & Opportunities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Secure payments powered by <span className="text-purple-400 italic">Razorpay</span></span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || selectedContests.length === 0 || !termsAccepted || checkingReferral}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300
                          ${isSubmitting || selectedContests.length === 0 || !termsAccepted || checkingReferral
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-gray-800 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5'
                          }
                        `}
                      >
                        {isSubmitting || checkingReferral ? (
                          <Loader2 className="w-5 h-5 animate-spin text-black" />
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
    </div>
  );
}

// Reusable Input Field Component matching editorial aesthetics
function InputField({ label, name, value, onChange, type = "text", error, required, placeholder, className = "" }: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex justify-between">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 ring-4 ring-red-50 bg-white' : 'border-gray-200 bg-white focus-within:border-black focus-within:ring-4 focus-within:ring-gray-100'} transition-all outline-none text-gray-900 text-sm font-medium`}
      />
      {error && <span className="text-[10px] text-red-400 font-semibold">{error}</span>}
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
          ${checked ? 'bg-white border-white' : 'bg-white border-gray-300 group-hover:border-gray-400'}
        `}>
          <Check className={`w-3 h-3 text-black transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
        </div>
      </div>
      <span className={`text-sm font-medium select-none transition-colors duration-200 ${checked ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
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
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] md:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative z-10"
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
          className="p-6 md:p-8 overflow-y-auto flex-1 text-sm md:text-base text-gray-600 leading-relaxed font-medium space-y-4"
        >
          <p className="font-bold text-gray-900 text-lg">Participant Agreement</p>
          <p>By registering, you agree to the following conditions for all Global Talent Hunt contests (AI Innovation, 3D Asset Design, Web Experience Design, Digital Character Design, Career Accelerator, and AI Education).</p>
          
          <ul className="list-disc pl-5 space-y-3 mt-4">
            <li><strong>Original Work & AI Tools:</strong> All submissions must be your original work. While generative AI is encouraged where applicable, it must demonstrate significant personal contribution, problem-solving, and creativity.</li>
            <li><strong>Eligibility:</strong> You must meet the criteria for your selected contest(s) and submit your projects before the designated deadlines.</li>
            <li><strong>Prizes & Judging:</strong> The $50,000 global prize pool and distribution are determined exclusively by the official judges, whose decisions are final.</li>
            <li><strong>Conduct:</strong> Professionalism is required. Any plagiarism or cheating will result in immediate disqualification.</li>
            <li><strong>Rights:</strong> You retain ownership of your work, but grant Global Talent Hunt permission to showcase your projects for promotional and educational purposes.</li>
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

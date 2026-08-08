import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Receipt, User, Trophy, Mail, PhoneCall, Timer, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';

export default function RegisterSuccess() {
  const location = useLocation();
  const state = location.state as {
    registrationId: string;
    contestName: string;
    participantName: string;
    email: string;
    paymentStatus: string;
    amount: number;
    currency: string;
  };

  const searchParams = new URLSearchParams(location.search);
  const razorpayPaymentId = searchParams.get('razorpay_payment_id');
  const razorpayPaymentLinkId = searchParams.get('razorpay_payment_link_id');

  // If accessed directly without state AND without Razorpay redirect params, redirect to register
  if (!state && !razorpayPaymentId) {
    return <Navigate to="/register" replace />;
  }

  // Use state if available (from mock flow), otherwise construct mock state from Razorpay params
  const displayState = state || {
    registrationId: razorpayPaymentId || `REG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    contestName: 'Global Talent Hunt Registration',
    participantName: 'Participant', // We don't have the name since it's a redirect, but we can just say "Participant"
    email: 'your registered email',
    paymentStatus: razorpayPaymentId ? 'Completed via Razorpay' : 'Completed',
    amount: 0,
    currency: 'INR'
  };

  const formatCurrency = (amt: number, currency: string) => {
    if (amt === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amt);
  };

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    // Target date: August 20, 2026
    const targetDate = new Date('2026-08-20T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Tracking Entry Logic
  React.useEffect(() => {
    const trackEntry = async () => {
      // Don't double track if they refresh the success page
      if (sessionStorage.getItem('registration_tracked')) return;
      
      const referralCode = sessionStorage.getItem('referral_code');
      const paymentId = razorpayPaymentId || razorpayPaymentLinkId || 'unknown_payment_id';
      
      try {
        await supabase.from('registrations').insert({
          user_name: displayState.participantName,
          user_email: displayState.email,
          user_phone: '',
          amount_paid: displayState.amount,
          payment_id: paymentId,
          referral_code: referralCode
        });
        sessionStorage.setItem('registration_tracked', 'true');
        
        // --- EMAILJS AUTOMATED EMAIL ---
        // You will need to create an EmailJS account and fill these inside your .env file
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey && displayState.email !== 'your registered email') {
          await emailjs.send(
            serviceId,
            templateId,
            {
              to_name: displayState.participantName,
              to_email: displayState.email,
              payment_id: paymentId,
              amount: displayState.amount
            },
            publicKey
          );
          console.log("Welcome email sent successfully!");
        }

      } catch (err) {
        console.error("Failed to save registration or send email", err);
      }
    };
    trackEntry();
  }, [displayState, razorpayPaymentId, razorpayPaymentLinkId]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-purple-200 flex flex-col items-center justify-center p-6">
      
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-8 md:p-16 flex flex-col items-center text-center">
        
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 border-8 border-green-50/50">
          <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl md:text-5xl font-sans font-bold text-gray-900 tracking-tight mb-4">
          Registration Successful
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-lg mb-12">
          Welcome to the competition, {displayState.participantName !== 'Participant' ? displayState.participantName.split(' ')[0] : 'Participant'}. We're thrilled to have you onboard.
        </p>

        {/* Details Grid */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 border border-gray-100 text-left mb-12">
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <Trophy className="w-3 h-3" /> Contest
            </span>
            <span className="text-base font-bold text-gray-900">{displayState.contestName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <Receipt className="w-3 h-3" /> Registration ID
            </span>
            <span className="text-base font-bold text-gray-900 font-mono tracking-wider">{displayState.registrationId}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <User className="w-3 h-3" /> Participant
            </span>
            <span className="text-base font-bold text-gray-900">{displayState.participantName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <CreditCardIcon className="w-3 h-3" /> Payment Status
            </span>
            <span className="text-base font-bold text-gray-900">
              {displayState.paymentStatus} {displayState.amount > 0 && <span className="text-gray-400 font-medium">({formatCurrency(displayState.amount, displayState.currency)})</span>}
            </span>
          </div>
          
        </div>

        <div className="w-full mb-12">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col items-center text-center relative z-10">
              <Timer className="w-10 h-10 text-purple-300 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Contest Starts In</h3>
              <p className="text-purple-200 text-sm mb-8 font-medium">August 20, 2026</p>
              
              <div className="flex gap-4 md:gap-6 justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tighter">{timeLeft.days}</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tighter">{timeLeft.hours}</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tighter">{timeLeft.minutes}</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tighter">{timeLeft.seconds}</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mb-12">
          <div className="flex items-center gap-4 bg-green-50/50 p-5 rounded-2xl border border-green-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">WhatsApp & Email Updates</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">You will be notified on WhatsApp and Email ({displayState.email}) with all contest details.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">We've got your back</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">If you miss the notification and don't join on time, our team will personally call you!</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
          >
            Return Home
          </Link>
          <Link 
            to="/register" 
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-xl bg-[#11131c] text-white font-bold text-sm tracking-widest uppercase hover:bg-black hover:shadow-xl hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
          >
            Register Another <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

// Icon helper since CreditCard wasn't imported at top
function CreditCardIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  );
}

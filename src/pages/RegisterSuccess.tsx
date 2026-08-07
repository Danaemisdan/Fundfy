import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Receipt, User, Trophy, Mail } from 'lucide-react';

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

  // If accessed directly without state, redirect to register
  if (!state) {
    return <Navigate to="/register" replace />;
  }

  const formatCurrency = (amt: number, currency: string) => {
    if (amt === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amt);
  };

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
          Welcome to the competition, {state.participantName.split(' ')[0]}. We're thrilled to have you onboard.
        </p>

        {/* Details Grid */}
        <div className="w-full bg-[#f8f9fa] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 border border-gray-100 text-left mb-12">
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <Trophy className="w-3 h-3" /> Contest
            </span>
            <span className="text-base font-bold text-gray-900">{state.contestName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <Receipt className="w-3 h-3" /> Registration ID
            </span>
            <span className="text-base font-bold text-gray-900 font-mono tracking-wider">{state.registrationId}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <User className="w-3 h-3" /> Participant
            </span>
            <span className="text-base font-bold text-gray-900">{state.participantName}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2">
              <CreditCardIcon className="w-3 h-3" /> Payment Status
            </span>
            <span className="text-base font-bold text-gray-900">
              {state.paymentStatus} <span className="text-gray-400 font-medium">({formatCurrency(state.amount, state.currency)})</span>
            </span>
          </div>
          
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 mb-12 bg-blue-50/50 text-blue-800 px-6 py-3 rounded-full border border-blue-100">
          <Mail className="w-4 h-4 text-blue-500" />
          A confirmation email has been sent to {state.email}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
      const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-8">
          <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-10 w-auto object-contain" />
        </div>

        <h1 className="text-2xl md:text-3xl font-sans font-bold text-gray-900 text-center mb-2">
          Welcome
        </h1>
        <p className="text-gray-500 text-center mb-8 font-medium">
          Sign in to your account
        </p>


        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#11131c] text-white font-bold tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  'Sign In'
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-3 font-medium">Don't have an account yet?</p>
          <button 
            type="button" 
            onClick={() => navigate('/register')}
            className="w-full border-2 border-gray-200 text-gray-900 font-bold tracking-widest uppercase text-xs py-3 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-colors"
          >
            Register for Contest
          </button>
        </div>
      </div>
    </div>
  );
}

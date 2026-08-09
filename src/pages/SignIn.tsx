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
    <div className="min-h-screen bg-[#030303] animated-gradient-bg flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-0" />
      
      <div className="w-full max-w-md glass-panel rounded-[2rem] p-8 md:p-12 relative overflow-hidden z-10">
        
        <div className="flex justify-center mb-8">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-lg">
            <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-8 w-auto object-contain" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-sans font-bold text-white text-center mb-2">
          Welcome
        </h1>
        <p className="text-white/60 text-center mb-8 font-medium">
          Sign in to your account
        </p>

        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm font-medium px-4 py-3 rounded-xl mb-6 border border-red-500/20 backdrop-blur-md">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl glass-input"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 rounded-xl glass-input"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 focus:outline-none transition-colors z-10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-white/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/10"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-black" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50 mb-3 font-medium">Don't have an account yet?</p>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="w-full border border-white/20 bg-white/5 text-white font-bold tracking-widest uppercase text-xs py-3 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md"
          >
            Register for Contest
          </button>
        </div>
      </div>
    </div>
  );
}

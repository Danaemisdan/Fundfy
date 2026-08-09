import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, Copy, Users, Trophy, Wallet, CheckCircle2, MousePointerClick, Loader2 } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';
import ContestShowcase from '../components/home/ContestShowcase';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    clicks: 0,
    entries: 0,
    earned: 0,
    referralCode: ''
  });

  // If not logged in, redirect to sign in
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const fetchStats = async () => {
      try {
        // Fetch profile stats
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin');
          return;
        }

        const refCode = profile?.referral_code || '';
        
        // Fetch registration entries for this referral code
        let entries = 0;
        let earned = 0;
        if (refCode) {
          const { data: regs } = await supabase
            .from('registrations')
            .select('amount_paid')
            .eq('referral_code', refCode);
          
          entries = regs?.length || 0;
          const totalRevenue = regs?.reduce((sum, r) => sum + Number(r.amount_paid), 0) || 0;
          earned = totalRevenue * (profile?.commission_rate || 0.20);
        }

        setStats({
          clicks: profile?.clicks || 0,
          entries: entries,
          earned: earned,
          referralCode: refCode
        });

      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!user || loading) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  );

  // Generate a mock referral link based on user ID
  const referralLink = stats.referralCode ? `https://fundfy.app/register?ref=${stats.referralCode}` : 'Contact admin for your link';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 lg:p-12 font-sans selection:bg-purple-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h1>
              <p className="text-gray-500 font-medium text-sm">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 hover:text-red-500 transition-colors self-start md:self-auto"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MousePointerClick className="w-24 h-24" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Link Clicks</span>
            <span className="text-5xl font-black text-gray-900 tracking-tighter">{stats.clicks}</span>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Users className="w-24 h-24" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Paid Entries</span>
            <span className="text-5xl font-black text-gray-900 tracking-tighter">{stats.entries}</span>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Wallet className="w-24 h-24" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Earned Commission</span>
            <span className="text-5xl font-black text-green-500 tracking-tighter">₹{stats.earned.toLocaleString()}</span>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-[#11131c] text-white p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl font-bold mb-4">Invite Friends & Earn</h2>
            <p className="text-gray-400 text-lg mb-8">
              Share your unique referral link. When someone registers for the Global Talent Hunt 2026 using your link, you'll earn exclusive rewards and climb the leaderboard!
            </p>

            <div className="-mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-4">
              <ContestShowcase referrerMode={true} referralCode={stats.referralCode} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

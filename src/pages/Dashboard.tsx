import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CONTESTS } from '../data/contests';
import { LogOut, Copy, Users, Trophy, Wallet, CheckCircle2, MousePointerClick, Loader2 } from 'lucide-react';
import { MotionButton } from '../components/ui/MotionButton';
import ContestShowcase from '../components/home/ContestShowcase';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'user' | 'referrer' | 'admin'>('user');
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [referredRegistrations, setReferredRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    clicks: 0,
    entries: 0,
    earned: 0,
    referralCode: ''
  });

  // If not logged in, redirect to sign in
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || user;
        if (!activeUser) {
          navigate('/signin');
          return;
        }

        // Fetch profile stats
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', activeUser.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin');
          return;
        }
        
        setRole(profile?.role || 'user');

        const { data: userRegs } = await supabase
          .from('registrations')
          .select('*')
          .eq('user_email', activeUser.email);
        setUserRegistrations(userRegs || []);

        const refCode = profile?.referral_code || '';
        
        // Fetch registration entries for this referral code
        let entries = 0;
        let earned = 0;
        let referredRegs: any[] = [];
        if (refCode) {
          const { data: regs } = await supabase
            .from('registrations')
            .select('*')
            .eq('referral_code', refCode)
            .order('created_at', { ascending: false });
          
          referredRegs = regs || [];
          entries = referredRegs.length;
          const totalRevenue = referredRegs.reduce((sum, r) => sum + Number(r.amount_paid), 0);
          earned = totalRevenue * (profile?.commission_rate || 0.20);
        }

        setReferredRegistrations(referredRegs);

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

        {role === 'user' ? (
          <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm p-8">
            <h2 className="text-xl font-bold mb-6">My Registrations</h2>
            {userRegistrations.length > 0 ? (
              <div className="flex flex-col gap-4">
                {userRegistrations.map((reg, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h3 className="font-bold text-gray-900">{reg.contest_name}</h3>
                      <p className="text-sm text-gray-500">Amount Paid: ₹{reg.amount_paid}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {reg.payment_status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You haven't registered for any contests yet.</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
                  Explore Contests
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
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

            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Your Custom Links (Copy & Share)</h3>
              {CONTESTS.map(contest => {
                const link = `https://fundfy.app/?contest=${contest.id}&ref=${stats.referralCode}`;
                return (
                  <div key={contest.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/10 transition-colors">
                    <div>
                      <h4 className="font-bold text-white mb-1">{contest.title}</h4>
                      <code className="text-xs text-purple-300 select-all">{link}</code>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(link);
                        alert('Copied to clipboard!');
                      }}
                      className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Referred Registrations Table */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Referred Registrations</h2>
              <p className="text-xs text-gray-500 mt-1">People who registered through your referral link</p>
            </div>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
              {referredRegistrations.filter(r => r.amount_paid > 0).length} Paid
            </span>
          </div>
          <div className="overflow-x-auto">
            {referredRegistrations.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p className="font-medium">No referrals yet.</p>
                <p className="text-sm mt-1">Share your link above to start earning!</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Paid</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {referredRegistrations.map((reg, i) => {
                    const hasContest = reg.user_name?.includes(' [');
                    const displayName = hasContest ? reg.user_name.split(' [')[0] : (reg.user_name || 'Unknown');
                    const isPaid = Number(reg.amount_paid) > 0;
                    return (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">{displayName}</td>
                        <td className="px-6 py-4 text-gray-500">{reg.user_email}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(reg.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right font-bold text-green-600">₹{reg.amount_paid}</td>
                        <td className="px-6 py-4 text-right">
                          {isPaid ? (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Paid ✓</span>
                          ) : (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-bold">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

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
          <div className="flex items-center gap-6">
            <img src="/Partners/Fundfy.png" alt="Fundfy" className="h-16 w-auto object-contain" />
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
          <>
          <div className="bg-[#11131c] text-white border border-white/10 rounded-[2rem] shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl font-black mb-8 relative z-10 tracking-tight">My Active Registrations</h2>
            
            {userRegistrations.length > 0 ? (
              <div className="flex flex-col gap-6 relative z-10">
                {userRegistrations.map((reg, i) => {
                  const hasContest = reg.user_name?.includes(' [');
                  const rawContest = hasContest 
                    ? reg.user_name.split(' [')[1].replace(']', '') 
                    : 'Global Talent Hunt 2026';
                  const contestName = rawContest === 'AI Education Innovation Contest' ? 'Career Accelerator Program' : rawContest;
                  const isPaid = Number(reg.amount_paid) > 0;

                  return (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {isPaid ? 'PAID ENTRY' : 'FREE ENTRY'}
                          </span>
                          <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {reg.payment_id}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{contestName}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-sm text-gray-300 font-medium">First Cohort Starts: <span className="text-white font-bold">30th of August 2026</span></p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end mt-6 md:mt-0 gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount Paid</span>
                        <span className="text-xl font-black text-white">₹{reg.amount_paid}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 relative z-10 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-gray-400 mb-6 font-medium">You haven't registered for any contests yet.</p>
                <button onClick={() => navigate('/')} className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-black uppercase tracking-widest text-xs transition-colors">
                  Explore Contests
                </button>
              </div>
            )}
          </div>
          {/* Premium Support Card */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#11131c] shadow-2xl p-8 mt-8">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Support</span>
                <h3 className="text-xl font-black text-white tracking-tight">Having issues?</h3>
                <p className="text-gray-400 text-sm mt-1 font-medium">Our team is available to help you anytime.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/919505429380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 text-green-400 rounded-2xl font-bold text-sm transition-all group"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
                <a
                  href="mailto:hello@fundfy.app"
                  className="flex items-center gap-3 px-6 py-4 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-400 rounded-2xl font-bold text-sm transition-all group"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  hello@fundfy.app
                </a>
              </div>
            </div>
          </div>
          </>
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

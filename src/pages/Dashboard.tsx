import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CONTESTS } from '../data/contests';
import { LogOut, Copy, Users, Wallet, MousePointerClick, Loader2, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'user' | 'referrer' | 'admin'>('user');
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [referredRegistrations, setReferredRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({ clicks: 0, entries: 0, earned: 0, referralCode: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || user;
        if (!activeUser) { navigate('/signin'); return; }

        const { data: profile } = await supabase.from('profiles').select('*').eq('id', activeUser.id).single();
        if (profile?.role === 'admin') { navigate('/admin'); return; }
        setRole(profile?.role || 'user');

        const { data: userRegs } = await supabase.from('registrations').select('*').eq('user_email', activeUser.email);
        setUserRegistrations(userRegs || []);

        const refCode = profile?.referral_code || '';
        let referredRegs: any[] = [];
        let entries = 0, earned = 0;
        if (refCode) {
          const { data: regs } = await supabase.from('registrations').select('*').eq('referral_code', refCode).order('created_at', { ascending: false });
          referredRegs = regs || [];
          entries = referredRegs.length;
          earned = referredRegs.reduce((sum, r) => sum + Number(r.amount_paid), 0) * (profile?.commission_rate || 0.20);
        }
        setReferredRegistrations(referredRegs);
        setStats({ clicks: profile?.clicks || 0, entries, earned, referralCode: refCode });
      } catch (err) {
        console.error('Dashboard error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, navigate]);

  if (!user || loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
    </div>
  );

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const firstName = user.email?.split('@')[0] || 'there';

  return (
    <div className="min-h-screen bg-[#f7f7f9] font-sans">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Fundfy" className="w-8 h-8" />
          <span className="font-black text-gray-900 tracking-tight text-lg">Fundfy</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 md:py-16 space-y-8">

        {/* Greeting */}
        <div>
          <p className="text-sm text-gray-400 font-medium mb-1">Signed in as {user.email}</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Hey, {firstName} 👋
          </h1>
        </div>

        {role === 'user' ? (
          <>
            {/* Contest registration(s) */}
            {userRegistrations.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Registrations</h2>
                {userRegistrations.map((reg, i) => {
                  const hasContest = reg.user_name?.includes(' [');
                  const contestName = hasContest
                    ? reg.user_name.split(' [')[1].replace(']', '')
                    : 'Global Talent Hunt 2026';
                  const isPaid = Number(reg.amount_paid) > 0;
                  const isVerified = reg.payment_id && reg.payment_id !== 'PENDING' && reg.payment_id !== 'FREE';

                  return (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      {/* Ticket top stripe */}
                      <div className="h-1.5 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500" />
                      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {isPaid ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                <CheckCircle className="w-3 h-3" /> Registered
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                <Clock className="w-3 h-3" /> Pending
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                            {contestName}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            First cohort kicks off <span className="text-gray-900 font-bold">30 August 2026</span>
                          </p>
                        </div>

                        <div className="shrink-0 bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-right">
                          <p className="text-xs text-gray-400 font-medium mb-1">Amount paid</p>
                          <p className="text-2xl font-black text-gray-900">₹{reg.amount_paid}</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 px-6 md:px-8 py-4 flex items-center justify-between bg-gray-50/50">
                        <p className="text-xs text-gray-400">
                          Registration ID: <span className="font-mono text-gray-600">{reg.registration_id || '—'}</span>
                        </p>
                        <button
                          onClick={() => navigate('/')}
                          className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                        >
                          View contest <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                <p className="text-gray-500 mb-6">You haven't registered for a contest yet.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-colors"
                >
                  Browse contests
                </button>
              </div>
            )}

            {/* Support */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Need help?</h3>
                <p className="text-sm text-gray-500">Our team usually replies within a few hours.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/919505429380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1eb356] text-white rounded-xl font-semibold text-sm transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:hello@fundfy.app"
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-sm transition-colors"
                >
                  hello@fundfy.app
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Link clicks', value: stats.clicks, icon: <MousePointerClick className="w-5 h-5" />, color: 'text-gray-900' },
                { label: 'Paid referrals', value: stats.entries, icon: <Users className="w-5 h-5" />, color: 'text-gray-900' },
                { label: 'Earned', value: `₹${stats.earned.toLocaleString()}`, icon: <Wallet className="w-5 h-5" />, color: 'text-emerald-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 text-gray-400">{s.icon}</div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
                  <p className={`text-4xl font-black tracking-tight ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Referral links */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 md:px-8 py-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Your referral links</h2>
                <p className="text-sm text-gray-400 mt-1">Share these to earn commission on each paid signup.</p>
              </div>
              <div className="divide-y divide-gray-100">
                {CONTESTS.map(contest => {
                  const link = `https://fundfy.app/?contest=${contest.id}&ref=${stats.referralCode}`;
                  return (
                    <div key={contest.id} className="px-6 md:px-8 py-4 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{contest.title}</p>
                        <p className="text-xs text-gray-400 font-mono truncate mt-0.5">{link}</p>
                      </div>
                      <button
                        onClick={() => { navigator.clipboard.writeText(link); }}
                        className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-600 text-xs font-semibold transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Referrals table */}
            {referredRegistrations.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-gray-900">People you referred</h2>
                    <p className="text-xs text-gray-400 mt-1">{referredRegistrations.filter(r => r.amount_paid > 0).length} paid out of {referredRegistrations.length}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-right">Amount</th>
                        <th className="px-6 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {referredRegistrations.map((reg, i) => {
                        const displayName = reg.user_name?.includes(' [') ? reg.user_name.split(' [')[0] : reg.user_name || 'Unknown';
                        const isPaid = Number(reg.amount_paid) > 0;
                        return (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-medium text-gray-900">{displayName}</td>
                            <td className="px-6 py-4 text-gray-500">{reg.user_email}</td>
                            <td className="px-6 py-4 text-gray-400 text-xs">{new Date(reg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                            <td className="px-6 py-4 text-right font-semibold text-gray-900">₹{reg.amount_paid}</td>
                            <td className="px-6 py-4 text-right">
                              {isPaid
                                ? <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Paid</span>
                                : <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Pending</span>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Support */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Need help?</h3>
                <p className="text-sm text-gray-500">Our team usually replies within a few hours.</p>
              </div>
              <div className="flex gap-3">
                <a href="https://wa.me/919505429380" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1eb356] text-white rounded-xl font-semibold text-sm transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="mailto:hello@fundfy.app" className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-sm transition-colors">
                  hello@fundfy.app
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ShieldAlert, Users, TrendingUp, IndianRupee, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [referrers, setReferrers] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const checkAdminAndFetchData = async () => {
      try {
        // 1. Check if Admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role !== 'admin') {
          navigate('/dashboard'); // Kick back to normal dashboard
          return;
        }
        
        setIsAdmin(true);

        // 2. Fetch Referrers
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'referrer')
          .order('created_at', { ascending: false });

        // 3. Fetch Registrations
        const { data: registrationsData } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });

        setReferrers(profilesData || []);
        setRegistrations(registrationsData || []);

      } catch (err) {
        console.error('Error fetching admin data', err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const totalRevenue = registrations.reduce((sum, r) => sum + Number(r.amount_paid), 0);
  const totalEntries = registrations.length;
  // Compute dynamic stats per referrer based on registrations table
  const computedReferrers = referrers.map(ref => {
    const refsEntries = registrations.filter(r => r.referral_code === ref.referral_code);
    const moneyEarned = refsEntries.reduce((sum, r) => sum + Number(r.amount_paid), 0);
    const commission = moneyEarned * (ref.commission_rate || 0.20);
    
    return {
      ...ref,
      actual_entries: refsEntries.length,
      commission_earned: commission
    };
  });
  
  const totalCommissionsOwed = computedReferrers.reduce((sum, r) => sum + r.commission_earned, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Master Admin</h1>
            <p className="text-gray-500 font-medium">Platform Overview & Referrer Management</p>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <IndianRupee className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Total Revenue</span>
            </div>
            <span className="text-4xl font-black text-gray-900">₹{totalRevenue.toLocaleString()}</span>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Total Entries</span>
            </div>
            <span className="text-4xl font-black text-gray-900">{totalEntries}</span>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Total Commissions</span>
            </div>
            <span className="text-4xl font-black text-red-500">₹{totalCommissionsOwed.toLocaleString()}</span>
          </div>
        </div>

        {/* Referrers Table */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">Partner/Referrer Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Partner Email</th>
                  <th className="px-6 py-4">Ref Code</th>
                  <th className="px-6 py-4">Link Clicks</th>
                  <th className="px-6 py-4">Paid Entries</th>
                  <th className="px-6 py-4">Commission Rate</th>
                  <th className="px-6 py-4 text-right">Owed (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {computedReferrers.map((ref, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{ref.email}</td>
                    <td className="px-6 py-4"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">{ref.referral_code}</code></td>
                    <td className="px-6 py-4">{ref.clicks}</td>
                    <td className="px-6 py-4">{ref.actual_entries}</td>
                    <td className="px-6 py-4">{(ref.commission_rate * 100).toFixed(0)}%</td>
                    <td className="px-6 py-4 text-right font-bold text-red-500">₹{ref.commission_earned.toLocaleString()}</td>
                  </tr>
                ))}
                {computedReferrers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No referrers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Registrations Table */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">All Participant Entries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Participant Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Amount Paid</th>
                  <th className="px-6 py-4">Payment ID</th>
                  <th className="px-6 py-4">Referred By</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((reg, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{reg.user_name}</td>
                    <td className="px-6 py-4">{reg.user_email}</td>
                    <td className="px-6 py-4 font-medium">₹{reg.amount_paid}</td>
                    <td className="px-6 py-4"><code className="text-xs text-gray-400">{reg.payment_id}</code></td>
                    <td className="px-6 py-4">
                      {reg.referral_code ? (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">{reg.referral_code}</span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Direct</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(reg.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No registrations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

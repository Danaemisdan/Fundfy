import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { CONTESTS } from '../data/contests';
import { ShieldAlert, Users, TrendingUp, IndianRupee, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [referrers, setReferrers] = useState<any[]>([]);
  const [standardUsers, setStandardUsers] = useState<any[]>([]);
  const [newRefCode, setNewRefCode] = useState<Record<string, string>>({});
  const [expandedRefId, setExpandedRefId] = useState<string | null>(null);
  const [quickAddEmail, setQuickAddEmail] = useState("");
  const [quickAddCode, setQuickAddCode] = useState("");
  const [quickAddPassword, setQuickAddPassword] = useState("");
  const [quickAddCommission, setQuickAddCommission] = useState(50);
  const [quickAddPrice, setQuickAddPrice] = useState(100);
  const [isAdding, setIsAdding] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [editCommission, setEditCommission] = useState(50);
  const [editPrice, setEditPrice] = useState(100);

  // Quick Add Contestant State
  const [quickAddContestantName, setQuickAddContestantName] = useState("");
  const [quickAddContestantEmail, setQuickAddContestantEmail] = useState("");
  const [quickAddContestantPhone, setQuickAddContestantPhone] = useState("");
  const [quickAddContestantContest, setQuickAddContestantContest] = useState("Acting Contest");
  const [quickAddContestantPassword, setQuickAddContestantPassword] = useState("");
  const [isAddingContestant, setIsAddingContestant] = useState(false);

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || user;
        if (!activeUser) {
          navigate('/signin');
          return;
        }

        // 1. Check if Admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', activeUser.id)
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
          
        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'user')
          .order('created_at', { ascending: false });
        
        setStandardUsers(usersData || []);

        // 3. Fetch Registrations
        const { data: registrationsData } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });

        setReferrers(profilesData || []);
        setRegistrations((registrationsData || []).filter((r: any) => r.user_email !== 'test@test.com'));

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
    const commission = moneyEarned * (ref.commission_rate ?? 0.50);
    
    return {
      ...ref,
      actual_entries: refsEntries.length,
      commission_earned: commission
    };
  });
  
  const totalCommissionsOwed = computedReferrers.reduce((sum, r) => sum + r.commission_earned, 0);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddEmail || !quickAddCode || !quickAddPassword) {
      alert("Please enter an email, referral code, and password.");
      return;
    }
    
    setIsAdding(true);
    try {
      // 1. Create a temporary supabase client so we don't overwrite the admin's session
      const tempSupabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      
      // 2. Create the auth user quietly
      const { data: authData, error: authError } = await tempSupabase.auth.signUp({
        email: quickAddEmail,
        password: quickAddPassword
      });
      
      if (authError && authError.message !== 'User already registered') {
        throw authError;
      }
      
      // Give DB a second to run triggers
      await new Promise(r => setTimeout(r, 1500));
      
      // 3. Update the profile role using admin session (if RLS allows, or wait, RLS might block this from client. 
      // Actually, since admin is updating someone else's profile, it might fail unless we bypass RLS.
      // We can try to use a RPC function if we had one, but we don't.
      // Wait, let's just instruct them to use the old way if it fails, OR we can try to update it.
      // Let's assume RLS allows it because we updated standard users before?
      // Yes, handleMakeReferrer updates `profiles` by `userId`. If that worked, this will work!)
      
      // We need the new user's ID. If authError was 'User already registered', we need to find them in standardUsers.
      let targetUserId = authData?.user?.id;
      
      if (!targetUserId) {
        const { data: existingProfile } = await supabase.from('profiles').select('id').eq('email', quickAddEmail).single();
        if (existingProfile) targetUserId = existingProfile.id;
      }
      
      if (targetUserId) {
         await supabase
          .from('profiles')
          .update({ 
            role: 'referrer', 
            referral_code: quickAddCode.toUpperCase()
          })
          .eq('id', targetUserId);

         await supabase.rpc('update_partner', {
            partner_id: targetUserId,
            new_commission: quickAddCommission / 100,
            new_price: quickAddPrice
         });
          
         alert("Partner added successfully! Their password is: " + quickAddPassword);
         window.location.reload();
      } else {
         alert("Failed to find or create the user.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to create partner: " + err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuickAddContestant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddContestantEmail || !quickAddContestantName) return;
    
    setIsAddingContestant(true);
    try {
      const tempSupabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      
      const { data: authData, error: authError } = await tempSupabase.auth.signUp({
        email: quickAddContestantEmail,
        password: quickAddContestantPassword || 'FundfySecure2026!',
        options: { 
          data: { 
            first_name: quickAddContestantName.split(' ')[0],
            role: 'user'
          } 
        }
      });
      
      if (authError && authError.message !== 'User already registered') {
        throw authError;
      }
      
      await new Promise(r => setTimeout(r, 1500));
      
      let targetUserId = authData?.user?.id;
      if (!targetUserId) {
        const { data: existingProfile } = await supabase.from('profiles').select('id').eq('email', quickAddContestantEmail).single();
        if (existingProfile) targetUserId = existingProfile.id;
      }
      
      if (targetUserId) {
        await fetch('/api/demote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: targetUserId })
        });
      }
      
      const { error: dbError } = await supabase.from('registrations').insert({
        user_name: `${quickAddContestantName} [${quickAddContestantContest}]`,
        user_email: quickAddContestantEmail,
        user_phone: quickAddContestantPassword ? `${quickAddContestantPhone} || PWD:${quickAddContestantPassword}` : quickAddContestantPhone,
        amount_paid: 100,
        payment_id: 'MANUAL_ADD',
        referral_code: null
      });

      if (dbError) throw dbError;
      
      alert("Contestant added successfully!");
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert("Failed to add contestant: " + err.message);
    } finally {
      setIsAddingContestant(false);
    }
  };

  const handleMakeReferrer = async (userId: string) => {
    const code = newRefCode[userId];
    if (!code) {
      alert('Please enter a referral code first.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'referrer', referral_code: code, commission_rate: 0.50, referral_price: 100 })
        .eq('id', userId);
        
      if (error) throw error;
      alert('User upgraded to Referrer!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to upgrade user');
    }
  };

  const handleSavePartner = async (userId: string) => {
    try {
      const { error } = await supabase.rpc('update_partner', {
        partner_id: userId,
        new_commission: editCommission / 100,
        new_price: editPrice
      });
        
      if (error) throw error;
      alert('Partner updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to update partner');
    }
  };


  const handleManualVerify = async (reg: any) => {
    if (!confirm(`Are you sure you want to manually verify ${reg.user_name} as PAID?`)) return;
    
    try {
      let phone = reg.user_phone || '';
      let pass = 'FundfySecure2026!';
      if (phone.includes(' || PWD:')) {
        const parts = phone.split(' || PWD:');
        phone = parts[0];
        pass = parts[1];
      }

      const tempSupabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      
      const { data: authData, error: authError } = await tempSupabase.auth.signUp({
        email: reg.user_email,
        password: pass,
        options: { 
          data: { 
            first_name: reg.user_name.split(' ')[0],
            role: 'user'
          } 
        }
      });
      
      if (authError && authError.message !== 'User already registered') {
        console.error("Auth error:", authError);
      }

      // **CRITICAL FIX**: The database trigger automatically sets new signups to 'referrer'. 
      // We MUST explicitly force them back to 'user' so they don't appear in the referral list!
      // We MUST wait 1.5 seconds for the database trigger to finish creating the profile before we update it.
      await new Promise(r => setTimeout(r, 1500));
      
      let targetUserId = authData?.user?.id;
      if (!targetUserId) {
        const { data: existingProfile } = await supabase.from('profiles').select('id').eq('email', reg.user_email).single();
        if (existingProfile) targetUserId = existingProfile.id;
      }
      if (targetUserId) {
        const res = await fetch('/api/demote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: targetUserId })
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          alert("CRITICAL WARNING: The user was verified, but the Vercel Backend failed to remove their Referrer status! Error: " + (errorData.error || 'Unknown API Error'));
        }
      }

      // Also send an email using emailjs REST API
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (serviceId && templateId && publicKey) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_name: reg.user_name,
              to_email: reg.user_email,
              payment_id: 'MANUAL_VERIFIED',
              registration_id: reg.registration_id || 'MANUAL_VERIFIED',
              amount: 100,
              custom_message: "Your payment was manually verified by our team. You can now log in!"
            }
          })
        }).catch(e => console.error("EmailJS error", e));
      }

      const { error: updateError } = await supabase
        .from('registrations')
        .update({ amount_paid: 100, payment_id: 'MANUAL_VERIFIED' })
        .eq('id', reg.id);
        
      if (updateError) throw updateError;

      alert(`Successfully verified ${reg.user_name} and sent confirmation email!`);
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert('Failed to verify user: ' + err.message);
    }
  };

  const handleDeleteRegistration = async (regId: string) => {
    if (!confirm('Are you sure you want to permanently delete this registration?')) return;
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', regId);
      if (error) throw error;
      alert('Registration deleted successfully.');
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert('Failed to delete registration: ' + err.message);
    }
  };

  const handleDemotePartner = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this person from the Referrer list? They will become a normal participant.')) return;
    try {
      const res = await fetch('/api/demote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
        
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to demote partner via API');
      }
      alert('User removed from Referral list successfully!');
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert('Failed to remove partner: ' + err.message);
    }
  };

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

        {/* Quick Add Referrer Form */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Quick Add Partner</h2>
              <p className="text-xs text-gray-500">Instantly create a new partner account without them needing to sign up first.</p>
            </div>
          </div>
          <form onSubmit={handleQuickAdd} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Partner Email</label>
              <input 
                type="email" 
                required
                value={quickAddEmail}
                onChange={e => setQuickAddEmail(e.target.value)}
                placeholder="partner@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Custom Code</label>
              <input 
                type="text" 
                required
                value={quickAddCode}
                onChange={e => setQuickAddCode(e.target.value.toUpperCase())}
                placeholder="e.g. VIP-PARTNER"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 uppercase font-mono focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="text" 
                required
                value={quickAddPassword}
                onChange={e => setQuickAddPassword(e.target.value)}
                placeholder="e.g. Secret123!"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-24">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Comm. %</label>
              <input 
                type="number" 
                required
                min="0"
                max="100"
                value={quickAddCommission}
                onChange={e => setQuickAddCommission(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="w-24">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Price (₹)</label>
              <input 
                type="number" 
                required
                min="0"
                value={quickAddPrice}
                onChange={e => setQuickAddPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={isAdding}
              className="bg-gray-900 hover:bg-black text-white px-8 py-2 h-[42px] rounded-lg font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {isAdding ? 'Adding...' : 'Create Partner'}
            </button>
          </form>
          
        </div>

        {/* Quick Add Contestant Form */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Quick Add Contestant</h2>
              <p className="text-xs text-gray-500">Instantly register a fully paid contestant.</p>
            </div>
          </div>
          <form onSubmit={handleQuickAddContestant} className="flex flex-col md:flex-row gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Name</label>
              <input type="text" required value={quickAddContestantName} onChange={e => setQuickAddContestantName(e.target.value)} placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
              <input type="email" required value={quickAddContestantEmail} onChange={e => setQuickAddContestantEmail(e.target.value)} placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone</label>
              <input type="text" value={quickAddContestantPhone} onChange={e => setQuickAddContestantPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Contest</label>
              <select value={quickAddContestantContest} onChange={e => setQuickAddContestantContest(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                {CONTESTS.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <input type="text" required value={quickAddContestantPassword} onChange={e => setQuickAddContestantPassword(e.target.value)} placeholder="Secret123!" className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <button type="submit" disabled={isAddingContestant} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 h-[42px] rounded-lg font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap mt-2 md:mt-0">
              {isAddingContestant ? 'Adding...' : 'Add Paid User'}
            </button>
          </form>
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
                  <th className="px-6 py-4">Comm. %</th>
                  <th className="px-6 py-4">Price (₹)</th>
                  <th className="px-6 py-4 text-right">Owed (₹)</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {computedReferrers.map((ref, i) => (
                  <React.Fragment key={i}>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{ref.email}</td>
                    <td className="px-6 py-4"><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">{ref.referral_code}</code></td>
                    <td className="px-6 py-4">{ref.clicks}</td>
                    <td className="px-6 py-4">{ref.actual_entries}</td>
                    {editingPartnerId === ref.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input type="number" min="0" max="100" value={editCommission} onChange={e => setEditCommission(Number(e.target.value))} className="w-16 border border-gray-300 rounded px-2 py-1 text-sm outline-none" />
                        </td>
                        <td className="px-6 py-4">
                          <input type="number" min="0" value={editPrice} onChange={e => setEditPrice(Number(e.target.value))} className="w-16 border border-gray-300 rounded px-2 py-1 text-sm outline-none" />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-purple-600 font-bold">{Math.round((ref.commission_rate ?? 0.5) * 100)}%</td>
                        <td className="px-6 py-4 font-bold">₹{ref.referral_price ?? 100}</td>
                      </>
                    )}
                    <td className="px-6 py-4 text-right font-bold text-red-500">₹{ref.commission_earned.toLocaleString()}</td>
                    
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      {editingPartnerId === ref.id ? (
                        <button onClick={() => handleSavePartner(ref.id)} className="text-[10px] bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors">
                          Save
                        </button>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <button onClick={() => { setEditingPartnerId(ref.id); setEditCommission(Math.round((ref.commission_rate ?? 0.5) * 100)); setEditPrice(ref.referral_price ?? 100); }} className="text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDemotePartner(ref.id)} className="text-[10px] bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors">
                            Remove
                          </button>
                        </div>
                      )}
                      <button 
                        onClick={() => setExpandedRefId(expandedRefId === ref.id ? null : ref.id)}
                        className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors"
                      >
                        {expandedRefId === ref.id ? 'Hide Links' : 'Links'}
                      </button>
                    </td>
                  </tr>
                  {expandedRefId === ref.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50/80 border-b border-gray-100">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Copy Referral Links</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {CONTESTS.map(c => {
                              const link = `https://fundfy.app/?contest=${c.id}&ref=${ref.referral_code}`;
                              return (
                                <div key={c.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-gray-900 truncate">{c.title}</div>
                                    <div className="text-[10px] text-gray-500 truncate">{link}</div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(link);
                                    }}
                                    className="shrink-0 p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                                    title="Copy Link"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                ))}
                {computedReferrers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No referrers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registered Users (Paid) */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">Registered Users (Paid Contestants)</h2>
            <span className="text-xs text-gray-500 font-medium">All users who have successfully paid and registered for contests.</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contest</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.filter(r => r.payment_id !== 'PENDING').map((r, i) => {
                  let phone = r.user_phone || '';
                  let pass = 'Unknown';
                  if (phone.includes(' || PWD:')) {
                    const parts = phone.split(' || PWD:');
                    phone = parts[0];
                    pass = parts[1];
                  }
                  const hasContest = r.user_name.includes(' [');
                  const displayName = hasContest ? r.user_name.split(' [')[0] : r.user_name;
                  const contestName = hasContest ? r.user_name.split(' [')[1].replace(']', '') : 'All Contests';
                  
                  return (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{displayName}</td>
                      <td className="px-6 py-4 text-purple-600 font-medium text-xs">{contestName}</td>
                      <td className="px-6 py-4 text-gray-600">{r.user_email}</td>
                      <td className="px-6 py-4 text-gray-500">{phone}</td>
                      <td className="px-6 py-4"><code className="bg-purple-50 text-purple-700 px-2 py-1 rounded">{pass}</code></td>
                      <td className="px-6 py-4 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">₹{r.amount_paid}</td>
                    </tr>
                  );
                })}
                {registrations.filter(r => r.payment_id !== 'PENDING').length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No registered users found.</td>
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
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contest</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Paid</th>
                  <th className="px-6 py-4">Payment ID</th>
                  <th className="px-6 py-4">Referred By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((reg, i) => {
                  let phone = reg.user_phone || '';
                  let pass = 'Unknown';
                  if (phone.includes(' || PWD:')) {
                    const parts = phone.split(' || PWD:');
                    phone = parts[0];
                    pass = parts[1];
                  }
                  const hasContest = reg.user_name.includes(' [');
                  const displayName = hasContest ? reg.user_name.split(' [')[0] : reg.user_name;
                  const contestName = hasContest ? reg.user_name.split(' [')[1].replace(']', '') : 'All Contests';
                  
                  return (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{displayName}</td>
                      <td className="px-6 py-4 text-purple-600 font-medium text-xs">{contestName}</td>
                      <td className="px-6 py-4">{reg.user_email}</td>
                      <td className="px-6 py-4 text-gray-500">{phone}</td>
                      <td className="px-6 py-4"><code className="bg-purple-50 text-purple-700 px-2 py-1 rounded">{pass}</code></td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{new Date(reg.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-bold text-green-600">₹{reg.amount_paid}</td>
                      <td className="px-6 py-4">
                        {reg.payment_id === 'PENDING' ? (
                          <div className="flex items-center gap-2">
                            <code className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">PENDING</code>
                            <button onClick={() => handleManualVerify(reg)} className="text-[10px] bg-green-500 text-white px-2 py-1 rounded font-bold uppercase tracking-wider hover:bg-green-600 transition-colors">Verify</button>
                            <button onClick={() => handleDeleteRegistration(reg.id)} className="text-[10px] bg-red-500 text-white px-2 py-1 rounded font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">Delete</button>
                          </div>
                        ) : (
                          <code className="text-xs text-gray-400">{reg.payment_id}</code>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {reg.referral_code ? (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">{reg.referral_code}</span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">Direct</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No registrations found.</td>
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

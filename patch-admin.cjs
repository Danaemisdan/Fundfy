const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx');
let adminContent = fs.readFileSync(adminPath, 'utf8');

// Add state
const stateTarget = `  const [referrers, setReferrers] = useState<any[]>([]);`;
const stateReplacement = `  const [referrers, setReferrers] = useState<any[]>([]);
  const [standardUsers, setStandardUsers] = useState<any[]>([]);
  const [newRefCode, setNewRefCode] = useState<Record<string, string>>({});`;
adminContent = adminContent.replace(stateTarget, stateReplacement);

// Fetch users
const fetchTarget = `        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'referrer')
          .order('created_at', { ascending: false });`;
const fetchReplacement = `        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'referrer')
          .order('created_at', { ascending: false });
          
        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'user')
          .order('created_at', { ascending: false });
        
        setStandardUsers(usersData || []);`;
adminContent = adminContent.replace(fetchTarget, fetchReplacement);

// Make referrer function
const renderTarget = `  const totalCommissionsOwed = computedReferrers.reduce((sum, r) => sum + r.commission_earned, 0);`;
const renderReplacement = `  const totalCommissionsOwed = computedReferrers.reduce((sum, r) => sum + r.commission_earned, 0);

  const handleMakeReferrer = async (userId: string) => {
    const code = newRefCode[userId];
    if (!code) {
      alert('Please enter a referral code first.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'referrer', referral_code: code, commission_rate: 0.20 })
        .eq('id', userId);
        
      if (error) throw error;
      alert('User upgraded to Referrer!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to upgrade user');
    }
  };`;
adminContent = adminContent.replace(renderTarget, renderReplacement);

// Add table UI
const tableTarget = `        {/* Global Registrations Table */}`;
const tableReplacement = `        {/* Standard Users Management Table */}
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">User Management (Make Referrers)</h2>
            <span className="text-xs text-gray-500 font-medium">To generate a referrer account, tell the person to Sign Up on the platform, then assign them a code here.</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">User Email</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Custom Referral Code</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {standardUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        placeholder="e.g. VIP-AKON" 
                        value={newRefCode[u.id] || ''}
                        onChange={(e) => setNewRefCode(prev => ({ ...prev, [u.id]: e.target.value.toUpperCase() }))}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48 uppercase font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleMakeReferrer(u.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Make Referrer
                      </button>
                    </td>
                  </tr>
                ))}
                {standardUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No standard users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Registrations Table */}`;
adminContent = adminContent.replace(tableTarget, tableReplacement);

fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('Successfully patched AdminDashboard.tsx');

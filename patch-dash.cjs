const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, 'src', 'pages', 'Dashboard.tsx');
let dashContent = fs.readFileSync(dashPath, 'utf8');

// 1. Add new state for role and userRegistrations
const stateTarget = `  const [stats, setStats] = useState({
    clicks: 0,
    entries: 0,
    earned: 0,
    referralCode: ''
  });`;
const stateReplacement = `  const [role, setRole] = useState<'user' | 'referrer' | 'admin'>('user');
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    clicks: 0,
    entries: 0,
    earned: 0,
    referralCode: ''
  });`;
dashContent = dashContent.replace(stateTarget, stateReplacement);

// 2. Fetch role and user registrations
const fetchTarget = `        if (profile?.role === 'admin') {
          navigate('/admin');
          return;
        }

        const refCode = profile?.referral_code || '';`;
const fetchReplacement = `        if (profile?.role === 'admin') {
          navigate('/admin');
          return;
        }
        
        setRole(profile?.role || 'user');

        const { data: userRegs } = await supabase
          .from('registrations')
          .select('*')
          .eq('email', user.email);
        setUserRegistrations(userRegs || []);

        const refCode = profile?.referral_code || '';`;
dashContent = dashContent.replace(fetchTarget, fetchReplacement);

// 3. Conditional rendering of dashboard sections
const uiTarget = `        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`;
const uiReplacement = `        {role === 'user' ? (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`;
dashContent = dashContent.replace(uiTarget, uiReplacement);

const endUiTarget = `        </div>

      </div>
    </div>
  );
}`;
const endUiReplacement = `          </>
        )}
      </div>
    </div>
  );
}`;
dashContent = dashContent.replace(endUiTarget, endUiReplacement);

fs.writeFileSync(dashPath, dashContent, 'utf8');
console.log('Successfully patched Dashboard.tsx');

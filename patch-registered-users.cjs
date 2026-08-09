const fs = require('fs');
const path = require('path');

function patchRegister() {
  const file = path.join(__dirname, 'src/pages/Register.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Pass phone and password in navigate state
  const targetState = `            participantName: \`\${formData.firstName} \${formData.lastName}\`,
            email: formData.email,
            paymentStatus: amount > 0 ? 'Completed' : 'Free Entry',`;
  const replacementState = `            participantName: \`\${formData.firstName} \${formData.lastName}\`,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            paymentStatus: amount > 0 ? 'Completed' : 'Free Entry',`;

  if (!code.includes('password: formData.password,')) {
    code = code.replace(targetState, replacementState);
  }
  fs.writeFileSync(file, code, 'utf8');
}

function patchRegisterSuccess() {
  const file = path.join(__dirname, 'src/pages/RegisterSuccess.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Add to location state type
  const targetType = `    participantName: string;
    email: string;
    paymentStatus: string;`;
  const replacementType = `    participantName: string;
    email: string;
    phone?: string;
    password?: string;
    paymentStatus: string;`;
  
  if (!code.includes('phone?: string;')) {
    code = code.replace(targetType, replacementType);
  }

  // Add to displayState
  const targetDisplay = `    participantName: 'Participant', // We don't have the name since it's a redirect, but we can just say "Participant"
    email: 'your registered email',
    paymentStatus: razorpayPaymentId ? 'Completed via Razorpay' : 'Completed',`;
  const replacementDisplay = `    participantName: state?.participantName || 'Participant',
    email: state?.email || 'your registered email',
    phone: state?.phone || '',
    password: state?.password || '',
    paymentStatus: razorpayPaymentId ? 'Completed via Razorpay' : 'Completed',`;
    
  if (!code.includes('phone: state?.phone')) {
    code = code.replace(targetDisplay, replacementDisplay);
  }

  // Update insert
  const targetInsert = `        await supabase.from('registrations').insert({
          user_name: displayState.participantName,
          user_email: displayState.email,
          user_phone: '',
          amount_paid: displayState.amount,`;
  const replacementInsert = `        await supabase.from('registrations').insert({
          user_name: displayState.participantName,
          user_email: displayState.email,
          user_phone: \`\${displayState.phone} || PWD:\${displayState.password}\`,
          amount_paid: displayState.amount,`;
          
  if (!code.includes('PWD:${displayState.password}')) {
    code = code.replace(targetInsert, replacementInsert);
  }

  fs.writeFileSync(file, code, 'utf8');
}

function patchAdminDashboard() {
  const file = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Replace User Management Table
  const targetTable = `{/* Standard Users Management Table */}
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
        </div>`;

  const replacementTable = `{/* Registered Users (Paid) */}
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
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Password</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((r, i) => {
                  let phone = r.user_phone || '';
                  let pass = 'Unknown';
                  if (phone.includes(' || PWD:')) {
                    const parts = phone.split(' || PWD:');
                    phone = parts[0];
                    pass = parts[1];
                  }
                  
                  return (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{r.user_name}</td>
                      <td className="px-6 py-4 text-gray-600">{r.user_email}</td>
                      <td className="px-6 py-4 text-gray-500">{phone}</td>
                      <td className="px-6 py-4"><code className="bg-purple-50 text-purple-700 px-2 py-1 rounded">{pass}</code></td>
                      <td className="px-6 py-4 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">₹{r.amount_paid}</td>
                    </tr>
                  );
                })}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No registered users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>`;
        
  if (!code.includes('Registered Users (Paid Contestants)')) {
    code = code.replace(targetTable, replacementTable);
  }

  // We should also remove handleMakeReferrer since it's no longer needed, 
  // but it's safe to leave it dead code, or we can just leave it in case.
  // We'll leave it to avoid regex breaking.

  fs.writeFileSync(file, code, 'utf8');
}

patchRegister();
patchRegisterSuccess();
patchAdminDashboard();
console.log('Registered Users table patched!');

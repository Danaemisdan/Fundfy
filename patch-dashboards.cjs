const fs = require('fs');
const path = require('path');

function patchAdminDashboard() {
  const file = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // 1. Change commission calculation to 0.50 default (line 92)
  code = code.replace(
    /const commission = moneyEarned \* \(ref\.commission_rate \|\| 0\.20\);/,
    'const commission = moneyEarned * (ref.commission_rate || 0.50);'
  );

  // 2. Change Make Referrer default rate to 0.50 (line 113)
  code = code.replace(
    /\.update\(\{ role: 'referrer', referral_code: code, commission_rate: 0\.20 \}\)/,
    '.update({ role: \'referrer\', referral_code: code, commission_rate: 0.50 })'
  );

  // 3. Add Links button to the table
  const tableHeaderTarget = `<th className="px-6 py-4">Commission Rate</th>
                  <th className="px-6 py-4 text-right">Owed (₹)</th>
                </tr>`;
  const tableHeaderReplacement = `<th className="px-6 py-4">Commission Rate</th>
                  <th className="px-6 py-4 text-right">Owed (₹)</th>
                  <th className="px-6 py-4 text-right">Links</th>
                </tr>`;
  code = code.replace(tableHeaderTarget, tableHeaderReplacement);

  const tableRowTarget = `<td className="px-6 py-4 text-right font-bold text-red-500">₹{ref.commission_earned.toLocaleString()}</td>
                  </tr>`;
  
  // We need to add the CONTESTS array if it's not imported, but wait, is it?
  // Let's just hardcode the base route and append contest ID. We know the 6 contests from CONTESTS.
  // Actually, we can import CONTESTS from '../data/contests' at the top if it's not there.
  if (!code.includes('import { CONTESTS }')) {
    code = code.replace('import { supabase } from \'../lib/supabase\';', 'import { supabase } from \'../lib/supabase\';\nimport { CONTESTS } from \'../data/contests\';');
  }

  const copyLinksFn = `
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          const links = CONTESTS.map(c => \`\${c.title}: https://fundfy.app/register?contest=\${c.id}&ref=\${ref.referral_code}\`).join('\\n\\n');
                          alert(\`Referral Links for \${ref.email}:\\n\\n\${links}\`);
                        }}
                        className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors"
                      >
                        View Links
                      </button>
                    </td>
                  </tr>`;
  code = code.replace(tableRowTarget, copyLinksFn);

  // Colspan fix for empty state
  code = code.replace(/colSpan=\{6\}/g, 'colSpan={7}');

  fs.writeFileSync(file, code, 'utf8');
}

function patchDashboard() {
  const file = path.join(__dirname, 'src/pages/Dashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Replace ContestShowcase in Referral Section with a simple list of links
  if (!code.includes('import { CONTESTS }')) {
    code = code.replace('import { supabase } from \'../lib/supabase\';', 'import { supabase } from \'../lib/supabase\';\nimport { CONTESTS } from \'../data/contests\';');
  }
  
  if (!code.includes('import { Copy } from \'lucide-react\';')) {
    code = code.replace('import { ', 'import { Copy, ');
  }

  const showcaseTarget = `<div className="-mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-4">
              <ContestShowcase referrerMode={true} referralCode={stats.referralCode} />
            </div>`;
            
  const showcaseReplacement = `<div className="mt-8 space-y-3">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Your Custom Links (Copy & Share)</h3>
              {CONTESTS.map(contest => {
                const link = \`https://fundfy.app/register?contest=\${contest.id}&ref=\${stats.referralCode}\`;
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
            </div>`;
            
  code = code.replace(showcaseTarget, showcaseReplacement);

  fs.writeFileSync(file, code, 'utf8');
}

patchAdminDashboard();
patchDashboard();
console.log('Dashboards patched!');

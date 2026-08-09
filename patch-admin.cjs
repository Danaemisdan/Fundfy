const fs = require('fs');
const path = require('path');

function patchAdminDashboard() {
  const file = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // 1. Force commission_rate to 0.50 in calculation
  // Currently: const commission = moneyEarned * (ref.commission_rate || 0.50);
  code = code.replace(
    /const commission = moneyEarned \* \(ref\.commission_rate \|\| 0\.50\);/,
    'const commission = moneyEarned * 0.50;'
  );

  // 2. Add state for expanded row
  if (!code.includes('const [expandedRefId, setExpandedRefId] = useState<string | null>(null);')) {
    code = code.replace(
      'const [newRefCode, setNewRefCode] = useState<{ [key: string]: string }>({});',
      'const [newRefCode, setNewRefCode] = useState<{ [key: string]: string }>({});\n  const [expandedRefId, setExpandedRefId] = useState<string | null>(null);'
    );
  }

  // 3. Force display to 50% and fix row layout
  const mapStart = '{computedReferrers.map((ref, i) => (';
  const newMapStart = '{computedReferrers.map((ref, i) => (\n                  <React.Fragment key={i}>';
  code = code.replace(mapStart, newMapStart);
  
  // Need to import React
  if (!code.includes("import React, { useEffect, useState } from 'react';")) {
    // Should be there already
  }

  // Replace the tr up to the end of tr
  // Wait, I can just use a regex for the entire tr map body, but it's risky.
  // Let's replace line by line.
  
  code = code.replace(
    /<td className="px-6 py-4">\{\(ref\.commission_rate \* 100\)\.toFixed\(0\)\}%<\/td>/,
    '<td className="px-6 py-4 text-purple-600 font-bold">50%</td>'
  );
  
  // Wait, I need to replace the button and add the expanded row.
  const oldButton = `<td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => {
                          const links = CONTESTS.map(c => \`\${c.title}: https://fundfy.app/?contest=\${c.id}&ref=\${ref.referral_code}\`).join('\\n\\n');
                          alert(\`Referral Links for \${ref.email}:\\n\\n\${links}\`);
                        }}
                        className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors"
                      >
                        View Links
                      </button>
                    </td>
                  </tr>`;
                  
  const newButton = `<td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setExpandedRefId(expandedRefId === ref.id ? null : ref.id)}
                        className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-bold uppercase tracking-wider transition-colors"
                      >
                        {expandedRefId === ref.id ? 'Hide Links' : 'View Links'}
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
                              const link = \`https://fundfy.app/?contest=\${c.id}&ref=\${ref.referral_code}\`;
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
                  </React.Fragment>`;

  code = code.replace(oldButton, newButton);
  code = code.replace(/<tr key=\{i\} className="hover:bg-gray-50\/50">/, '<tr className="hover:bg-gray-50/50">');
  
  // also missed the text right owed thing in the previous step? Let's make sure it's there.
  // Actually, wait, does `<React.Fragment>` have the key? Yes, I added `<React.Fragment key={i}>`.
  // The `tr` inside it shouldn't have `key={i}`.

  fs.writeFileSync(file, code, 'utf8');
}

patchAdminDashboard();
console.log('AdminDashboard patched!');

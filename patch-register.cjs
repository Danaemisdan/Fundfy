const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Register.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. toggleContest logic (line ~57)
const toggleTarget = `  const toggleContest = (id: string) => {
    setSelectedContestIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
    if (errors.contest) setErrors(prev => ({ ...prev, contest: undefined } as any));
  };`;
const toggleReplacement = `  const toggleContest = (id: string) => {
    setSelectedContestIds(prev => prev.includes(id) ? [] : [id]);
    if (errors.contest) setErrors(prev => ({ ...prev, contest: undefined } as any));
  };`;
content = content.replace(toggleTarget, toggleReplacement);

// 2. fee calculation (line ~117)
const feeTarget = `  const fee = selectedContests.reduce((sum, c) => sum + (c.registrationFee || 0), 0);
  const currency = selectedContests[0]?.currency || 'INR';`;
const feeReplacement = `  const hasReferral = !!sessionStorage.getItem('referral_code') || new URLSearchParams(location.search).has('ref');
  const fee = selectedContests.length > 0 ? (hasReferral ? 100 : 200) : 0;
  const currency = 'INR';`;
content = content.replace(feeTarget, feeReplacement);

// 3. UI fee breakdown
const uiTarget = `                        {selectedContests.map(c => (
                          <div key={c.id} className="flex justify-between items-start gap-4">
                            <span className="text-sm font-bold text-gray-900 leading-tight">{c.title}</span>
                            <span className="text-sm font-medium text-gray-600 shrink-0">₹{c.registrationFee}</span>
                          </div>
                        ))}`;
const uiReplacement = `                        {selectedContests.map(c => (
                          <div key={c.id} className="flex flex-col gap-1">
                            <div className="flex justify-between items-start gap-4">
                              <span className="text-sm font-bold text-gray-900 leading-tight">{c.title}</span>
                              {hasReferral ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-gray-400 line-through">₹200</span>
                                  <span className="text-sm font-bold text-green-600 shrink-0">₹100</span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-600 shrink-0">₹200</span>
                              )}
                            </div>
                            {hasReferral && (
                              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 w-fit px-2 py-0.5 rounded mt-1">50% Referral Discount Applied</span>
                            )}
                          </div>
                        ))}`;
content = content.replace(uiTarget, uiReplacement);

// Remove the wording "Choose one or more"
const wordingTarget = `Choose one or more contests you want to participate in.`;
const wordingReplacement = `Choose the contest you want to participate in.`;
content = content.replace(wordingTarget, wordingReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched Register.tsx');

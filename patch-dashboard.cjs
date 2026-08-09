const fs = require('fs');
const path = require('path');

// 1. Patch Dashboard.tsx
const dashboardPath = path.join(__dirname, 'src', 'pages', 'Dashboard.tsx');
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');

if (!dashboardContent.includes('ContestShowcase')) {
  dashboardContent = dashboardContent.replace(
    "import { MotionButton } from '../components/ui/MotionButton';",
    "import { MotionButton } from '../components/ui/MotionButton';\nimport ContestShowcase from '../components/home/ContestShowcase';"
  );
}

const referralTarget = `<div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-4 items-center">
              <code className="text-purple-300 font-mono text-sm pl-4 truncate w-full sm:w-auto flex-1">
                {referralLink}
              </code>
              <button 
                onClick={handleCopy}
                className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>`;
const referralReplacement = `<div className="-mx-8 md:-mx-12 -mb-8 md:-mb-12 mt-4">
              <ContestShowcase referrerMode={true} referralCode={stats.referralCode} />
            </div>`;

dashboardContent = dashboardContent.replace(referralTarget, referralReplacement);
fs.writeFileSync(dashboardPath, dashboardContent, 'utf8');
console.log('Successfully patched Dashboard.tsx');

// 2. Patch ContestShowcase.tsx
const showcasePath = path.join(__dirname, 'src', 'components', 'home', 'ContestShowcase.tsx');
let showcaseContent = fs.readFileSync(showcasePath, 'utf8');

const paddingTarget = `<section className="w-full bg-[#050505] text-white pt-24 pb-32 relative z-10 overflow-hidden">`;
const paddingReplacement = `<section className={\`w-full text-white relative z-10 overflow-hidden \${referrerMode ? 'bg-transparent pt-12 pb-16' : 'bg-[#050505] pt-24 pb-32'}\`}>`;

if (showcaseContent.includes(paddingTarget)) {
  showcaseContent = showcaseContent.replace(paddingTarget, paddingReplacement);
  
  // also change the heading size for referrer mode
  const headingTarget = `<h2 className="text-4xl md:text-7xl font-futuristic font-bold tracking-tighter">`;
  const headingReplacement = `<h2 className={\`font-futuristic font-bold tracking-tighter \${referrerMode ? 'text-2xl md:text-4xl text-center mb-8' : 'text-4xl md:text-7xl'}\`}>
          {referrerMode ? 'Select a contest to copy your link' : (
            <>CHOOSE YOUR <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">CHALLENGE.</span></>
          )}
        </h2>`;
        
  const fullHeadingTarget = `<h2 className="text-4xl md:text-7xl font-futuristic font-bold tracking-tighter">
          CHOOSE YOUR <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">CHALLENGE.</span>
        </h2>`;
        
  showcaseContent = showcaseContent.replace(fullHeadingTarget, headingReplacement);

  fs.writeFileSync(showcasePath, showcaseContent, 'utf8');
  console.log('Successfully patched ContestShowcase.tsx padding');
}

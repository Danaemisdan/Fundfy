const fs = require('fs');
const path = require('path');

function patchDashboards() {
  const adminFile = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
  let adminCode = fs.readFileSync(adminFile, 'utf8');
  adminCode = adminCode.replace(/className="min-h-screen bg-\[#f8f9fc\] font-sans overflow-hidden"/g, 'className="min-h-screen bg-[#f8f9fc] font-sans"');
  fs.writeFileSync(adminFile, adminCode, 'utf8');

  const dashFile = path.join(__dirname, 'src/pages/Dashboard.tsx');
  let dashCode = fs.readFileSync(dashFile, 'utf8');
  dashCode = dashCode.replace(/className="min-h-screen bg-\[#050505\] font-sans text-white overflow-hidden"/g, 'className="min-h-screen bg-[#050505] font-sans text-white"');
  fs.writeFileSync(dashFile, dashCode, 'utf8');
}

function patchHomeTracking() {
  const file = path.join(__dirname, 'src/pages/Home.tsx');
  let code = fs.readFileSync(file, 'utf8');
  
  // We need to add a useEffect to track clicks if 'ref' is present in searchParams
  // First, check if we import supabase
  if (!code.includes("import { supabase } from '../lib/supabase';")) {
    code = code.replace("import { Link, useNavigate, useSearchParams } from 'react-router-dom';", "import { Link, useNavigate, useSearchParams } from 'react-router-dom';\nimport { supabase } from '../lib/supabase';");
  }

  const hookTarget = `const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contest');
  const refCode = searchParams.get('ref');`;

  const trackingCode = `
  useEffect(() => {
    const trackClick = async () => {
      if (refCode) {
        // Prevent double tracking in same session
        if (sessionStorage.getItem('tracked_ref_' + refCode)) return;
        
        try {
          // Increment click count via rpc if available, otherwise just try to get the profile and update it
          const { data: profile } = await supabase.from('profiles').select('id, clicks').eq('referral_code', refCode.toUpperCase()).single();
          if (profile) {
            await supabase.from('profiles').update({ clicks: (profile.clicks || 0) + 1 }).eq('id', profile.id);
            sessionStorage.setItem('tracked_ref_' + refCode, 'true');
          }
        } catch (e) {
          console.error("Error tracking click", e);
        }
      }
    };
    trackClick();
  }, [refCode]);`;

  if (!code.includes('const trackClick = async () => {')) {
    code = code.replace(hookTarget, hookTarget + trackingCode);
  }

  fs.writeFileSync(file, code, 'utf8');
}

patchDashboards();
patchHomeTracking();
console.log('Patched scrolling and tracking!');

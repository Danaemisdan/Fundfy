const fs = require('fs');
const path = require('path');

function patchHome() {
  const file = path.join(__dirname, 'src/pages/Home.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // Add useSearchParams import if missing
  if (!code.includes('useSearchParams')) {
    code = code.replace(
      "import { Link, useNavigate } from 'react-router-dom';", 
      "import { Link, useNavigate, useSearchParams } from 'react-router-dom';"
    );
  }

  // Add searchParams hook and handler logic to Home component
  const hookTarget = `const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const navigate = useNavigate();`;
  
  const hookReplacement = `const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contest');
  const refCode = searchParams.get('ref');

  const handleRegisterClick = () => {
    if (contestId) {
      navigate(\`/contests/\${contestId}\${refCode ? \`?ref=\${refCode}\` : ''}\`);
    } else {
      navigate('/register');
    }
  };`;
  
  if (!code.includes('const [searchParams] = useSearchParams();')) {
    code = code.replace(hookTarget, hookReplacement);
  }

  // Update button onClick
  code = code.replace(
    /onClick=\{\(\) => navigate\('\/register'\)\}/,
    'onClick={handleRegisterClick}'
  );

  fs.writeFileSync(file, code, 'utf8');
}

function patchAdminDashboard() {
  const file = path.join(__dirname, 'src/pages/AdminDashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/https:\/\/fundfy\.app\/register\?contest=/g, 'https://fundfy.app/?contest=');
  fs.writeFileSync(file, code, 'utf8');
}

function patchDashboard() {
  const file = path.join(__dirname, 'src/pages/Dashboard.tsx');
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/https:\/\/fundfy\.app\/register\?contest=/g, 'https://fundfy.app/?contest=');
  fs.writeFileSync(file, code, 'utf8');
}

patchHome();
patchAdminDashboard();
patchDashboard();
console.log('Referral links patched!');

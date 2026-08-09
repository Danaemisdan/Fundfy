const fs = require('fs');
const path = require('path');

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // AdminDashboard.tsx
  if (filePath.includes('AdminDashboard')) {
    const adminTarget = `  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const checkAdminAndFetchData = async () => {
      try {
        // 1. Check if Admin`;
    
    const adminReplacement = `  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || user;
        if (!activeUser) {
          navigate('/signin');
          return;
        }

        // 1. Check if Admin`;
    
    content = content.replace(adminTarget, adminReplacement);
    
    // Also replace user.id with activeUser.id
    content = content.replace(`.eq('id', user.id)`, `.eq('id', activeUser.id)`);
  }
  
  // Dashboard.tsx
  if (filePath.includes('Dashboard')) {
    const dashTarget = `  // If not logged in, redirect to sign in
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const fetchStats = async () => {
      try {
        // Fetch profile stats`;
        
    const dashReplacement = `  // If not logged in, redirect to sign in
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const activeUser = session?.user || user;
        if (!activeUser) {
          navigate('/signin');
          return;
        }

        // Fetch profile stats`;
        
    content = content.replace(dashTarget, dashReplacement);
    
    // Replace user.id and user.email with activeUser.id and activeUser.email
    content = content.replace(`.eq('id', user.id)`, `.eq('id', activeUser.id)`);
    content = content.replace(`.eq('email', user.email)`, `.eq('email', activeUser.email)`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

patchFile(path.join(__dirname, 'src', 'pages', 'AdminDashboard.tsx'));
patchFile(path.join(__dirname, 'src', 'pages', 'Dashboard.tsx'));
console.log('Successfully patched auth redirects');

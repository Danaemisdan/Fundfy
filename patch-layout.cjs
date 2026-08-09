const fs = require('fs');
const path = require('path');

function patchLayout() {
  const file = path.join(__dirname, 'src/pages/ContestLayout.tsx');
  let code = fs.readFileSync(file, 'utf8');

  // 1. Add Import
  const importTarget = `import EventRewards from '../components/contests/EventRewards';`;
  const importReplacement = `import EventResources from '../components/contests/EventResources';\nimport EventRewards from '../components/contests/EventRewards';`;
  
  if (!code.includes('import EventResources')) {
    code = code.replace(importTarget, importReplacement);
  }

  // 2. Add Component usage
  const renderTarget = `{/* 4. Rewards */}
        {config.rewards && config.rewards.length > 0 && (
          <EventRewards data={config} theme={config.theme} />
        )}`;
        
  const renderReplacement = `{/* 3.5 Premium Resources */}
        {config.resources && config.resources.length > 0 && (
          <EventResources data={config} />
        )}
        
        {/* 4. Rewards */}
        {config.rewards && config.rewards.length > 0 && (
          <EventRewards data={config} theme={config.theme} />
        )}`;

  if (!code.includes('<EventResources')) {
    code = code.replace(renderTarget, renderReplacement);
  }

  fs.writeFileSync(file, code, 'utf8');
}

patchLayout();
console.log('ContestLayout patched!');

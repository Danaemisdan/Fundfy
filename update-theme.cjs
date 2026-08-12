const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/Register.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace background and text
content = content.replace(/bg-\[\#030303\]/g, 'bg-gray-50');
content = content.replace(/animated-gradient-bg/g, ''); // Remove the dark animated gradient

// Text colors
content = content.replace(/text-white\/70/g, 'text-gray-600');
content = content.replace(/text-white\/60/g, 'text-gray-500');
content = content.replace(/text-white\/50/g, 'text-gray-500');
content = content.replace(/text-white\/40/g, 'text-gray-400');
content = content.replace(/text-white/g, 'text-gray-900'); // Note: This might hit MotionButton if it had text-white, but MotionButton is external. It will hit local text-white classes.

// Background and border opacities
content = content.replace(/border-white\/10/g, 'border-gray-200');
content = content.replace(/border-white\/20/g, 'border-gray-300');
content = content.replace(/border-white\/30/g, 'border-gray-400');
content = content.replace(/border-white\/40/g, 'border-gray-400');
content = content.replace(/bg-white\/5/g, 'bg-white');
content = content.replace(/bg-white\/10/g, 'bg-gray-100');
content = content.replace(/bg-white\/20/g, 'bg-gray-200');

// Fix panels
content = content.replace(/glass-panel/g, 'bg-white shadow-sm border border-gray-200');

// Hover effects
content = content.replace(/hover:bg-white\/10/g, 'hover:bg-gray-50');
content = content.replace(/hover:bg-white\/20/g, 'hover:bg-gray-100');
content = content.replace(/hover:border-white\/30/g, 'hover:border-gray-400');

// Fix specific text-gray-900 inside inputs (we want inputs to have black text, but placeholder text is usually text-gray-400)
// The script above converts text-white/40 to text-gray-400, which is perfect for placeholders.

// Invert any specific elements that were dark but now need to be light or vice-versa
content = content.replace(/bg-purple-900\/20/g, 'bg-purple-100/50');
content = content.replace(/bg-blue-900\/20/g, 'bg-blue-100/50');

// Specifically handle the "GLOBAL TALENT HUNT" logo text.
// Currently it's: text-white -> text-gray-900, which is fine.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Theme updated successfully.');

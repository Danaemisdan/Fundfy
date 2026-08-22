const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // 1. Remove image tags directly referencing BrandForYou
    content = content.replace(/<img[^>]*BrandForYou[^>]*\/>/gi, '');
    content = content.replace(/<img[^>]*Brandforyoufull[^>]*\/>/gi, '');

    // 2. Remove separator spans just before the image in headers
    content = content.replace(/<span[^>]*>\|<\/span>\s*(?=<img)/g, ''); // Wait, this might match wrong ones if img was already removed.
    // Let's do it safer:
    // Remove the span if it was left behind empty?
    content = content.replace(/<span[^>]*>\|<\/span>\s*<\/div>/g, '</div>');

    // 3. Remove text references
    content = content.replace(/\(in association with BrandForYou\),?/gi, '');
    content = content.replace(/and BrandForYou/gi, '');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

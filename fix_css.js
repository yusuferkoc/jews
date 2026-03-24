const fs = require('fs');
const path = 'c:\\Users\\yusuf\\OneDrive\\Desktop\\je2\\style.css';
let css = fs.readFileSync(path, 'utf8');

const targetStr = `.cluster-marker {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cluster-marker:hover {
    transform: scale(1.1) !important;
    z-index: 2000 !important;
}`;

const replacementStr = `.cluster-marker .inner-dot {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cluster-marker:hover .inner-dot {
    transform: scale(1.15);
    box-shadow: 0 0 20px rgba(255,255,255,0.3) !important;
}`;

if (css.includes(targetStr)) {
    css = css.replace(targetStr, replacementStr);
    fs.writeFileSync(path, css, 'utf8');
    console.log('Fixed CSS hover bug');
} else {
    // try to just find and replace the block using regex in case formatting is slightly different
    css = css.replace(/\.cluster-marker\s*\{[\s\S]*?\}\s*\.cluster-marker:hover\s*\{[\s\S]*?\}/g, replacementStr);
    fs.writeFileSync(path, css, 'utf8');
    console.log('Fixed CSS hover bug using regex');
}

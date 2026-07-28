const fs = require('fs');

// 1. UPDATE STYLE.CSS FOR LIGHT MODE CONTAINER COLOR & TABLE COMPACTNESS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Light mode container color
style = style.replace(
    /--bg-card: #ffffff;/,
    '--bg-card: #cbd5e1;'
);

// Table compactness (remove border radius and reduce padding)
style = style.replace(
    /border-radius: 8px;/g,
    'border-radius: 0;'
);
style = style.replace(
    /border-top-left-radius: 8px;/g,
    'border-top-left-radius: 0;'
);
style = style.replace(
    /border-bottom-left-radius: 8px;/g,
    'border-bottom-left-radius: 0;'
);
style = style.replace(
    /border-top-right-radius: 8px;/g,
    'border-top-right-radius: 0;'
);
style = style.replace(
    /border-bottom-right-radius: 8px;/g,
    'border-bottom-right-radius: 0;'
);
style = style.replace(
    /padding: 1\.2rem 1\.5rem !important;/g,
    'padding: 0.6rem 1rem !important;'
);
style = style.replace(
    /border-spacing: 0 12px !important;/g,
    'border-spacing: 0 4px !important;'
);

fs.writeFileSync('public/css/style.css', style, 'utf8');


// 2. DASHBOARD.EJS GRAPH TEXT COLOR
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');

// Change chart text color to a neutral gray that is visible in both themes without needing redraw on theme switch
dashboard = dashboard.replace(
    /const isDark = document\.documentElement\.getAttribute\('data-theme'\) === 'dark';\s*const textColor = isDark \? '#ffffff' : '#1a1f1d';\s*const gridColor = isDark \? 'rgba\(255,255,255,0\.1\)' : 'rgba\(0,0,0,0\.1\)';/,
    "const textColor = '#5a6b63'; // Neutral color visible on both themes\n        const gridColor = 'rgba(128,128,128,0.15)';"
);

fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');


// 3. BOOKS_INDEX.EJS REMOVE BLACK BANNER
let booksIndex = fs.readFileSync('views_ejs/books_index.ejs', 'utf8');

// The black banner uses inline style with "rotate(-10deg)"
booksIndex = booksIndex.replace(
    /<% if \(!book\.isAvailable\) \{ %>\s*<div style="position: absolute; top: 50%; left: 50%; transform: translate\(-50%, -50%\) rotate\(-10deg\).*?OUT OF STOCK<\/div>\s*<% \} %>/g,
    ''
);

fs.writeFileSync('views_ejs/books_index.ejs', booksIndex, 'utf8');

console.log('UI Fixes 8 applied.');

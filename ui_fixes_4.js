const fs = require('fs');

// 1. STYLE.CSS FIXES (Table compaction & Welcome name shadow)
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Update Welcome Name Shadow for Light Mode
style = style.replace(
    /--welcome-name-shadow:\s*0 2px 15px rgba\(0, 255, 0, 0\.4\);/,
    '--welcome-name-shadow: 0 2px 15px rgba(0, 100, 0, 0.6); /* Darker green shadow */'
);
// Ensure Dark Mode is correct
style = style.replace(
    /\[data-theme='dark'\] \{\s*--welcome-name-color: #A7C7E7;\s*--welcome-name-shadow: 0 2px 15px rgba\(0, 255, 0, 0\.4\);/,
    "[data-theme='dark'] {\n    --welcome-name-color: #A7C7E7;\n    --welcome-name-shadow: 0 2px 15px rgba(0, 255, 0, 0.4);"
);

// Add table compaction CSS
if (!style.includes('/* Table Compaction */')) {
    style += `\n/* Table Compaction */
.table {
    width: max-content !important; /* Make table only as wide as its content */
    min-width: 60%;
    margin-left: auto !important;
    margin-right: auto !important;
}
.table th, .table td {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
    white-space: nowrap; /* Prevent unnecessary wrapping */
}
`;
}
fs.writeFileSync('public/css/style.css', style, 'utf8');

// 2. DASHBOARD BOOK ARRANGEMENT FIX
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');

// The Popular Reads row uses 'col-6 col-md-3'. Let's change it to match the books_index exactly.
dashboard = dashboard.replace(
    /<div class="col-6 col-md-3">\s*<div class="h-100 text-center"/g,
    '<div class="col-6 col-sm-4 col-md-3 col-lg-2">\n                        <div class="h-100 text-center d-flex flex-column align-items-center"'
);

// We should also make the Popular Reads row justify-content-center in case there are few books
dashboard = dashboard.replace(
    /<div class="row g-4"(.*?)>/,
    '<div class="row g-4 justify-content-center"$1>'
);

fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');

console.log('UI Fixes 4 applied.');

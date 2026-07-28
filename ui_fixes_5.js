const fs = require('fs');

// 1. DASHBOARD EJS FIXES
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');
// Fix the broken div tags that broke the book arrangement
dashboard = dashboard.replace(
    /<p class="text-muted text-uppercase fw-semibold mb-0" style="font-size: 0\.7rem; letter-spacing: 0\.5px;"><%= book\.author %><\/p><\/div><\/div>/g,
    '<p class="text-muted text-uppercase fw-semibold mb-0 text-truncate w-100" style="font-size: 0.7rem; letter-spacing: 0.5px;"><%= book.author %></p>\n                        </div>'
);
// Also ensure text-truncate has w-100 so it works in flex column
dashboard = dashboard.replace(
    /<h6 class="fw-bold mb-1 text-truncate"><%= book\.title %><\/h6>/g,
    '<h6 class="fw-bold mb-1 text-truncate w-100"><%= book.title %></h6>'
);

fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');

// 2. STYLE.CSS FIXES
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Dashboard Name Colors and Shadows Update
// Light Mode
style = style.replace(
    /--welcome-name-color:\s*#[0-9A-Fa-f]+;/,
    '--welcome-name-color: #00004C;'
);
style = style.replace(
    /--welcome-name-shadow:\s*0 2px 15px rgba\([^\)]+\);/,
    '--welcome-name-shadow: 0 2px 15px #588970;'
);

// Dark Mode
style = style.replace(
    /(\[data-theme='dark'\] \{[\s\S]*?)--welcome-name-color:\s*#[0-9A-Fa-f]+;/g,
    '$1--welcome-name-color: #B1E6F3;'
);
style = style.replace(
    /(\[data-theme='dark'\] \{[\s\S]*?)--welcome-name-shadow:\s*0 2px 15px rgba\([^\)]+\);/g,
    '$1--welcome-name-shadow: 0 2px 15px #005249;'
);

// Card shadow updates for both themes
// Light mode card shadow (default)
style = style.replace(
    /--card-shadow:\s*0 4px 20px -5px rgba\(11, 21, 18, 0\.05\);/,
    '--card-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.15);'
);
// Dark mode card shadow
style = style.replace(
    /--card-shadow:\s*0 4px 12px rgba\(0, 0, 0, 0\.4\);/,
    '--card-shadow: 0 4px 15px rgba(255, 255, 255, 0.08);'
);

// Fix Table Compaction (remove nowrap and strict widths, reduce padding)
style = style.replace(
    /\.table \{\s*width: max-content !important;[\s\S]*?white-space: nowrap; \/\* Prevent unnecessary wrapping \*\/\s*\}/,
    `.table {
    width: 100% !important;
}
.table th, .table td {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    white-space: normal; /* Allow wrapping */
}`
);

// Remove the padding left/right we added earlier to table-responsive so it fits snugly
style = style.replace(
    /\.table-responsive \{\s*padding-left: 1\.5rem !important;\s*padding-right: 1\.5rem !important;\s*\}/,
    `.table-responsive {
    padding-left: 0 !important;
    padding-right: 0 !important;
}`
);

fs.writeFileSync('public/css/style.css', style, 'utf8');

console.log('UI Fixes 5 applied.');

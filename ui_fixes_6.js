const fs = require('fs');
const path = require('path');

// 1. DASHBOARD EJS FIXES
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');

// Remove containers from dashboard top stats
dashboard = dashboard.replace(
    /class="d-flex align-items-center justify-content-center h-100 p-2 border rounded shadow-sm" style="background: var\(--bg-card\);"/g,
    'class="d-flex align-items-center justify-content-center h-100 p-2"'
);

// Arrange books horizontally (flex-nowrap overflow-auto)
dashboard = dashboard.replace(
    /<div class="row g-4 justify-content-center">/,
    '<div class="d-flex gap-4 overflow-auto pb-4 pt-2" style="scrollbar-width: thin;">'
);
dashboard = dashboard.replace(
    /<div class="col-6 col-sm-4 col-md-3 col-lg-2">/g,
    '<div style="flex: 0 0 auto; width: 170px;">'
);

fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');


// 2. STUDENT AND LIBRARIAN TABLE WIDTH FIXES
const reduceTableWidth = (filePath) => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Wrap table-responsive in a max-width container centered
        if (!content.includes('max-width: 900px')) {
            content = content.replace(
                /<div class="table-responsive">/,
                '<div class="mx-auto" style="max-width: 900px;">\n                <div class="table-responsive" style="overflow: visible;">'
            );
            // find the closing div of table-responsive... it's safer to just inject it at the end of the table
            content = content.replace(
                /<\/table>\s*<\/div>/,
                '</table>\n                </div>\n                </div>'
            );
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
};
reduceTableWidth('views_ejs/student_index.ejs');
reduceTableWidth('views_ejs/librarian_index.ejs');


// 3. ELEGANT TABLE STYLE in STYLE.CSS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Remove the old basic table style
style = style.replace(/\/\* Table Fonts & Padding Updates \*\/[\s\S]*?white-space: normal; \/\* Allow wrapping \*\/\s*\}/, '');
style = style.replace(/\.table-responsive \{\s*padding-left: 0 !important;\s*padding-right: 0 !important;\s*\}/, '');

const elegantTableCSS = `
/* Elegant Professional Table Pattern */
.table-responsive {
    overflow-x: auto;
    padding: 1rem 0;
}
.table {
    font-family: 'Montserrat', sans-serif !important;
    border-collapse: separate !important;
    border-spacing: 0 12px !important; /* Space between rows */
    width: 100% !important;
    margin-bottom: 0 !important;
}
.table thead th {
    border: none !important;
    text-transform: uppercase;
    font-size: 0.75rem !important;
    letter-spacing: 1.5px;
    font-weight: 700 !important;
    color: var(--text-muted) !important;
    padding: 0 1.5rem 0.5rem 1.5rem !important;
    background: transparent !important;
}
.table tbody tr {
    background: rgba(150, 150, 150, 0.05) !important; /* Subtle background for row */
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.table tbody tr:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.06);
    background: rgba(150, 150, 150, 0.1) !important;
}
.table tbody td {
    border: none !important;
    padding: 1.2rem 1.5rem !important;
    vertical-align: middle;
    font-weight: 500 !important;
    color: var(--text-primary) !important;
    white-space: normal;
}
/* Rounded corners for the row items */
.table tbody td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.table tbody td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

/* Fix Bootstrap background override */
.table > :not(caption) > * > * {
    background-color: transparent !important;
    box-shadow: none !important;
}
`;

if (!style.includes('/* Elegant Professional Table Pattern */')) {
    style += elegantTableCSS;
}

fs.writeFileSync('public/css/style.css', style, 'utf8');

console.log('UI Fixes 6 applied.');

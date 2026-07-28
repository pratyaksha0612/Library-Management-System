const fs = require('fs');
const path = require('path');

// 1. FIX DASHBOARD (Shadow color, no blocks, better fonts)
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');

// Update shadow behind name
dashboard = dashboard.replace(
    /text-shadow:\s*0\s*0\s*25px\s*var\(--btn-primary-bg\)[^"]*"/,
    'text-shadow: 0 2px 15px rgba(150, 150, 150, 0.4);"'
);
// Also let's change the name color from var(--btn-primary-bg) to something like text-primary or let it be neutral.
dashboard = dashboard.replace(
    /style="color:\s*var\(--btn-primary-bg\);/g,
    'style="color: var(--text-primary);'
);

// Remove custom-card and border-top from stats row, use minimal text and font-heading
dashboard = dashboard.replace(
    /<div class="custom-card p-4 text-center h-100"[^>]*>/g,
    '<div class="text-center h-100 px-3 py-2">'
);
dashboard = dashboard.replace(
    /<h3 class="fw-bold mb-1">/g,
    '<h3 class="fw-bold mb-1 font-heading" style="font-size: 2.5rem; letter-spacing: -1px; color: var(--text-primary);">'
);
dashboard = dashboard.replace(
    /<p class="text-secondary small mb-0">/g,
    '<p class="text-muted text-uppercase fw-semibold" style="font-size: 0.75rem; letter-spacing: 1px;">'
);
fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');

// 2. FIX BOOKS MODULE (Remove ISBN empty code block, remove description/gap, remove border-top)
let books = fs.readFileSync('views_ejs/books_index.ejs', 'utf8');

// Remove the description paragraph to save space
books = books.replace(
    /<!-- Little bit of context -->\s*<p class="text-secondary small mb-3 text-truncate-2"[\s\S]*?<\/p>/,
    ''
);

// Remove the border-top and pt-2 from the price/isbn row
books = books.replace(
    /<div class="d-flex align-items-center justify-content-between pt-2 border-top">/g,
    '<div class="d-flex align-items-center justify-content-between">'
);

// Fix ISBN code block (purple block issue) by wrapping it in a condition or just rendering standard text instead of <code>
books = books.replace(
    /<code class="text-muted" style="font-size: 0\.75rem;"><%= book\.isbn %><\/code>/g,
    '<% if(book.isbn) { %><span class="text-muted" style="font-size: 0.75rem;">ISBN: <%= book.isbn %></span><% } else { %><span></span><% } %>'
);

fs.writeFileSync('views_ejs/books_index.ejs', books, 'utf8');

// 3. FIX TABLES in Newspaper, Magazine, Student, Librarian
const tableFiles = ['views_ejs/newspaper_index.ejs', 'views_ejs/magazine_index.ejs', 'views_ejs/student_index.ejs', 'views_ejs/librarian_index.ejs'];
tableFiles.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add table-transparent and fix bootstrap background interference
        // The table itself should just be table, and we handle colors in CSS or inline
        content = content.replace(
            /<table class="table table-hover align-middle border-0"/g,
            '<table class="table align-middle border-0" style="background: transparent !important; --bs-table-bg: transparent; --bs-table-color: var(--text-primary);"'
        );
        
        // Ensure thead is transparent
        content = content.replace(
            /<thead style="background: var\(--table-header-bg\); border-bottom: 2px solid var\(--border-color\);">/g,
            '<thead style="background: transparent; border-bottom: 1px solid var(--border-color);">'
        );
        
        fs.writeFileSync(file, content, 'utf8');
    }
});

// 4. FIX STYLE.CSS table backgrounds
let style = fs.readFileSync('public/css/style.css', 'utf8');
if (!style.includes('/* Table Transparency Fix */')) {
    style += `\n/* Table Transparency Fix */
.table, .table > :not(caption) > * > * {
    background-color: transparent !important;
    color: var(--text-primary) !important;
    border-bottom-color: var(--border-color) !important;
}
.table tbody tr:hover td {
    background-color: rgba(124, 124, 124, 0.05) !important;
}
`;
    fs.writeFileSync('public/css/style.css', style, 'utf8');
}

console.log('UI Fixes applied successfully!');

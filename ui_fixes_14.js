const fs = require('fs');

// 1. UPDATE EJS TO REMOVE CARD PADDING (allows table to fill edges)
function removeCardPadding(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            /class="custom-card p-0 px-3 pb-3 overflow-hidden mx-auto"/g,
            'class="custom-card p-0 overflow-hidden mx-auto"'
        );
        fs.writeFileSync(filePath, content, 'utf8');
    }
}
removeCardPadding('views_ejs/student_index.ejs');
removeCardPadding('views_ejs/librarian_index.ejs');
removeCardPadding('views_ejs/newspaper_index.ejs');
removeCardPadding('views_ejs/magazine_index.ejs');
removeCardPadding('views_ejs/books_index.ejs');

// 2. UPDATE STYLE.CSS FOR TABLE PADDING AND LIGHT MODE ROWS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Ensure border-collapse is collapse so there are no invisible gaps
style = style.replace(
    /border-collapse: separate !important;/g,
    'border-collapse: collapse !important;'
);
style = style.replace(
    /border-spacing: 0 4px !important;/g,
    'border-spacing: 0 !important;'
);

// Add inner padding to first and last columns so text doesn't hit the screen edge
const paddingFixes = `
/* Ensure text doesn't touch the absolute edge of the container */
.table th:first-child, .table td:first-child {
    padding-left: 2rem !important;
}
.table th:last-child, .table td:last-child {
    padding-right: 2rem !important;
}

/* Light mode table rows */
[data-theme="light"] .table tbody tr {
    background: #e2e8f0 !important; /* Lighter blue for content rows */
    border-bottom: 1px solid #cbd5e1 !important; /* Subtle separator */
}
[data-theme="light"] .table tbody tr:hover {
    background: #cbd5e1 !important;
}
`;

if (!style.includes('.table th:first-child, .table td:first-child')) {
    style += '\n' + paddingFixes;
}

fs.writeFileSync('public/css/style.css', style, 'utf8');
console.log('UI Fixes 14 applied.');

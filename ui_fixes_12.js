const fs = require('fs');

// 1. UPDATE STYLE.CSS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Update light mode shadow
style = style.replace(
    /--card-shadow: 0 4px 20px -5px rgba\(0, 0, 0, 0\.15\);/,
    '--card-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);'
);

// Update dark mode shadow
style = style.replace(
    /--card-shadow: 0 4px 15px rgba\(255, 255, 255, 0\.08\);/,
    '--card-shadow: 0 8px 30px rgba(255, 255, 255, 0.2);'
);

// Decrease size of action buttons
style = style.replace(
    /padding: 0\.45rem 0\.95rem;\s*font-size: 0\.82rem;/g,
    'padding: 0.35rem 0.65rem;\n    font-size: 0.75rem;'
);

// Add light mode header specific styling
if (!style.includes('[data-theme="light"] .table thead th')) {
    style += '\n\n/* Light mode table header */\n';
    style += '[data-theme="light"] .table thead th {\n';
    style += '    background-color: #94a3b8 !important;\n';
    style += '    color: #0b3d5c !important;\n';
    style += '}\n';
}

fs.writeFileSync('public/css/style.css', style, 'utf8');


// 2. ADD HORIZONTAL PADDING TO TABLE CARD WRAPPERS
function addCardPadding(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace p-0 with p-0 px-3 (horizontal padding)
        content = content.replace(
            /class="custom-card p-0 overflow-hidden mx-auto"/g,
            'class="custom-card p-0 px-3 pb-3 overflow-hidden mx-auto"'
        );
        fs.writeFileSync(filePath, content, 'utf8');
    }
}
addCardPadding('views_ejs/student_index.ejs');
addCardPadding('views_ejs/librarian_index.ejs');
addCardPadding('views_ejs/newspaper_index.ejs');
addCardPadding('views_ejs/magazine_index.ejs');
addCardPadding('views_ejs/books_index.ejs'); // Might not use max-content but good to be safe

console.log('UI Fixes 12 applied.');

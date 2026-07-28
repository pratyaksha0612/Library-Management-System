const fs = require('fs');

// 1. UPDATE STYLE.CSS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Table compactness and centering
style = style.replace(
    /width: 100% !important;/g,
    'width: auto !important; margin: 0 auto !important; white-space: nowrap;'
);

// Table header styling (larger text, center oriented)
style = style.replace(
    /font-size: 0\.75rem !important;/g,
    'font-size: 1rem !important; text-align: center !important;'
);

// Add center text alignment to all td
if (!style.includes('text-align: center !important;') && style.includes('.table tbody td {')) {
    style = style.replace(
        /\.table tbody td \{[\s\S]*?white-space: normal;\s*\}/,
        match => match.replace('white-space: normal;', 'white-space: normal; text-align: center !important;')
    );
} else {
    // If we missed the exact regex, let's just append it to td
    style = style.replace(
        /\.table tbody td \{/,
        '.table tbody td {\n    text-align: center !important;'
    );
}


// Darker blue background for Edit button in light mode
if (!style.includes('[data-theme="light"] .btn-blue-edit')) {
    style = style.replace(
        /\.btn-blue-edit \{.*?\}/,
        '$&\n[data-theme="light"] .btn-blue-edit { background-color: #0b3d5c !important; color: #ffffff !important; }'
    );
}

fs.writeFileSync('public/css/style.css', style, 'utf8');


// 2. UPDATE NEWSPAPER AND MAGAZINE BADGES
function fixBadges(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
        /bg-secondary bg-opacity-20 text-secondary border border-secondary border-opacity-20/g,
        'bg-info text-dark shadow-sm border border-info border-opacity-50'
    );
    fs.writeFileSync(filePath, content, 'utf8');
}
fixBadges('views_ejs/newspaper_index.ejs');
fixBadges('views_ejs/magazine_index.ejs');


// 3. UPDATE CONTACT.EJS CLOSED HOURS COLOR
let contact = fs.readFileSync('views_ejs/contact.ejs', 'utf8');
contact = contact.replace(
    /text-warning/g,
    'text-danger' // Danger (red) is visible on light and dark
);
fs.writeFileSync('views_ejs/contact.ejs', contact, 'utf8');

console.log('UI Fixes 9 applied.');

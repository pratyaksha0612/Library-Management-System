const fs = require('fs');

// 1. UPDATE SERVER.JS to remove pagination (set pageSize to 1000)
let serverJs = fs.readFileSync('server.js', 'utf8');
serverJs = serverJs.replace(/const pageSize = 5;/g, 'const pageSize = 1000;');
fs.writeFileSync('server.js', serverJs, 'utf8');

// 2. UPDATE STYLE.CSS to left-align table rows, keep headers centered
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Remove text-align: center !important; from .table tbody td
style = style.replace(
    /\.table tbody td \{[\s\S]*?\}/,
    match => match.replace('text-align: center !important;', '')
);

fs.writeFileSync('public/css/style.css', style, 'utf8');

// 3. UPDATE EJS FILES to prevent horizontal body overflow (max-width: 100%)
function fixCardMaxWidth(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            /width: max-content;/g,
            'width: max-content; max-width: 100%;'
        );
        fs.writeFileSync(filePath, content, 'utf8');
    }
}
fixCardMaxWidth('views_ejs/student_index.ejs');
fixCardMaxWidth('views_ejs/librarian_index.ejs');
fixCardMaxWidth('views_ejs/newspaper_index.ejs');
fixCardMaxWidth('views_ejs/magazine_index.ejs');

console.log('UI Fixes 13 applied.');

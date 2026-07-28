const fs = require('fs');

// 1. STYLE.CSS FIX
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Ensure Dark Mode Name Color is pretty and applied
if (!style.includes('--welcome-name-color: #E0F7FA;')) {
    style = style.replace(
        /(\[data-theme="dark"\] \{\s*\/\* Dark Theme - Dark Blue and Forest Greens \*\/)/,
        '$1\n    --welcome-name-color: #E0F7FA; /* Glowing white/cyan */\n    --welcome-name-shadow: 0 2px 15px #00E5FF; /* Cyan glow */'
    );
}
fs.writeFileSync('public/css/style.css', style, 'utf8');

// 2. BOOKS_INDEX.EJS FIX
let booksIndex = fs.readFileSync('views_ejs/books_index.ejs', 'utf8');

// Remove the badge from next to the title
booksIndex = booksIndex.replace(
    /<% if \(book\.isAvailable\) \{ %>\s*<span class="badge-custom badge-available px-2 py-0\.5" style="font-size: 0\.7rem;">\s*<i class="bi bi-check-circle-fill"><\/i> Available\s*<\/span>\s*<% \} else \{ %>\s*<span class="badge-custom badge-borrowed px-2 py-0\.5" style="font-size: 0\.7rem;">\s*<i class="bi bi-bookmark-fill"><\/i> Borrowed\s*<\/span>\s*<% \} %>/g,
    ''
);

// Add the badge inside the cover art div (top right)
const badgeHTML = `
                        <!-- Absolute positioned status badge -->
                        <div style="position: absolute; top: 10px; right: 10px; z-index: 2;">
                            <% if (book.isAvailable) { %>
                                <span class="badge bg-success shadow-sm px-2 py-1" style="border-radius: 6px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px;">
                                    <i class="bi bi-check-circle-fill me-1"></i> AVAILABLE
                                </span>
                            <% } else { %>
                                <span class="badge bg-danger shadow-sm px-2 py-1" style="border-radius: 6px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px;">
                                    <i class="bi bi-x-circle-fill me-1"></i> OUT OF STOCK
                                </span>
                            <% } %>
                        </div>
`;

// Insert it right after the massive OUT OF STOCK stamp logic
booksIndex = booksIndex.replace(
    /(<% if \(!book\.isAvailable\) \{ %>\s*<div style="position: absolute; top: 50%; left: 50%;.*?>OUT OF STOCK<\/div>\s*<% \} %>)/g,
    '$1' + badgeHTML
);

fs.writeFileSync('views_ejs/books_index.ejs', booksIndex, 'utf8');


// 3. SERVER.JS FIX
let serverJs = fs.readFileSync('server.js', 'utf8');
serverJs = serverJs.replace(
    /const topBooks = books\.slice\(0, 4\);/,
    'const topBooks = books.slice(0, 6);'
);
fs.writeFileSync('server.js', serverJs, 'utf8');

console.log('UI Fixes 7 applied.');

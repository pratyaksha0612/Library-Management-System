const fs = require('fs');

// 1. UPDATE SERVER.JS TO ADD MORE ENTRIES
let serverJs = fs.readFileSync('server.js', 'utf8');

// Add 6 more newspapers
const newNewspapers = `
    { newspaperId: 10, title: 'The Hindu Business Line', publisher: 'Kasturi & Sons', language: 'English', category: 'Business', dailyPrice: 8, subscriptionType: 'Weekly', publishDate: '2026-07-28' },
    { newspaperId: 11, title: 'Mint', publisher: 'HT Media', language: 'English', category: 'Business', dailyPrice: 9, subscriptionType: 'Daily', publishDate: '2026-07-28' },
    { newspaperId: 12, title: 'Deccan Chronicle', publisher: 'Deccan Chronicle Holdings', language: 'English', category: 'National Daily', dailyPrice: 5, subscriptionType: 'Monthly', publishDate: '2026-07-28' },
    { newspaperId: 13, title: 'The Statesman', publisher: 'The Statesman Ltd', language: 'English', category: 'National Daily', dailyPrice: 6, subscriptionType: 'Daily', publishDate: '2026-07-28' },
    { newspaperId: 14, title: 'Dainik Bhaskar', publisher: 'Dainik Bhaskar Group', language: 'Hindi', category: 'National Daily', dailyPrice: 4, subscriptionType: 'Monthly', publishDate: '2026-07-28' },
    { newspaperId: 15, title: 'Amar Ujala', publisher: 'Amar Ujala Ltd', language: 'Hindi', category: 'National Daily', dailyPrice: 4, subscriptionType: 'Daily', publishDate: '2026-07-28' },
`;
serverJs = serverJs.replace(
    /(let newspapers = \[[\s\S]*?)(];)/,
    `$1${newNewspapers}$2`
);

// Add 8 more magazines
const newMagazines = `
    { magazineId: 8, title: 'Forbes India', publisher: 'Network18', language: 'English', category: 'Business', monthlyPrice: 200, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 9, title: 'Vogue India', publisher: 'Condé Nast', language: 'English', category: 'Fashion', monthlyPrice: 150, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 10, title: 'Digit', publisher: '9.9 Group', language: 'English', category: 'Technology', monthlyPrice: 125, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 11, title: 'Filmfare', publisher: 'Worldwide Media', language: 'English', category: 'Entertainment', monthlyPrice: 100, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 12, title: 'Outlook', publisher: 'Rajan Raheja Group', language: 'English', category: 'News', monthlyPrice: 90, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 13, title: 'Frontline', publisher: 'The Hindu Group', language: 'English', category: 'Current Affairs', monthlyPrice: 85, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 14, title: 'Competition Success Review', publisher: 'CSR', language: 'English', category: 'Education', monthlyPrice: 75, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 15, title: 'Sportstar', publisher: 'The Hindu Group', language: 'English', category: 'Sports', monthlyPrice: 80, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
`;
serverJs = serverJs.replace(
    /(let magazines = \[[\s\S]*?)(];)/,
    `$1${newMagazines}$2`
);
fs.writeFileSync('server.js', serverJs, 'utf8');


// 2. UPDATE STYLE.CSS
let style = fs.readFileSync('public/css/style.css', 'utf8');

// Fix Table Header Padding (add space at top)
style = style.replace(
    /padding: 0 1\.5rem 0\.5rem 1\.5rem !important;/g,
    'padding: 1.25rem 1.5rem 0.75rem 1.5rem !important;'
);
// In case it was already changed by a previous script to something else, try generic:
style = style.replace(
    /padding:.*?1\.5rem.*?!important;/g,
    'padding: 1.25rem 1.5rem 0.75rem 1.5rem !important;'
);
fs.writeFileSync('public/css/style.css', style, 'utf8');


// 3. FIX CONTAINER WIDTHS IN EJS
function fixContainer(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            /<div class="custom-card p-0 overflow-hidden" style="border-radius: 12px;">/g,
            '<div class="custom-card p-0 overflow-hidden mx-auto" style="border-radius: 12px; width: max-content;">'
        );
        fs.writeFileSync(filePath, content, 'utf8');
    }
}
fixContainer('views_ejs/student_index.ejs');
fixContainer('views_ejs/librarian_index.ejs');
fixContainer('views_ejs/newspaper_index.ejs');
fixContainer('views_ejs/magazine_index.ejs');

console.log('UI Fixes 10 applied.');

const fs = require('fs');
const path = require('path');

// ============================================
// 1 & 2 & 3 & 4: DASHBOARD FIXES
// ============================================
let dashboard = fs.readFileSync('views_ejs/dashboard.ejs', 'utf8');

// Dashboard Feature size reduction (Horizontal layout instead of large block)
dashboard = dashboard.replace(
    /<div class="text-center h-100 px-3 py-2">/g,
    '<div class="d-flex align-items-center justify-content-center h-100 p-2 border rounded shadow-sm" style="background: var(--bg-card);">'
);
dashboard = dashboard.replace(/<i class="bi bi-book-half display-6 text-secondary mb-2"><\/i>/g, '<i class="bi bi-book-half fs-4 text-primary me-3"></i>');
dashboard = dashboard.replace(/<i class="bi bi-arrow-left-right display-6 text-secondary mb-2"><\/i>/g, '<i class="bi bi-arrow-left-right fs-4 text-primary me-3"></i>');
dashboard = dashboard.replace(/<i class="bi bi-people-fill display-6 text-secondary mb-2"><\/i>/g, '<i class="bi bi-people-fill fs-4 text-primary me-3"></i>');
dashboard = dashboard.replace(/<i class="bi bi-journal-check display-6 text-secondary mb-2"><\/i>/g, '<i class="bi bi-journal-check fs-4 text-primary me-3"></i>');

// Adjust font sizes for stats
dashboard = dashboard.replace(
    /<h3 class="fw-bold mb-1 font-heading" style="font-size: 2\.5rem; letter-spacing: -1px; color: var\(--text-primary\);"><%= model\.(.*?) %><\/h3>/g,
    '<div class="text-start"><h3 class="fw-bold mb-0 font-heading" style="font-size: 1.5rem; letter-spacing: -0.5px; color: var(--text-primary);"><%= model.$1 %></h3>'
);

dashboard = dashboard.replace(
    /<p class="text-muted text-uppercase fw-semibold" style="font-size: 0\.75rem; letter-spacing: 1px;">(.*?)<\/p>\s*<\/div>/g,
    '<p class="text-muted text-uppercase fw-semibold mb-0" style="font-size: 0.7rem; letter-spacing: 0.5px;">$1</p></div></div>'
);

// Name Color & Shadow
dashboard = dashboard.replace(
    /style="color: var\(--text-primary\); text-shadow: 0 2px 15px rgba\(150, 150, 150, 0\.4\);"/,
    'style="color: var(--welcome-name-color); text-shadow: var(--welcome-name-shadow);"'
);

// Recent Activity Pointers
if (!dashboard.includes('Newspaper Added')) {
    const additionalActivities = `
                    <div class="d-flex gap-3 align-items-start">
                        <div class="p-2 rounded-circle" style="background: rgba(100, 149, 237, 0.15); color: #6495ED;">
                            <i class="bi bi-newspaper fs-5"></i>
                        </div>
                        <div>
                            <p class="mb-0 fw-semibold fs-6">Newspaper Added</p>
                            <span class="text-secondary small">The Times of India (Today's Ed.)</span>
                        </div>
                    </div>
                    <div class="d-flex gap-3 align-items-start">
                        <div class="p-2 rounded-circle" style="background: rgba(186, 85, 211, 0.15); color: #BA55D3;">
                            <i class="bi bi-journal-bookmark fs-5"></i>
                        </div>
                        <div>
                            <p class="mb-0 fw-semibold fs-6">Magazine Issued</p>
                            <span class="text-secondary small">Forbes India to Yash Verma</span>
                        </div>
                    </div>
`;
    dashboard = dashboard.replace(
        /<div class="d-flex gap-3 align-items-start">\s*<div class="p-2 rounded-circle" style="background: rgba\(46, 111, 87, 0\.15\); color: #2E6F57;">\s*<i class="bi bi-person-plus fs-5"><\/i>\s*<\/div>\s*<div>\s*<p class="mb-0 fw-semibold fs-6">New Member<\/p>\s*<span class="text-secondary small">Ananya Desai joined the library<\/span>\s*<\/div>\s*<\/div>/,
        match => match + additionalActivities
    );
}

// Overview Graph Colors for Pop
dashboard = dashboard.replace(/borderColor: '#2E6F57',/g, "borderColor: '#FF3366', // Neon Pink pop");
dashboard = dashboard.replace(/backgroundColor: 'rgba\(46, 111, 87, 0\.1\)',/g, "backgroundColor: 'rgba(255, 51, 102, 0.1)',");
dashboard = dashboard.replace(/pointBackgroundColor: '#2E6F57',/g, "pointBackgroundColor: '#FF3366',");
dashboard = dashboard.replace(/pointHoverBorderColor: '#2E6F57'/g, "pointHoverBorderColor: '#FF3366'");

dashboard = dashboard.replace(/borderColor: '#5BAF7A',/g, "borderColor: '#00E5FF', // Neon Cyan pop");
dashboard = dashboard.replace(/backgroundColor: 'rgba\(91, 175, 122, 0\.05\)',/g, "backgroundColor: 'rgba(0, 229, 255, 0.1)',");
dashboard = dashboard.replace(/pointBackgroundColor: '#5BAF7A',/g, "pointBackgroundColor: '#00E5FF',");
dashboard = dashboard.replace(/pointHoverBorderColor: '#5BAF7A'/g, "pointHoverBorderColor: '#00E5FF'");

fs.writeFileSync('views_ejs/dashboard.ejs', dashboard, 'utf8');


// ============================================
// 5 & 6: HEADING STYLES (Cinzel) & TABLE FONTS
// ============================================
let style = fs.readFileSync('public/css/style.css', 'utf8');

if (!style.includes('Montserrat')) {
    style = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');\n` + style;
}

// Add CSS vars for welcome name
if (!style.includes('--welcome-name-color')) {
    style = style.replace(
        /:root \{/,
        `:root {\n    --welcome-name-color: #000080;\n    --welcome-name-shadow: 0 2px 15px rgba(0, 255, 0, 0.4);`
    );
    style = style.replace(
        /\[data-theme='dark'\] \{/,
        `[data-theme='dark'] {\n    --welcome-name-color: #A7C7E7;\n    --welcome-name-shadow: 0 2px 15px rgba(0, 255, 0, 0.4);`
    );
}

// Update font-heading to use Cinzel
style = style.replace(
    /\.font-heading \{[\s\S]*?\}/,
    `.font-heading { font-family: 'Cinzel', serif !important; font-weight: 700; }`
);

// Update table fonts
if (!style.includes('font-family: \'Montserrat\'')) {
    style += `\n/* Table Fonts & Padding Updates */
.table {
    font-family: 'Montserrat', sans-serif !important;
}
.table thead th {
    font-weight: 700 !important;
    font-size: 0.95rem;
}
.table tbody td {
    font-weight: 400 !important;
}
.table-responsive {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
}
`;
}
fs.writeFileSync('public/css/style.css', style, 'utf8');


// ============================================
// 7: MOCK DATA EXPANSION & REGISTRATION PUSH
// ============================================
let serverFile = fs.readFileSync('server.js', 'utf8');

// Hook into register to push student
if (!serverFile.includes('students.push({')) {
    serverFile = serverFile.replace(
        /logintab\.push\(newUser\);/,
        `logintab.push(newUser);\n\n    const newStudentId = students.length > 0 ? Math.max(...students.map(s => s.studentId)) + 1 : 1;\n    students.push({ studentId: newStudentId, studentName: fullName, email: email, phone: 'N/A' });`
    );
}

// Expand mock data
const additionalNewspapers = `
    { id: 4, title: 'The Hindu', publisher: 'Kasturi & Sons', language: 'English', category: 'National Daily', dailyPrice: 8, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 5, title: 'The Indian Express', publisher: 'Indian Express Group', language: 'English', category: 'National Daily', dailyPrice: 7, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 6, title: 'The Times of India', publisher: 'Bennett, Coleman & Co.', language: 'English', category: 'National Daily', dailyPrice: 6, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 7, title: 'Hindustan Times', publisher: 'HT Media', language: 'English', category: 'National Daily', dailyPrice: 7, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 8, title: 'Business Standard', publisher: 'Business Standard Private Limited', language: 'English', category: 'Business', dailyPrice: 10, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 9, title: 'The Economic Times', publisher: 'Bennett, Coleman & Co.', language: 'English', category: 'Business', dailyPrice: 9, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 10, title: 'Mint', publisher: 'HT Media', language: 'English', category: 'Business', dailyPrice: 8, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 11, title: 'Deccan Chronicle', publisher: 'Deccan Chronicle Holdings Limited', language: 'English', category: 'Regional Daily', dailyPrice: 5, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 12, title: 'The Telegraph', publisher: 'ABP Group', language: 'English', category: 'Regional Daily', dailyPrice: 6, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 13, title: 'Dainik Jagran', publisher: 'Jagran Prakashan', language: 'Hindi', category: 'National Daily', dailyPrice: 5, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 14, title: 'Dainik Bhaskar', publisher: 'DB Corp', language: 'Hindi', category: 'National Daily', dailyPrice: 5, subscription: 'Daily', publishDate: '2026-07-28' },
    { id: 15, title: 'Amar Ujala', publisher: 'Amar Ujala Publications', language: 'Hindi', category: 'National Daily', dailyPrice: 4, subscription: 'Daily', publishDate: '2026-07-28' },
`;

const additionalMagazines = `
    { id: 4, title: 'Forbes India', publisher: 'Network18', category: 'Business', language: 'English', price: 150, frequency: 'Fortnightly', issueDate: '2026-07-15' },
    { id: 5, title: 'Time', publisher: 'Time USA', category: 'News', language: 'English', price: 200, frequency: 'Weekly', issueDate: '2026-07-21' },
    { id: 6, title: 'National Geographic', publisher: 'NatGeo Partners', category: 'Science & Nature', language: 'English', price: 250, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 7, title: 'Vogue India', publisher: 'Condé Nast', category: 'Fashion', language: 'English', price: 150, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 8, title: 'GQ India', publisher: 'Condé Nast', category: 'Men\\'s Fashion', language: 'English', price: 150, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 9, title: 'Digit', publisher: '9.9 Group', category: 'Technology', language: 'English', price: 100, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 10, title: 'PCQuest', publisher: 'CyberMedia', category: 'Technology', language: 'English', price: 120, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 11, title: 'Autocar India', publisher: 'Haymarket', category: 'Automotive', language: 'English', price: 150, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 12, title: 'Overdrive', publisher: 'Network18', category: 'Automotive', language: 'English', price: 130, frequency: 'Monthly', issueDate: '2026-07-01' },
    { id: 13, title: 'Femina', publisher: 'Worldwide Media', category: 'Women\\'s Interest', language: 'English', price: 80, frequency: 'Fortnightly', issueDate: '2026-07-15' },
    { id: 14, title: 'Filmfare', publisher: 'Worldwide Media', category: 'Entertainment', language: 'English', price: 100, frequency: 'Fortnightly', issueDate: '2026-07-15' },
    { id: 15, title: 'India Today', publisher: 'Living Media', category: 'News', language: 'English', price: 100, frequency: 'Weekly', issueDate: '2026-07-25' },
`;

const additionalStudents = `
    { studentId: 104, studentName: 'Amar Singh', email: 'amar@example.com', phone: '9876543214' },
    { studentId: 105, studentName: 'Kiran', email: 'kiran@example.com', phone: '9876543215' },
    { studentId: 106, studentName: 'Shriya', email: 'shriya@example.com', phone: '9876543216' },
    { studentId: 107, studentName: 'Anu', email: 'anu@example.com', phone: '9876543217' },
    { studentId: 108, studentName: 'Aashi Singh', email: 'aashi@example.com', phone: '9876543218' },
    { studentId: 109, studentName: 'Sunny', email: 'sunny@example.com', phone: '9876543219' },
    { studentId: 110, studentName: 'Medha', email: 'medha@example.com', phone: '9876543220' },
    { studentId: 111, studentName: 'Vijay', email: 'vijay@example.com', phone: '9876543221' },
    { studentId: 112, studentName: 'Vibha', email: 'vibha@example.com', phone: '9876543222' },
    { studentId: 113, studentName: 'Jay', email: 'jay@example.com', phone: '9876543223' },
    { studentId: 114, studentName: 'Rishi', email: 'rishi@example.com', phone: '9876543224' },
    { studentId: 115, studentName: 'Neha Sharma', email: 'neha.s@example.com', phone: '9876543225' },
`;

// It's possible we already seeded, so we'll check first
if (!serverFile.includes('Amar Singh')) {
    serverFile = serverFile.replace(
        /let newspapers = \[\s*\{[\s\S]*?\}\s*\];/,
        match => match.replace(/\];$/, `,${additionalNewspapers}];`)
    );
    serverFile = serverFile.replace(
        /let magazines = \[\s*\{[\s\S]*?\}\s*\];/,
        match => match.replace(/\];$/, `,${additionalMagazines}];`)
    );
    serverFile = serverFile.replace(
        /let students = \[\s*\{[\s\S]*?\}\s*\];/,
        match => match.replace(/\];$/, `,${additionalStudents}];`)
    );
}

fs.writeFileSync('server.js', serverFile, 'utf8');
console.log('Done fixing everything.');

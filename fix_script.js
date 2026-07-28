const fs = require('fs');
const path = require('path');

// 1. Fix server.js: Keep only 2 books out of stock, and put them at the end.
let server = fs.readFileSync('server.js', 'utf8');

// The books array is hardcoded. We will modify the array items so that only the last two are false.
// Wait, an easier way is to just inject a sorting and filtering step right after the books array definition.
// Or we can just find the books array and modify the "isAvailable" lines.
// Let's just modify the '/Books' route to sort by availability!
server = server.replace(
    /let filteredBooks = books\.map\(b => \{/g,
    `// Sort books: available first
    books.sort((a, b) => {
        if (a.isAvailable === b.isAvailable) return 0;
        return a.isAvailable ? -1 : 1;
    });

    let filteredBooks = books.map(b => {`
);

// We also need to make exactly 2 books out of stock. Let's make sure the array in memory is modified.
// Since it's a seed array, we can just run a quick logic loop. Let's add a small script after the books array declaration.
// Find the end of the books array:
server = server.replace(
    /];\s*\/\/\s*Seed Data - Students/g,
    `];\n\n// Make exactly 2 books out of stock\nbooks.forEach(b => b.isAvailable = true);\nbooks[books.length - 1].isAvailable = false;\nbooks[books.length - 2].isAvailable = false;\n\n// Seed Data - Students`
);

fs.writeFileSync('server.js', server, 'utf8');


// 2. Remove Pagination HTML from all EJS files & update Table classes & headings
const ejsFiles = ['views_ejs/newspaper_index.ejs', 'views_ejs/magazine_index.ejs', 'views_ejs/student_index.ejs', 'views_ejs/librarian_index.ejs'];

ejsFiles.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove pagination chunk (from <!-- Pagination Controls --> up to </nav> or the script tag)
        content = content.replace(/<!-- Pagination Controls -->[\s\S]*?(<script>|<%- include)/i, '$1');
        
        // Update table to be elegant
        content = content.replace(/<table class="custom-table"/g, '<table class="table table-hover align-middle border-0"');
        content = content.replace(/<div class="custom-table-container">/g, '<div class="custom-card p-0 overflow-hidden" style="border-radius: 12px;">');
        
        // Update header row to have nice padding
        content = content.replace(/<thead>\s*<tr>/g, '<thead style="background: var(--table-header-bg); border-bottom: 2px solid var(--border-color);"><tr>');
        content = content.replace(/<th>/g, '<th class="py-3 px-4 border-0 text-muted small fw-bold tracking-wide">');
        content = content.replace(/<th class="text-end">/g, '<th class="py-3 px-4 border-0 text-muted small fw-bold tracking-wide text-end">');
        
        // Update cell padding
        content = content.replace(/<td>/g, '<td class="py-3 px-4 border-bottom border-light">');
        content = content.replace(/<td class="text-end">/g, '<td class="py-3 px-4 border-bottom border-light text-end">');
        
        // Make sure heading uses font-heading
        content = content.replace(/<h2 class="fw-bold mb-1/g, '<h2 class="fw-bold mb-1 font-heading');
        
        fs.writeFileSync(file, content, 'utf8');
    }
});


// 3. Fix Profile Picture Upload HTML
let profile = fs.readFileSync('views_ejs/profile.ejs', 'utf8');
profile = profile.replace(
    /<button class="btn btn-sm btn-light rounded-circle position-absolute bottom-0 end-0 shadow-sm"[\s\S]*?<\/button>/,
    `<label for="profilePicInput" class="btn btn-sm btn-light rounded-circle position-absolute bottom-0 end-0 shadow-sm" style="width: 32px; height: 32px; padding: 0; cursor: pointer; display: flex; align-items: center; justify-content: center;">
        <i class="bi bi-camera-fill text-secondary"></i>
    </label>
    <input type="file" id="profilePicInput" class="d-none" accept="image/*" onchange="document.getElementById('profileAvatar').src = window.URL.createObjectURL(this.files[0])">`
);
profile = profile.replace(/alt="Profile Avatar"/, 'alt="Profile Avatar" id="profileAvatar"');
fs.writeFileSync('views_ejs/profile.ejs', profile, 'utf8');

console.log('Script ran successfully!');

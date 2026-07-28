const fs = require('fs');
let serverJs = fs.readFileSync('server.js', 'utf8');

// Fix missing commas
serverJs = serverJs.replace(
    /isAvailable: true \}\s*\{ newspaperId: 10/g,
    'isAvailable: true },\n    { newspaperId: 10'
);
serverJs = serverJs.replace(
    /isAvailable: true \}\s*\{ magazineId: 8/g,
    'isAvailable: true },\n    { magazineId: 8'
);

fs.writeFileSync('server.js', serverJs, 'utf8');
console.log('Fixed commas.');

const fs = require('fs');
let serverJs = fs.readFileSync('server.js', 'utf8');

// Fix magazines (ID 8 to 15) properties
serverJs = serverJs.replace(
    /language: 'English', category: 'Business', monthlyPrice: 200, subscriptionType: 'Yearly'/g,
    "issueNumber: 'August 2026', genre: 'Business', price: 200, frequency: 'Yearly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Fashion', monthlyPrice: 150, subscriptionType: 'Monthly'/g,
    "issueNumber: 'August 2026', genre: 'Fashion', price: 150, frequency: 'Monthly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Technology', monthlyPrice: 125, subscriptionType: 'Yearly'/g,
    "issueNumber: 'August 2026', genre: 'Technology', price: 125, frequency: 'Yearly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Entertainment', monthlyPrice: 100, subscriptionType: 'Monthly'/g,
    "issueNumber: 'August 2026', genre: 'Entertainment', price: 100, frequency: 'Monthly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'News', monthlyPrice: 90, subscriptionType: 'Yearly'/g,
    "issueNumber: 'August 2026', genre: 'News', price: 90, frequency: 'Yearly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Current Affairs', monthlyPrice: 85, subscriptionType: 'Monthly'/g,
    "issueNumber: 'August 2026', genre: 'Current Affairs', price: 85, frequency: 'Monthly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Education', monthlyPrice: 75, subscriptionType: 'Yearly'/g,
    "issueNumber: 'August 2026', genre: 'Education', price: 75, frequency: 'Yearly', isAvailable: true"
);
serverJs = serverJs.replace(
    /language: 'English', category: 'Sports', monthlyPrice: 80, subscriptionType: 'Monthly'/g,
    "issueNumber: 'August 2026', genre: 'Sports', price: 80, frequency: 'Monthly', isAvailable: true"
);

// Fix newspapers (add isAvailable: true to ID 10 to 15)
serverJs = serverJs.replace(
    /publishDate: '2026-07-28' \}/g,
    "publishDate: '2026-07-28', isAvailable: true }"
);

fs.writeFileSync('server.js', serverJs, 'utf8');
console.log('UI Fixes 15 applied.');

const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views_ejs'));

// Express Session Middleware
app.use(session({
    secret: 'ps_library_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Valid Accounts Database (Admin, Student User, Librarian User)
let logintab = [
    { id: 1, username: "admin", password: "12345", role: "System Administrator", name: "Pratyaksha Singh" },
    { id: 2, username: "mycodingproject", password: "myc546", role: "Student User", name: "Pratyaksha Member" },
    { id: 3, username: "my", password: "myc", role: "Librarian User", name: "Rajesh Kumar" },
    { id: 4, username: "student1", password: "student123", role: "Student User", name: "Aarav Sharma" },
    { id: 5, username: "librarian1", password: "lib123", role: "Librarian User", name: "Meenakshi Sundaram" }
];

// Seed Data - Books with Indian Literature & Global Classics in ₹ (INR)
let books = [
    { bookId: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", isbn: "978-0747532699", publishedDate: "1997-06-26", price: 499, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780747532699-M.jpg", description: "The first novel in the Harry Potter series." },
    { bookId: 2, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", genre: "Fantasy", isbn: "978-0747538493", publishedDate: "1998-07-02", price: 499, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780747538493-M.jpg", description: "The second novel in the Harry Potter series." },
    { bookId: 3, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "978-0261102217", publishedDate: "1937-09-21", price: 399, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780261102217-M.jpg", description: "A fantasy novel and children's book." },
    { bookId: 4, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", isbn: "978-0062315007", publishedDate: "1988-04-15", price: 299, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg", description: "A novel about a young Andalusian shepherd." },
    { bookId: 5, title: "1984", author: "George Orwell", genre: "Science Fiction", isbn: "978-0451524935", publishedDate: "1949-06-08", price: 350, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg", description: "A dystopian social science fiction novel." },
    { bookId: 6, title: "The Kite Runner", author: "Khaled Hosseini", genre: "Historical Fiction", isbn: "978-1594631931", publishedDate: "2003-05-29", price: 450, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9781594631931-M.jpg", description: "A novel about the unlikely friendship between a wealthy boy and the son of his father's servant." },
    { bookId: 7, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", genre: "Autobiography", isbn: "978-8173711466", publishedDate: "1999-01-01", price: 399, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9788173711466-M.jpg", description: "An autobiography of A.P.J. Abdul Kalam." },
    { bookId: 8, title: "Panchatantra", author: "Vishnu Sharma", genre: "Fable", isbn: "978-8171670642", publishedDate: "1990-01-01", price: 150, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9788171670642-M.jpg", description: "An ancient Indian collection of interrelated animal fables." },
    { bookId: 9, title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-fiction", isbn: "978-0062316097", publishedDate: "2011-01-01", price: 599, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg", description: "A brief history of humankind." },
    { bookId: 10, title: "Atomic Habits", author: "James Clear", genre: "Self-help", isbn: "978-0735211292", publishedDate: "2018-10-16", price: 499, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg", description: "An easy & proven way to build good habits & break bad ones." },
    { bookId: 11, title: "Ikigai", author: "Hector Garcia", genre: "Philosophy", isbn: "978-0143130727", publishedDate: "2017-08-29", price: 399, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780143130727-M.jpg", description: "The Japanese secret to a long and happy life." },
    { bookId: 12, title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", isbn: "978-0857197689", publishedDate: "2020-09-08", price: 399, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780857197689-M.jpg", description: "Timeless lessons on wealth, greed, and happiness." },
    { bookId: 13, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", genre: "Finance", isbn: "978-1612680194", publishedDate: "1997-04-01", price: 350, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9781612680194-M.jpg", description: "What the rich teach their kids about money." },
    { bookId: 14, title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", isbn: "978-0553380163", publishedDate: "1988-03-01", price: 450, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780553380163-M.jpg", description: "From the Big Bang to Black Holes." }
];

// Seed Data - Students (Indian Profiles & User Email)
let students = [
    { studentId: 1, studentName: "Arjun Reddy", email: "arjun.r@student.in", phone: "+91 98765 00001", membershipDate: "2023-08-15", borrowCount: 12 },
    { studentId: 2, studentName: "Priya Sharma", email: "priya.sharma@student.in", phone: "+91 98765 00002", membershipDate: "2024-01-10", borrowCount: 5 },
    { studentId: 3, studentName: "Rahul Verma", email: "rahul.v@student.in", phone: "+91 98765 00003", membershipDate: "2023-11-20", borrowCount: 8 },
    { studentId: 4, studentName: "Sneha Patel", email: "sneha.p@student.in", phone: "+91 98765 00004", membershipDate: "2024-03-05", borrowCount: 3 },
    { studentId: 5, studentName: "Vikram Singh", email: "vikram.s@student.in", phone: "+91 98765 00005", membershipDate: "2022-09-12", borrowCount: 25 },
    { studentId: 6, studentName: "Ananya Desai", email: "ananya.d@student.in", phone: "+91 98765 00006", membershipDate: "2024-05-18", borrowCount: 1 }
];

// Seed Data - Librarians (Indian Profiles)
let librarians = [
    { librarianId: 1, name: "Dr. Rajesh Kumar", age: 45, phone: "+91 99000 11111", employeeId: "LIB-001", department: "Head Librarian", experience: "15 Years", shift: "Morning" },
    { librarianId: 2, name: "Meenakshi Iyer", age: 38, phone: "+91 99000 22222", employeeId: "LIB-002", department: "Reference", experience: "10 Years", shift: "Morning" },
    { librarianId: 3, name: "Suresh Menon", age: 42, phone: "+91 99000 33333", employeeId: "LIB-003", department: "Digital Archives", experience: "8 Years", shift: "Evening" },
    { librarianId: 4, name: "Kavita Nair", age: 34, phone: "+91 99000 44444", employeeId: "LIB-004", department: "Circulation", experience: "5 Years", shift: "Evening" }
];

// Seed Data - Newspapers (Price in ₹ INR)
let newspapers = [
    { newspaperId: 1, title: "The Hindu", publisher: "Kasturi & Sons", language: "English", category: "National Daily", dailyPrice: 8, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 2, title: "The Indian Express", publisher: "Indian Express Group", language: "English", category: "National Daily", dailyPrice: 7, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 3, title: "The Times of India", publisher: "Bennett, Coleman & Co.", language: "English", category: "National Daily", dailyPrice: 6, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 4, title: "Hindustan Times", publisher: "HT Media", language: "English", category: "National Daily", dailyPrice: 7, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 5, title: "Business Standard", publisher: "Business Standard Private Limited", language: "English", category: "Business", dailyPrice: 10, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 6, title: "Mint", publisher: "HT Media", language: "English", category: "Business", dailyPrice: 10, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 7, title: "Dainik Jagran", publisher: "Jagran Prakashan", language: "Hindi", category: "National Daily", dailyPrice: 5, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 8, title: "Amar Ujala", publisher: "Amar Ujala Publications", language: "Hindi", category: "National Daily", dailyPrice: 5, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true }
];

// Seed Data - Magazines (Price in ₹ INR)
let magazines = [
    { magazineId: 1, title: "India Today", publisher: "Living Media", issueNumber: "August 2026", genre: "News", price: 100, frequency: "Weekly", publishDate: "2026-07-25", isAvailable: true },
    { magazineId: 2, title: "National Geographic", publisher: "National Geographic Partners", issueNumber: "August 2026", genre: "Science & Nature", price: 250, frequency: "Monthly", publishDate: "2026-07-15", isAvailable: true },
    { magazineId: 3, title: "Scientific American", publisher: "Springer Nature", issueNumber: "August 2026", genre: "Science", price: 300, frequency: "Monthly", publishDate: "2026-07-20", isAvailable: true },
    { magazineId: 4, title: "Forbes India", publisher: "Network18", issueNumber: "August 2026", genre: "Business", price: 200, frequency: "Fortnightly", publishDate: "2026-07-22", isAvailable: true },
    { magazineId: 5, title: "Frontline", publisher: "The Hindu Group", issueNumber: "August 2026", genre: "Current Affairs", price: 120, frequency: "Fortnightly", publishDate: "2026-07-24", isAvailable: true },
    { magazineId: 6, title: "Outlook", publisher: "Outlook Publishing", issueNumber: "August 2026", genre: "News", price: 90, frequency: "Weekly", publishDate: "2026-07-26", isAvailable: true }
];

let borrowRecords = [
    { borrowRecordId: 101, bookId: 1, borrowerName: "Pratyaksha Singh", borrowerEmail: "ipratyaksha.works@gmail.com", phone: "+91 98765 43210", borrowDate: "2026-07-15 10:30", returnDate: "2026-07-20 14:15" },
    { borrowRecordId: 102, bookId: 3, borrowerName: "Aarav Sharma", borrowerEmail: "aarav.sharma@email.in", phone: "+91 98123 45678", borrowDate: "2026-07-18 11:45", returnDate: null }
];
books[2].isAvailable = false;

let flashMessage = null;
let errorMessage = null;

// Global Middleware for Flash Messages & Auth Locals
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.isLoggedIn = !!req.session.isLoggedIn;
    res.locals.flashMessage = flashMessage;
    res.locals.errorMessage = errorMessage;
    flashMessage = null;
    errorMessage = null;
    next();
});

// AUTHENTICATION GUARD MIDDLEWARE
function requireAuth(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/Login');
}

// ROOT ROUTE -> REDIRECT TO LOGIN IF NOT LOGGED IN
app.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/Dashboard');
    } else {
        res.redirect('/Login');
    }
});

// LOGIN MODULE (UNPROTECTED)
app.get(['/Login', '/Login/Index'], (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/Dashboard');
    }
    res.render('login', { message: res.locals.errorMessage, successMessage: res.locals.flashMessage });
});

app.post('/Login/Verify', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const user = logintab.find(u => u.username === username && (u.password === password || u.password === hashedPassword));
    if (user) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        flashMessage = `Welcome back, ${user.name}! Authenticated to PS Library.`;
        res.redirect('/Dashboard');
    } else {
        res.render('login', { message: "Invalid username or password. Please try again." });
    }
});

// REGISTRATION MODULE (UNPROTECTED)
app.get(['/register', '/Register'], (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/Dashboard');
    }
    res.render('register', { message: res.locals.errorMessage });
});

app.post('/register', (req, res) => {
    const { fullName, email, username, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.render('register', { message: "Passwords do not match." });
    }
    
    const userExists = logintab.find(u => u.username === username || u.email === email);
    if (userExists) {
        return res.render('register', { message: "Username or email already in use." });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const newId = logintab.length > 0 ? Math.max(...logintab.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: newId,
        username,
        password: hashedPassword,
        role: "Student User", // Default role
        name: fullName,
        email
    };
    logintab.push(newUser);

    // Option 1: Redirect to Login with a success toast
    flashMessage = "Account created successfully. Please sign in.";
    res.redirect('/Login');
});

// LOGOUT ROUTE
app.get(['/Login/Logout', '/Logout'], (req, res) => {
    req.session.destroy(() => {
        res.redirect('/Login');
    });
});

// ALL PROTECTED ROUTES BELOW REQUIRE AUTHENTICATION
app.use(requireAuth);

// DASHBOARD MODULE WITH CHART METRICS
app.get(['/Dashboard', '/Dashboard/Index'], (req, res) => {
    const model = {
        totalStudents: students.length,
        totalBooks: books.length,
        totalLibrarians: librarians.length,
        totalBorrowings: borrowRecords.filter(b => !b.returnDate).length,
        totalNewspapers: newspapers.length,
        totalMagazines: magazines.length,
        totalPublications: newspapers.length + magazines.length,
        monthlyTrends: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            borrowed: [32, 45, 38, 52, 60, borrowRecords.length + 42],
            returned: [28, 40, 35, 48, 55, 39]
        },
        distribution: {
            labels: ['Books Catalog', 'Newspapers', 'Magazines', 'Active Borrowings'],
            data: [books.length, newspapers.length, magazines.length, borrowRecords.filter(b => !b.returnDate).length]
        }
    };
    res.render('dashboard', { model });
});

// BOOKS MODULE
app.get(['/Books', '/Books/Index'], (req, res) => {
    let searchQuery = req.query.searchQuery || '';
    let page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    // Map active borrow records first
    let filteredBooks = books.map(b => {
        const activeBorrow = borrowRecords.find(br => br.bookId === b.bookId && !br.returnDate);
        return { ...b, activeBorrowRecordId: activeBorrow ? activeBorrow.borrowRecordId : null };
    });

    // Apply search filter if searchQuery exists
    if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        filteredBooks = filteredBooks.filter(b => 
            (b.title && b.title.toLowerCase().includes(query)) ||
            (b.author && b.author.toLowerCase().includes(query)) ||
            (b.isbn && b.isbn.toLowerCase().includes(query))
        );
    }

    // Pagination calculations
    const totalItems = filteredBooks.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const offset = (page - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(offset, offset + pageSize);

    res.render('books_index', { 
        books: paginatedBooks, 
        searchQuery: searchQuery,
        currentPage: page,
        totalPages: totalPages
    });
});

app.get(['/Books/Details', '/Books/Details/:id'], (req, res) => {
    const id = parseInt(req.params.id || req.query.id);
    if (!id) return res.render('shared_notfound', { errorMessage: "Book ID was not provided." });
    const book = books.find(b => b.bookId === id);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${id}.` });
    res.render('books_details', { book });
});

app.get('/Books/Create', (req, res) => {
    res.render('books_create');
});

app.post('/Books/Create', (req, res) => {
    const { title, author, isbn, publishedDate, price } = req.body;
    const newId = books.length > 0 ? Math.max(...books.map(b => b.bookId)) + 1 : 1;
    books.push({
        bookId: newId,
        title,
        author,
        isbn,
        publishedDate,
        price: parseFloat(price) || 500,
        isAvailable: true,
        coverImage: "https://via.placeholder.com/300x400/7c3aed/ffffff?text=Book+Cover"
    });
    flashMessage = `Successfully registered book: ${title}.`;
    res.redirect('/Books/Index');
});

app.get(['/Books/Edit', '/Books/Edit/:id'], (req, res) => {
    const id = parseInt(req.params.id || req.query.id);
    if (!id) return res.render('shared_notfound', { errorMessage: "Book ID was not provided for editing." });
    const book = books.find(b => b.bookId === id);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${id} for editing.` });
    res.render('books_edit', { book });
});

app.post(['/Books/Edit', '/Books/Edit/:id'], (req, res) => {
    const id = parseInt(req.body.bookId || req.params.id);
    const book = books.find(b => b.bookId === id);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${id} for updating.` });
    book.title = req.body.title;
    book.author = req.body.author;
    book.isbn = req.body.isbn;
    book.publishedDate = req.body.publishedDate;
    book.price = parseFloat(req.body.price) || book.price;
    flashMessage = `Successfully updated book: ${book.title}.`;
    res.redirect('/Books/Index');
});

app.get(['/Books/Delete', '/Books/Delete/:id'], (req, res) => {
    const id = parseInt(req.params.id || req.query.id);
    if (!id) return res.render('shared_notfound', { errorMessage: "Book ID was not provided for deletion." });
    const book = books.find(b => b.bookId === id);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${id} for deletion.` });
    res.render('books_delete', { book });
});

app.post(['/Books/Delete', '/Books/Delete/:id'], (req, res) => {
    const id = parseInt(req.body.bookId || req.params.id);
    const index = books.findIndex(b => b.bookId === id);
    if (index === -1) return res.render('shared_notfound', { errorMessage: `No book found with ID ${id} for deletion.` });
    const deletedTitle = books[index].title;
    books.splice(index, 1);
    flashMessage = `Successfully deleted book: ${deletedTitle}.`;
    res.redirect('/Books/Index');
});

// NEWSPAPERS MODULE
app.get(['/Newspaper', '/Newspaper/Index'], (req, res) => {
    let searchQuery = req.query.searchQuery || '';
    let page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    let filteredNewspapers = [...newspapers];

    // Apply search filter if searchQuery exists
    if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        filteredNewspapers = filteredNewspapers.filter(n => 
            (n.title && n.title.toLowerCase().includes(query)) ||
            (n.publisher && n.publisher.toLowerCase().includes(query)) ||
            (n.language && n.language.toLowerCase().includes(query)) ||
            (n.category && n.category.toLowerCase().includes(query))
        );
    }

    // Pagination calculations
    const totalItems = filteredNewspapers.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const offset = (page - 1) * pageSize;
    const paginatedNewspapers = filteredNewspapers.slice(offset, offset + pageSize);

    res.render('newspaper_index', { 
        newspapers: paginatedNewspapers, 
        searchQuery: searchQuery,
        currentPage: page,
        totalPages: totalPages
    });
});

app.get('/Newspaper/Create', (req, res) => {
    res.render('newspaper_create');
});

app.post('/Newspaper/Create', (req, res) => {
    const { title, publisher, language, category, dailyPrice, subscriptionType, publishDate } = req.body;
    const newId = newspapers.length > 0 ? Math.max(...newspapers.map(n => n.newspaperId)) + 1 : 1;
    newspapers.push({
        newspaperId: newId,
        title,
        publisher,
        language: language || 'English',
        category: category || 'General',
        dailyPrice: parseFloat(dailyPrice) || 6,
        subscriptionType: subscriptionType || 'Daily Edition',
        publishDate: publishDate || new Date().toISOString().substring(0, 10),
        isAvailable: true
    });
    flashMessage = `Successfully registered newspaper: ${title}.`;
    res.redirect('/Newspaper/Index');
});

app.get('/Newspaper/Edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newspaper = newspapers.find(n => n.newspaperId === id);
    if (!newspaper) return res.render('shared_notfound', { errorMessage: `Newspaper #${id} not found.` });
    res.render('newspaper_edit', { newspaper });
});

app.post(['/Newspaper/Edit', '/Newspaper/Edit/:id'], (req, res) => {
    const id = parseInt(req.body.newspaperId || req.params.id);
    const newspaper = newspapers.find(n => n.newspaperId === id);
    if (newspaper) {
        newspaper.title = req.body.title;
        newspaper.publisher = req.body.publisher;
        newspaper.language = req.body.language;
        newspaper.category = req.body.category;
        newspaper.dailyPrice = parseFloat(req.body.dailyPrice) || newspaper.dailyPrice;
        newspaper.subscriptionType = req.body.subscriptionType;
        newspaper.publishDate = req.body.publishDate;
        flashMessage = `Updated newspaper: ${newspaper.title}.`;
    }
    res.redirect('/Newspaper/Index');
});

app.get('/Newspaper/Delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    newspapers = newspapers.filter(n => n.newspaperId !== id);
    flashMessage = `Deleted newspaper record #${id}.`;
    res.redirect('/Newspaper/Index');
});

// MAGAZINES MODULE
app.get(['/Magazine', '/Magazine/Index'], (req, res) => {
    let searchQuery = req.query.searchQuery || '';
    let page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    let filteredMagazines = [...magazines];

    // Apply search filter if searchQuery exists
    if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        filteredMagazines = filteredMagazines.filter(m => 
            (m.title && m.title.toLowerCase().includes(query)) ||
            (m.publisher && m.publisher.toLowerCase().includes(query)) ||
            (m.genre && m.genre.toLowerCase().includes(query))
        );
    }

    // Pagination calculations
    const totalItems = filteredMagazines.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const offset = (page - 1) * pageSize;
    const paginatedMagazines = filteredMagazines.slice(offset, offset + pageSize);

    res.render('magazine_index', { 
        magazines: paginatedMagazines, 
        searchQuery: searchQuery,
        currentPage: page,
        totalPages: totalPages
    });
});

app.get('/Magazine/Create', (req, res) => {
    res.render('magazine_create');
});

app.post('/Magazine/Create', (req, res) => {
    const { title, publisher, issueNumber, genre, price, frequency, publishDate } = req.body;
    const newId = magazines.length > 0 ? Math.max(...magazines.map(m => m.magazineId)) + 1 : 1;
    magazines.push({
        magazineId: newId,
        title,
        publisher,
        issueNumber: issueNumber || 'Vol. 1 Issue 1',
        genre: genre || 'General',
        price: parseFloat(price) || 100,
        frequency: frequency || 'Monthly',
        publishDate: publishDate || new Date().toISOString().substring(0, 10),
        isAvailable: true
    });
    flashMessage = `Successfully added magazine: ${title}.`;
    res.redirect('/Magazine/Index');
});

app.get('/Magazine/Edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const magazine = magazines.find(m => m.magazineId === id);
    if (!magazine) return res.render('shared_notfound', { errorMessage: `Magazine #${id} not found.` });
    res.render('magazine_edit', { magazine });
});

app.post(['/Magazine/Edit', '/Magazine/Edit/:id'], (req, res) => {
    const id = parseInt(req.body.magazineId || req.params.id);
    const magazine = magazines.find(m => m.magazineId === id);
    if (magazine) {
        magazine.title = req.body.title;
        magazine.publisher = req.body.publisher;
        magazine.issueNumber = req.body.issueNumber;
        magazine.genre = req.body.genre;
        magazine.price = parseFloat(req.body.price) || magazine.price;
        magazine.frequency = req.body.frequency;
        magazine.publishDate = req.body.publishDate;
        flashMessage = `Updated magazine: ${magazine.title}.`;
    }
    res.redirect('/Magazine/Index');
});

app.get('/Magazine/Delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    magazines = magazines.filter(m => m.magazineId !== id);
    flashMessage = `Deleted magazine record #${id}.`;
    res.redirect('/Magazine/Index');
});

// BORROW MODULE
app.get(['/Borrow/Create', '/Borrow/Create/:bookId'], (req, res) => {
    const bookId = parseInt(req.query.bookId || req.params.bookId);
    if (!bookId) return res.render('shared_notfound', { errorMessage: "Book ID was not provided for borrowing." });
    const book = books.find(b => b.bookId === bookId);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${bookId} to borrow.` });
    if (!book.isAvailable) return res.render('shared_notavailable', { errorMessage: `The book '${book.title}' is currently not available for borrowing.` });
    res.render('borrow_create', { book });
});

app.post('/Borrow/Create', (req, res) => {
    const bookId = parseInt(req.body.bookId);
    const book = books.find(b => b.bookId === bookId);
    if (!book) return res.render('shared_notfound', { errorMessage: `No book found with ID ${bookId} to borrow.` });
    if (!book.isAvailable) return res.render('shared_notavailable', { errorMessage: `The book '${book.title}' is already borrowed.` });

    const newBorrowId = borrowRecords.length > 0 ? Math.max(...borrowRecords.map(br => br.borrowRecordId)) + 1 : 101;
    const borrowRecord = {
        borrowRecordId: newBorrowId,
        bookId: book.bookId,
        borrowerName: req.body.borrowerName,
        borrowerEmail: req.body.borrowerEmail,
        phone: req.body.phone,
        borrowDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        returnDate: null
    };
    borrowRecords.push(borrowRecord);
    book.isAvailable = false;
    flashMessage = `Successfully borrowed book: ${book.title}.`;
    res.redirect('/Books/Index');
});

app.get(['/Borrow/Return', '/Borrow/Return/:borrowRecordId'], (req, res) => {
    const recordId = parseInt(req.query.borrowRecordId || req.params.borrowRecordId);
    if (!recordId) return res.render('shared_notfound', { errorMessage: "Borrow Record ID was not provided for returning." });
    const record = borrowRecords.find(br => br.borrowRecordId === recordId);
    if (!record) return res.render('shared_notfound', { errorMessage: `No borrow record found with ID ${recordId} to return.` });
    if (record.returnDate) return res.render('shared_alreadyreturned', { errorMessage: "The borrow record has already been returned." });

    const book = books.find(b => b.bookId === record.bookId);
    res.render('borrow_return', { record, bookTitle: book ? book.title : "Unknown Book" });
});

app.post('/Borrow/Return', (req, res) => {
    const recordId = parseInt(req.body.borrowRecordId);
    const record = borrowRecords.find(br => br.borrowRecordId === recordId);
    if (!record) return res.render('shared_notfound', { errorMessage: `No borrow record found with ID ${recordId} to return.` });
    if (record.returnDate) return res.render('shared_alreadyreturned', { errorMessage: "The borrow record has already been returned." });

    record.returnDate = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const book = books.find(b => b.bookId === record.bookId);
    if (book) book.isAvailable = true;
    flashMessage = `Successfully returned book: ${book ? book.title : ''}.`;
    res.redirect('/Books/Index');
});

// STUDENT MODULE
app.get(['/Student', '/Student/Index'], (req, res) => {
    let searchTerm = req.query.searchTerm || '';
    let page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    let filteredStudents = [...students];

    // Apply search filter if searchTerm exists
    if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        filteredStudents = filteredStudents.filter(s => 
            (s.studentName && s.studentName.toLowerCase().includes(term)) ||
            (s.email && s.email.toLowerCase().includes(term)) ||
            (s.phone && s.phone.toLowerCase().includes(term))
        );
    }

    // Pagination calculations
    const totalItems = filteredStudents.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const offset = (page - 1) * pageSize;
    const paginatedStudents = filteredStudents.slice(offset, offset + pageSize);

    res.render('student_index', { 
        students: paginatedStudents, 
        searchTerm: searchTerm,
        currentPage: page,
        totalPages: totalPages
    });
});

app.get('/Student/Create', (req, res) => {
    res.render('student_create');
});

app.post('/Student/Create', (req, res) => {
    const { studentName, email, phone } = req.body;
    const newId = students.length > 0 ? Math.max(...students.map(s => s.studentId)) + 1 : 1;
    students.push({ studentId: newId, studentName, email, phone });
    flashMessage = `Added new student: ${studentName}.`;
    res.redirect('/Student/Index');
});

app.get('/Student/Edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.studentId === id) || students[0];
    res.render('student_edit', { student });
});

app.post(['/Student/Edit', '/Student/Edit/:id'], (req, res) => {
    const id = parseInt(req.body.studentId || req.params.id);
    const student = students.find(s => s.studentId === id);
    if (student) {
        student.studentName = req.body.studentName;
        student.email = req.body.email;
        student.phone = req.body.phone;
        flashMessage = `Updated student: ${student.studentName}.`;
    }
    res.redirect('/Student/Index');
});

app.get('/Student/Delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.studentId !== id);
    flashMessage = `Deleted student record #${id}.`;
    res.redirect('/Student/Index');
});

// LIBRARIAN MODULE
app.get(['/Librarian', '/Librarian/Index'], (req, res) => {
    let searchTerm = req.query.searchTerm || '';
    let page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    let filteredLibrarians = [...librarians];

    // Apply search filter if searchTerm exists
    if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        filteredLibrarians = filteredLibrarians.filter(l => 
            (l.name && l.name.toLowerCase().includes(term))
        );
    }

    // Pagination calculations
    const totalItems = filteredLibrarians.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const offset = (page - 1) * pageSize;
    const paginatedLibrarians = filteredLibrarians.slice(offset, offset + pageSize);

    res.render('librarian_index', { 
        librarians: paginatedLibrarians, 
        searchTerm: searchTerm,
        currentPage: page,
        totalPages: totalPages
    });
});

app.get('/Librarian/Create', (req, res) => {
    res.render('librarian_create');
});

app.post('/Librarian/Create', (req, res) => {
    const { name, age, phone } = req.body;
    const newId = librarians.length > 0 ? Math.max(...librarians.map(l => l.librarianId)) + 1 : 1;
    librarians.push({ librarianId: newId, name, age: parseInt(age), phone });
    flashMessage = `Added librarian: ${name}.`;
    res.redirect('/Librarian/Index');
});

app.get('/Librarian/Edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const librarian = librarians.find(l => l.librarianId === id) || librarians[0];
    res.render('librarian_edit', { librarian });
});

app.post(['/Librarian/Edit', '/Librarian/Edit/:id'], (req, res) => {
    const id = parseInt(req.body.librarianId || req.params.id);
    const librarian = librarians.find(l => l.librarianId === id);
    if (librarian) {
        librarian.name = req.body.name;
        librarian.age = parseInt(req.body.age);
        librarian.phone = req.body.phone;
        flashMessage = `Updated librarian: ${librarian.name}.`;
    }
    res.redirect('/Librarian/Index');
});

app.get('/Librarian/Delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    librarians = librarians.filter(l => l.librarianId !== id);
    flashMessage = `Deleted librarian record #${id}.`;
    res.redirect('/Librarian/Index');
});

// ABOUT US ROUTE
app.get(['/About', '/About/Index'], (req, res) => {
    res.render('about');
});

// CONTACT US ROUTE
app.get(['/Contact', '/Contact/Index'], (req, res) => {
    res.render('contact');
});

app.post('/Contact/Submit', (req, res) => {
    const { name, email, subject, message } = req.body;
    flashMessage = `Thank you, ${name || 'User'}! Your inquiry has been dispatched to ipratyaksha.works@gmail.com.`;
    res.redirect('/Contact');
});

// Start Server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`PS Library Management System is running on localhost!`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`==================================================`);
});

const express = require('express');
const session = require('express-session');
const path = require('path');

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
    { bookId: 1, title: "Panchatantra Tales", author: "Vishnu Sharma", isbn: "978-8129104427", publishedDate: "2020-05-10", price: 299, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9788129104427-M.jpg" },
    { bookId: 2, title: "Malgudi Days", author: "R. K. Narayan", isbn: "978-0140187809", publishedDate: "2019-11-15", price: 350, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780140187809-M.jpg" },
    { bookId: 3, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", isbn: "978-8173711466", publishedDate: "2021-01-26", price: 399, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9788173711466-M.jpg" },
    { bookId: 4, title: "The White Tiger", author: "Aravind Adiga", isbn: "978-1416562604", publishedDate: "2022-03-14", price: 499, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9781416562604-M.jpg" },
    { bookId: 5, title: "The Guide", author: "R. K. Narayan", isbn: "978-0143414988", publishedDate: "2018-08-20", price: 320, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780143414988-M.jpg" },
    { bookId: 6, title: "Train to Pakistan", author: "Khushwant Singh", isbn: "978-0143065883", publishedDate: "2020-08-15", price: 280, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780143065883-M.jpg" },
    { bookId: 7, title: "The God of Small Things", author: "Arundhati Roy", isbn: "978-0143028574", publishedDate: "2021-09-05", price: 450, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780143028574-M.jpg" },
    { bookId: 8, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", isbn: "978-0201616224", publishedDate: "2021-10-30", price: 850, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg" },
    { bookId: 9, title: "Clean Code: Architecture", author: "Robert C. Martin", isbn: "978-0132350884", publishedDate: "2023-08-01", price: 920, isAvailable: true, coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg" }
];

// Seed Data - Students (Indian Profiles & User Email)
let students = [
    { studentId: 1, studentName: "Pratyaksha Singh", email: "ipratyaksha.works@gmail.com", phone: "+91 98765 43210" },
    { studentId: 2, studentName: "Aarav Sharma", email: "aarav.sharma@email.in", phone: "+91 98123 45678" },
    { studentId: 3, studentName: "Ananya Verma", email: "ananya.v@email.in", phone: "+91 98987 65432" },
    { studentId: 4, studentName: "Rohan Gupta", email: "rohan.g@email.in", phone: "+91 97111 22334" },
    { studentId: 5, studentName: "Priya Nair", email: "priya.nair@email.in", phone: "+91 96500 88776" },
    { studentId: 6, studentName: "Kabir Mehta", email: "kabir.m@email.in", phone: "+91 98450 11223" }
];

// Seed Data - Librarians (Indian Profiles)
let librarians = [
    { librarianId: 1, name: "Rajesh Kumar", age: 38, phone: "+91 99100 12345" },
    { librarianId: 2, name: "Meenakshi Sundaram", age: 32, phone: "+91 98200 54321" },
    { librarianId: 3, name: "Sunita Patel", age: 44, phone: "+91 97300 67890" },
    { librarianId: 4, name: "Michael Scott", age: 45, phone: "+91 99888 77665" }
];

// Seed Data - Newspapers (Price in ₹ INR)
let newspapers = [
    { newspaperId: 1, title: "The Hindu", publisher: "Kasturi & Sons", language: "English", category: "National Daily", dailyPrice: 7, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 2, title: "Dainik Jagran", publisher: "Jagran Prakashan", language: "Hindi", category: "General News", dailyPrice: 5, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 3, title: "The Times of India", publisher: "Bennett, Coleman & Co.", language: "English", category: "General News", dailyPrice: 6, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 4, title: "Mint", publisher: "HT Media", language: "English", category: "Business & Economy", dailyPrice: 10, subscriptionType: "Weekday Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 5, title: "Financial Express", publisher: "Indian Express Group", language: "English", category: "Finance & Markets", dailyPrice: 7, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 6, title: "Eenadu", publisher: "Ramoji Group", language: "Telugu", category: "Regional News", dailyPrice: 5, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true },
    { newspaperId: 7, title: "Dina Thanthi", publisher: "Daily Thanthi Group", language: "Tamil", category: "Regional News", dailyPrice: 5, subscriptionType: "Daily Edition", publishDate: "2026-07-25", isAvailable: true }
];

// Seed Data - Magazines (Price in ₹ INR)
let magazines = [
    { magazineId: 1, title: "India Today", publisher: "Living Media", issueNumber: "Vol. 49 Issue 30", genre: "Current Affairs", price: 75, frequency: "Weekly", publishDate: "2026-07-20", isAvailable: true },
    { magazineId: 2, title: "Outlook", publisher: "Outlook Publishing", issueNumber: "Vol. 28 Issue 14", genre: "News & Analysis", price: 60, frequency: "Bi-Weekly", publishDate: "2026-07-15", isAvailable: true },
    { magazineId: 3, title: "Frontline", publisher: "Kasturi & Sons", issueNumber: "Vol. 43 Issue 12", genre: "Politics & Culture", price: 80, frequency: "Fortnightly", publishDate: "2026-07-10", isAvailable: true },
    { magazineId: 4, title: "Forbes India", publisher: "Network18", issueNumber: "Vol. 18 Issue 07", genre: "Business & Wealth", price: 200, frequency: "Monthly", publishDate: "2026-07-01", isAvailable: true },
    { magazineId: 5, title: "National Geographic India", publisher: "ACK Media", issueNumber: "Vol. 15 Issue 07", genre: "Science & Nature", price: 180, frequency: "Monthly", publishDate: "2026-07-01", isAvailable: true },
    { magazineId: 6, title: "Business Today", publisher: "Living Media", issueNumber: "Vol. 35 Issue 15", genre: "Markets & Corporate", price: 150, frequency: "Fortnightly", publishDate: "2026-07-12", isAvailable: true }
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
    res.render('login', { message: res.locals.errorMessage });
});

app.post('/Login/Verify', (req, res) => {
    const { username, password } = req.body;
    const user = logintab.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        flashMessage = `Welcome back, ${user.name}! Authenticated to PS Library.`;
        res.redirect('/Dashboard');
    } else {
        res.render('login', { message: "Invalid username or password. Please try again." });
    }
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
    const booksList = books.map(b => {
        const activeBorrow = borrowRecords.find(br => br.bookId === b.bookId && !br.returnDate);
        return { ...b, activeBorrowRecordId: activeBorrow ? activeBorrow.borrowRecordId : null };
    });
    res.render('books_index', { books: booksList });
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
    res.render('newspaper_index', { newspapers });
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
    res.render('magazine_index', { magazines });
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
    res.render('student_index', { students });
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
    res.render('librarian_index', { librarians });
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

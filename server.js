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
    {
        "bookId": 1,
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J. K. Rowling",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1997-01-01",
        "price": 545,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/15155833-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 2,
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1954-01-01",
        "price": 380,
        "isAvailable": false,
        "coverImage": "https://covers.openlibrary.org/b/id/14625765-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 3,
        "title": "The Hunger Games",
        "author": "Suzanne Collins",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "2008-01-01",
        "price": 383,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/12646537-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 4,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1937-01-01",
        "price": 480,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/14627509-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 5,
        "title": "Nineteen Eighty-Four",
        "author": "George Orwell",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1949-01-01",
        "price": 571,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/9267242-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 6,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1960-01-01",
        "price": 561,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/14351077-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 7,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1813-01-01",
        "price": 464,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/14348537-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 8,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1920-01-01",
        "price": 286,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/10590366-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 9,
        "title": "Moby Dick",
        "author": "Herman Melville",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1851-01-01",
        "price": 232,
        "isAvailable": false,
        "coverImage": "https://covers.openlibrary.org/b/id/10544254-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 10,
        "title": "Jane Eyre",
        "author": "Charlotte Brontë",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1847-01-01",
        "price": 471,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/8235363-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 11,
        "title": "Catch-22",
        "author": "Joseph Heller",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1961-01-01",
        "price": 593,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/6468653-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 12,
        "title": "O Alquimista",
        "author": "Paulo Coelho",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1988-01-01",
        "price": 231,
        "isAvailable": false,
        "coverImage": "https://covers.openlibrary.org/b/id/7414780-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 13,
        "title": "The Kite Runner",
        "author": "Khaled Hosseini",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "2003-01-01",
        "price": 642,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/14846827-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 14,
        "title": "The Book Thief",
        "author": "Markus Zusak",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1998-01-01",
        "price": 378,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/8153054-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 15,
        "title": "Sapiens",
        "author": "Yuval Noah Harari",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "2011-01-01",
        "price": 594,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/8634250-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 16,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "2016-01-01",
        "price": 557,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/12539702-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 17,
        "title": "Children of Dune",
        "author": "Frank Herbert",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1976-01-01",
        "price": 425,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/6976407-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 18,
        "title": "Fahrenheit 451",
        "author": "Ray Bradbury",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1953-01-01",
        "price": 638,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/12993656-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 19,
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1932-01-01",
        "price": 239,
        "isAvailable": false,
        "coverImage": "https://covers.openlibrary.org/b/id/8231823-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 20,
        "title": "Animal Farm",
        "author": "George Orwell",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1945-01-01",
        "price": 641,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/11261770-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 21,
        "title": "The Catcher in the Rye",
        "author": "J. D. Salinger",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1945-01-01",
        "price": 374,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/9273490-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 22,
        "title": "The Picture of Dorian Gray",
        "author": "Oscar Wilde",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1890-01-01",
        "price": 265,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/14314858-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 23,
        "title": "Frankenstein; or, The Modern Prometheus",
        "author": "Mary Shelley",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1818-01-01",
        "price": 252,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/12356249-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 24,
        "title": "Dracula",
        "author": "Bram Stoker",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1897-01-01",
        "price": 324,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/12216503-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 25,
        "title": "Ὀδύσσεια",
        "author": "Όμηρος",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1488-01-01",
        "price": 327,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/9045853-L.jpg",
        "description": "A masterpiece of literature."
    },
    {
        "bookId": 26,
        "title": "Преступление и наказание",
        "author": "Fyodor Dostoyevsky",
        "genre": "Fiction",
        "isbn": "",
        "publishedDate": "1866-01-01",
        "price": 322,
        "isAvailable": true,
        "coverImage": "https://covers.openlibrary.org/b/id/9411873-L.jpg",
        "description": "A masterpiece of literature."
    }
];

// Make exactly 2 books out of stock
books.forEach(b => b.isAvailable = true);
books[books.length - 1].isAvailable = false;
books[books.length - 2].isAvailable = false;

// Seed Data - Students (Indian Profiles & User Email)
let students = [
    { studentId: 1, studentName: 'Rahul Verma', email: 'rahul.v@student.in', phone: '+91 98765 00001', membershipDate: '2023-08-15', borrowCount: 12 },
    { studentId: 2, studentName: 'Sneha Patel', email: 'sneha.p@student.in', phone: '+91 98765 00002', membershipDate: '2024-01-10', borrowCount: 5 },
    { studentId: 3, studentName: 'Rohan Sharma', email: 'rohan.s@student.in', phone: '+91 98765 00003', membershipDate: '2023-11-20', borrowCount: 8 },
    { studentId: 4, studentName: 'Pooja Gupta', email: 'pooja.g@student.in', phone: '+91 98765 00004', membershipDate: '2024-03-05', borrowCount: 3 },
    { studentId: 5, studentName: 'Aashi Singh', email: 'aashi.s@student.in', phone: '+91 98765 00005', membershipDate: '2022-09-12', borrowCount: 25 },
    { studentId: 6, studentName: 'Sunny Kumar', email: 'sunny.k@student.in', phone: '+91 98765 00006', membershipDate: '2024-05-18', borrowCount: 1 },
    { studentId: 7, studentName: 'Medha Patel', email: 'medha.p@student.in', phone: '+91 98765 00007', membershipDate: '2024-06-10', borrowCount: 2 },
    { studentId: 8, studentName: 'Jay Shah', email: 'jay.s@student.in', phone: '+91 98765 00010', membershipDate: '2024-02-14', borrowCount: 9 },
    { studentId: 9, studentName: 'Rishi Desai', email: 'rishi.d@student.in', phone: '+91 98765 00011', membershipDate: '2023-10-30', borrowCount: 11 },
    { studentId: 10, studentName: 'Neha Singh', email: 'neha.s@student.in', phone: '+91 98765 00012', membershipDate: '2023-01-22', borrowCount: 15 },
    { studentId: 11, studentName: 'Kunal Kapoor', email: 'kunal.k@student.in', phone: '+91 98765 00013', membershipDate: '2023-12-05', borrowCount: 6 },
    { studentId: 12, studentName: 'Anjali Desai', email: 'anjali.d@student.in', phone: '+91 98765 00014', membershipDate: '2024-02-14', borrowCount: 9 },
    { studentId: 13, studentName: 'Suresh Raina', email: 'suresh.r@student.in', phone: '+91 98765 00015', membershipDate: '2023-10-30', borrowCount: 11 },
    { studentId: 14, studentName: 'Priya Mishra', email: 'priya.m@student.in', phone: '+91 98765 00016', membershipDate: '2024-05-22', borrowCount: 4 },
    { studentId: 15, studentName: 'Gaurav Jain', email: 'gaurav.j@student.in', phone: '+91 98765 00017', membershipDate: '2023-11-11', borrowCount: 7 }
];

// Seed Data - Librarians (Indian Profiles)
let librarians = [
    { librarianId: 1, name: 'Amar Singh', age: 45, phone: '+91 99000 11111', employeeId: 'LIB-001', department: 'Head Librarian', experience: '15 Years', shift: 'Morning' },
    { librarianId: 2, name: 'Kiran Sharma', age: 38, phone: '+91 99000 22222', employeeId: 'LIB-002', department: 'Reference', experience: '10 Years', shift: 'Morning' },
    { librarianId: 3, name: 'Vibha Reddy', age: 42, phone: '+91 99000 33333', employeeId: 'LIB-003', department: 'Digital Archives', experience: '8 Years', shift: 'Evening' },
    { librarianId: 4, name: 'Vijay Singh', age: 34, phone: '+91 99000 44444', employeeId: 'LIB-004', department: 'Circulation', experience: '5 Years', shift: 'Evening' },
    { librarianId: 5, name: 'Ankita Verma', age: 29, phone: '+91 99000 55555', employeeId: 'LIB-005', department: 'Children Section', experience: '3 Years', shift: 'Morning' },
    { librarianId: 6, name: 'Vikram Joshi', age: 50, phone: '+91 99000 66666', employeeId: 'LIB-006', department: 'Acquisitions', experience: '20 Years', shift: 'Evening' },
    { librarianId: 7, name: 'Sonal Tiwari', age: 31, phone: '+91 99000 77777', employeeId: 'LIB-007', department: 'Reference', experience: '4 Years', shift: 'Morning' }
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
    { newspaperId: 8, title: "Amar Ujala", publisher: "Amar Ujala Publications", language: "Hindi", category: "National Daily", dailyPrice: 5, subscriptionType: "Daily", publishDate: "2026-07-28", isAvailable: true },
    { newspaperId: 10, title: 'The Hindu Business Line', publisher: 'Kasturi & Sons', language: 'English', category: 'Business', dailyPrice: 8, subscriptionType: 'Weekly', publishDate: '2026-07-28' },
    { newspaperId: 11, title: 'Mint', publisher: 'HT Media', language: 'English', category: 'Business', dailyPrice: 9, subscriptionType: 'Daily', publishDate: '2026-07-28' },
    { newspaperId: 12, title: 'Deccan Chronicle', publisher: 'Deccan Chronicle Holdings', language: 'English', category: 'National Daily', dailyPrice: 5, subscriptionType: 'Monthly', publishDate: '2026-07-28' },
    { newspaperId: 13, title: 'The Statesman', publisher: 'The Statesman Ltd', language: 'English', category: 'National Daily', dailyPrice: 6, subscriptionType: 'Daily', publishDate: '2026-07-28' },
    { newspaperId: 14, title: 'Dainik Bhaskar', publisher: 'Dainik Bhaskar Group', language: 'Hindi', category: 'National Daily', dailyPrice: 4, subscriptionType: 'Monthly', publishDate: '2026-07-28' },
    { newspaperId: 15, title: 'Amar Ujala', publisher: 'Amar Ujala Ltd', language: 'Hindi', category: 'National Daily', dailyPrice: 4, subscriptionType: 'Daily', publishDate: '2026-07-28' },
];

// Seed Data - Magazines (Price in ₹ INR)
let magazines = [
    { magazineId: 1, title: "India Today", publisher: "Living Media", issueNumber: "August 2026", genre: "News", price: 100, frequency: "Weekly", publishDate: "2026-07-25", isAvailable: true },
    { magazineId: 2, title: "National Geographic", publisher: "National Geographic Partners", issueNumber: "August 2026", genre: "Science & Nature", price: 250, frequency: "Monthly", publishDate: "2026-07-15", isAvailable: true },
    { magazineId: 3, title: "Scientific American", publisher: "Springer Nature", issueNumber: "August 2026", genre: "Science", price: 300, frequency: "Monthly", publishDate: "2026-07-20", isAvailable: true },
    { magazineId: 4, title: "Forbes India", publisher: "Network18", issueNumber: "August 2026", genre: "Business", price: 200, frequency: "Fortnightly", publishDate: "2026-07-22", isAvailable: true },
    { magazineId: 5, title: "Frontline", publisher: "The Hindu Group", issueNumber: "August 2026", genre: "Current Affairs", price: 120, frequency: "Fortnightly", publishDate: "2026-07-24", isAvailable: true },
    { magazineId: 6, title: "Outlook", publisher: "Outlook Publishing", issueNumber: "August 2026", genre: "News", price: 90, frequency: "Weekly", publishDate: "2026-07-26", isAvailable: true },
    { magazineId: 8, title: 'Forbes India', publisher: 'Network18', language: 'English', category: 'Business', monthlyPrice: 200, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 9, title: 'Vogue India', publisher: 'Condé Nast', language: 'English', category: 'Fashion', monthlyPrice: 150, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 10, title: 'Digit', publisher: '9.9 Group', language: 'English', category: 'Technology', monthlyPrice: 125, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 11, title: 'Filmfare', publisher: 'Worldwide Media', language: 'English', category: 'Entertainment', monthlyPrice: 100, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 12, title: 'Outlook', publisher: 'Rajan Raheja Group', language: 'English', category: 'News', monthlyPrice: 90, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 13, title: 'Frontline', publisher: 'The Hindu Group', language: 'English', category: 'Current Affairs', monthlyPrice: 85, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
    { magazineId: 14, title: 'Competition Success Review', publisher: 'CSR', language: 'English', category: 'Education', monthlyPrice: 75, subscriptionType: 'Yearly', publishDate: '2026-07-01' },
    { magazineId: 15, title: 'Sportstar', publisher: 'The Hindu Group', language: 'English', category: 'Sports', monthlyPrice: 80, subscriptionType: 'Monthly', publishDate: '2026-07-01' },
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
        flashMessage = `Welcome back, <span style="font-family: 'Cinzel', serif; font-weight: 700;">${user.name}</span>! Authenticated to PS Library.`;
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
    flashMessage = `Account created successfully. Please sign in.`;
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

// DASHBOARD MODULE
app.get(['/Dashboard', '/Dashboard/Index'], (req, res) => {
    if (!req.session.user) return res.redirect('/Login');

    const topBooks = books.slice(0, 6);

    const model = {
        totalBooks: books.length,
        totalStudents: students.length,
        totalBorrowings: borrowRecords.filter(b => !b.returnDate).length,
        totalNewspapers: newspapers.length,
        totalMagazines: magazines.length,
        totalPublications: newspapers.length + magazines.length,
        monthlyTrends: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            borrowed: [32, 45, 38, 52, 60, borrowRecords.length + 42],
            returned: [28, 40, 36, 48, 55, borrowRecords.filter(b => b.returnDate).length + 38]
        },
        topBooks: topBooks
    };
    res.render('dashboard', { model, user: req.session.user });
});

// PROFILE MODULE
app.get('/Profile', (req, res) => {
    if (!req.session.user) return res.redirect('/Login');
    res.render('profile', { user: req.session.user });
});

app.post('/Profile/Update', (req, res) => {
    if (!req.session.user) return res.redirect('/Login');
    
    // Simple update logic for demonstration
    const { name, email } = req.body;
    const userIndex = logintab.findIndex(u => u.username === req.session.user.username);
    if (userIndex !== -1) {
        logintab[userIndex].name = name || logintab[userIndex].name;
        logintab[userIndex].email = email || logintab[userIndex].email;
        req.session.user = logintab[userIndex];
    }
    
    flashMessage = "Profile updated successfully!";
    res.redirect('/Profile');
});

// BOOKS MODULE
app.get(['/Books', '/Books/Index'], (req, res) => {
    let searchQuery = req.query.searchQuery || '';

    // Map active borrow records first
    // Sort books: available first
    books.sort((a, b) => {
        if (a.isAvailable === b.isAvailable) return 0;
        return a.isAvailable ? -1 : 1;
    });

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

    res.render('books_index', { 
        books: filteredBooks, 
        searchQuery: searchQuery
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
    const pageSize = 1000;

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
    const pageSize = 1000;

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
    const pageSize = 1000;

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
    const pageSize = 1000;

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

# Library Management System (LMSystem)

A modern, enterprise-grade Library Management System built with an interactive Node.js Express localhost web application. Styled using a custom Subtle Executive Pastel design system with light and darkened pastel theme switching, book thumbnail cover displays, interactive fine estimation, category filtering, and Indian Rupee (₹) currency support.

## System Login Credentials

> [!NOTE]
> System authentication credentials are maintained exclusively in this documentation file. They have been intentionally omitted from the public login screen to maintain realistic authentication patterns.

Access the application using any of the following accounts:

| Role | Username | Password | Permissions & Access Scope |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `12345` | Full administrative access to Dashboard, Books, Newspapers, Magazines, Students, Librarians, About Us & Contact Us |
| **Student Member** | `mycodingproject` | `myc546` | Student member portal access |
| **Librarian Staff** | `my` | `myc` | Operational staff member access |
| **Alternative Student** | `student1` | `student123` | Secondary student account |
| **Alternative Staff** | `librarian1` | `lib123` | Secondary librarian account |

## Features & Highlights

1. **Clean Login Page & Session Authorization**:
   * **First Page = Login Screen**: Unauthenticated users attempting to visit guarded routes are automatically redirected to `/Login`.
   * **Conditional Navigation**: Logout buttons and system links are displayed for authorized active sessions.

2. **Subtle Executive Pastel Design System**:
   * **Soft Pastel Palettes**: Light Mode utilizes soft alabaster cream, muted lavender, slate blue, sage, and warm gold accents. Dark Mode utilizes darkened pastel slate tones without pure black for a professional, subtle look.
   * **High-Contrast Dark Mode**: Crisp silver and white typography ensures perfect legibility across all screens.
   * **Responsive Container Widths**: Optimized layout ensuring all cards and tables fit smoothly within screen bounds by default, hugging content seamlessly without annoying horizontal scrollbars on modern monitors.

3. **Indian Rupees (₹ / INR) Currency**:
   * All price fields across Books, Newspapers, Magazines, Fines, and Subscriptions strictly display in Indian Rupees (₹).

4. **Portfolio & Enterprise Features**:
   * **Book Thumbnail Covers**: Visual book cover thumbnails displayed directly in the Books catalog directory.
   * **Overdue Fine Estimator**: Interactive calculator computing late return fees in ₹ INR (at ₹10/day fine rate).
   * **Category & Genre Filter Tabs**: Quick filter tab bars to filter catalog items instantly.
   * **Recent System Activity Timeline**: Real-time system activity log card on the main dashboard.
   * **1-Click CSV & JSON Data Export**: Export library catalog data directly into `.csv` and `.json` files.
   * **About Us & Contact Us Modules**: Comprehensive organizational overview and interactive contact inquiry desk.
   * **Extended Datasets**: Loaded with rich metadata for multiple genres, publishers, and language editions.

5. **Modules Included**:
   * **Books Module**: Book collection management with thumbnail covers, ISBN single-line display, borrowing/return workflow, and fine calculator.
   * **Newspapers Module**: Daily periodicals, publisher details, language, subscription types, and daily prices in ₹.
   * **Magazines Module**: Weekly, fortnightly, and monthly magazine issues, genre domain, issue codes, and subscription prices in ₹.
   * **Students Directory**: Registered student member directory and profile management.
   * **Librarians Directory**: Library staff directory, age metrics, and operational staff assignments.
   * **About Us Module**: Organizational history, core mission statements, and administrative structure.
   * **Contact Us Module**: Interactive help desk inquiry submission form and library office details.
   * **Admin Dashboard**: Stat metrics, recent activity timeline, and quick fine estimator widget.

## Technology Stack

* **Backend / Web Server**: Node.js, Express, `express-session`, EJS View Engine
* **Styling & Icons**: Bootstrap 5, Bootstrap Icons, Custom CSS3 Design System with Variables, SVG Vector Graphics, Google Fonts (Montserrat, Cinzel)
* **Currency**: Indian Rupees (₹ / INR)

## Running on Localhost

Start the live web application on localhost:

```bash
node server.js
```

Then open your browser and navigate to:
**http://localhost:5000**

## Directory Layout

```
Library Management System/
├── views_ejs/                # Node.js EJS Express Views (.ejs)
│   ├── books_*.ejs
│   ├── newspaper_*.ejs
│   ├── magazine_*.ejs
│   ├── student_*.ejs
│   ├── librarian_*.ejs
│   ├── dashboard.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── login.ejs
├── public/css/style.css      # Pastel Design System CSS
├── screenshots/              # Folder for application demo screenshots
├── server.js                 # Express Localhost Server with Auth Guard
├── package.json              # Dependencies Manifest
└── README.md                 # Project Documentation
```

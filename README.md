🏡 Wanderlust — Airbnb Clone

A full-stack web application where users can explore listings, create their own, write reviews, and manage accounts. Built using Node.js, Express, MongoDB, EJS, and Bootstrap.

Live Demo: (https://wanderlust-25.onrender.com)


⭐ Features
🔐 Authentication & Authorization
Secure user registration & login using Passport.js
Password hashing using bcrypt
Only logged-in users can create, edit, or delete listings
Authorization to prevent users from modifying others' listings

🏘️ Listings
Create new listings with title, price, description, location
Upload images (Cloudinary integration if enabled)
View full listing details
Edit & delete your own listings

⭐ Reviews
Add reviews & ratings to listings
Delete your reviews
Prevent duplicate reviews

🌍 Maps (Optional)
Map integration using Mapbox (if configured)
Shows listing location on map

🎨 UI / UX
Clean, responsive UI
Bootstrap 5 + custom CSS
Dynamic navbar, flash messages, error handling pages

⚙️ Backend Technologies
Node.js + Express.js
MongoDB + Mongoose
EJS templating engine
Method-Override for PUT/DELETE
Session handling & cookies
Error-handling middleware


Wanderlust/
│── app.js
│── package.json
│── .env
│── /models
│   ├── listing.js
│   └── review.js
│── /routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│── /views
│   ├── listings
│   ├── reviews
│   ├── users
│   ├── includes
│   └── layouts
│── /public
│   ├── css
│   └── js
└── /utils

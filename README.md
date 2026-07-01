# 🌍 Wanderlust

Wanderlust is a **full-stack web application** where users can **browse, add, edit, and review travel destinations**. It is built using **Node.js, Express, MongoDB, Passport.js, and EJS**.

## 🚀 Live Demo
[🔗 Wanderlust Live](https://wanderlust-2kif.onrender.com/listings)

## 🛠️ Features
- 🏕️ **Create, Edit, and Delete Listings** for travel destinations
- ⭐ **Review System** to rate listings
- 🔒 **User Authentication** (Signup, Login, Logout) with Passport.js
- 📷 **Image Uploads** (if implemented)
- 🔎 **Search & Filter** (Upcoming Feature)
- 🗺️ **Map Integration** (Upcoming Feature)
- 🛡️ **Secure & Optimized** (Data validation, error handling, and security middleware)

## 🏗️ Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap
- **Authentication:** Passport.js
- **Security:** Helmet, express-session, Mongo Sanitization

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/coder-swarnadip/WanderLust.git
cd WanderLust
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
DATABASE_URL=your_mongodb_connection_string
SECRET=your_secret_key
```

### 4️⃣ Run the Application
```sh
npm start
```

### 5️⃣ Open in Browser
Visit `http://localhost:3000` to view the application.

## 📌 Folder Structure
```
WanderLust/
│── models/           # Mongoose models (Listing, Review, User)
│── routes/           # Express routes (listing.js, user.js, review.js)
│── views/            # EJS templates
│── public/           # Static files (CSS, JS, Images)
│── app.js            # Main Express app file
│── middleware/       # Custom middlewares
│── utils/            # Utility functions (Async wrapper, error handler)
│── .env.example      # Example environment variables
│── README.md         # Documentation
```

## 📚 Future Improvements
✅ **Pagination for Listings**
✅ **Search & Filter Options**
✅ **Google Maps Integration**
✅ **Dark Mode Toggle**

## 🙌 Contributing
Feel free to fork the repo and submit a PR! 🚀

## 📜 License
This project is licensed under the **MIT License**.

---

### 📩 Connect with Me
💻 GitHub: [coder-swarnadip](https://github.com/coder-swarnadip)
📧 Email: swarnadipmng@gmail.com


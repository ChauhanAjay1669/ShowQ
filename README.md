# ShowQ - Premium Cinema Booking Platform

A full-stack movie marketplace platform built with the MERN stack (MongoDB, Express, React, Node.js). Users can browse, buy, rent, and download movies while administrators have complete control over content, pricing, categories, users, and payments.

## 🚀 Features

### User Features
- ✅ Sign up / Login / Logout with JWT authentication
- ✅ Browse movies with search and filter functionality
- ✅ Movie details with ratings, reviews, and trailer
- ✅ Shopping cart and wishlist
- ✅ Secure payment via Razorpay
- ✅ Purchase history and order tracking
- ✅ My Library - Access purchased movies
- ✅ Add ratings and reviews
- ✅ User profile management

### Admin Features (Full Permissions)
- ✅ Admin dashboard with analytics
  - Total users, orders, and revenue metrics
  - Revenue growth tracking
  - Recent orders overview
- ✅ Movie Management (CRUD)
  - Add/Edit/Delete movies
  - Upload posters to Cloudinary
  - Set pricing and offers
  - Featured movie banners
- ✅ User Management
  - View all users
  - Block/Unblock users
- ✅ Order Management
  - View all transactions
  - Track payment status
- ✅ Category Management
  - Create/Edit/Delete genres
- ✅ Review Moderation
  - Approve/Delete reviews

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **BCrypt** - Password hashing
- **Razorpay** - Payment gateway
- **Cloudinary** - Media storage

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Razorpay account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/ChauhanAjay1669/ShowQ.git
cd ShowQ
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Environment Variables

Create `.env` file in the `server` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/quickshow

# JWT
JWT_SECRET=your_jwt_secret_key_change_this
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Server
PORT=5000
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

Create `.env` file in the `client` directory:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Seed Database (Optional)
```bash
cd server
npm run seed
```

This will create:
- Admin user: `admin@showq.com` / `Admin@123`
- Test user: `user@showq.com` / `User@123`
- Sample categories and movies

### 5. Run the Application

**Development Mode (runs both client and server):**
```bash
# From root directory
npm run dev
```

**Or run separately:**
```bash
# Run server
cd server
npm run dev

# Run client (in another terminal)
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
ShowQ/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin panel pages
│   │   │   └── ...         # User pages
│   │   ├── store/          # Redux store
│   │   │   └── slices/     # Redux slices
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── seed/               # Database seeding
│   └── server.js           # Entry point
│
└── package.json            # Root package.json
```

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:
- **Access Token**: Expires in 7 days
- **Refresh Token**: Expires in 30 days
- Role-based authorization (user/admin)
- Protected routes for authenticated users
- Admin-only routes for administrative functions

## 💳 Payment Integration

Razorpay is integrated for secure payments:
1. User adds movies to cart
2. Proceeds to checkout
3. Razorpay payment gateway opens
4. On successful payment, movies are added to user's library
5. Payment verification via webhook

## 📸 Media Storage

Cloudinary is used for storing movie posters:
- Automatic image optimization
- CDN delivery for fast loading
- Secure signed uploads (admin only)

## 🎨 UI/UX Features

- **Dark Mode** - Modern dark theme with glassmorphism
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Loading States** - Skeleton loaders for better UX
- **Smooth Animations** - Transitions and hover effects
- **Netflix-style Cards** - Modern movie card design
- **Form Validation** - Client and server-side validation

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Movies
- `GET /api/movies` - Get all movies (with search/filter)
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/history` - Get user order history
- `GET /api/orders` - Get all orders (Admin)

### Payment
- `POST /api/payment/verify` - Verify Razorpay payment

### Reviews
- `GET /api/reviews/:movieId` - Get movie reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/metrics` - Get dashboard metrics
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/block` - Block/Unblock user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/library` - Get purchased movies
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:movieId` - Toggle wishlist

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variables
5. Deploy

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new web service
3. Set root directory to `server`
4. Add environment variables
5. Set build command: `npm install`
6. Set start command: `npm start`

### Database (MongoDB Atlas)
1. Create cluster in MongoDB Atlas
2. Get connection string
3. Update `MONGO_URI` in server `.env`

## 🔒 Security Features

- Password hashing with BCrypt
- JWT token-based authentication
- Role-based access control
- CORS protection
- Input validation and sanitization
- Secure payment verification
- HTTPS enforcement in production

## 📝 Development Notes

### Adding New Features
1. Create necessary models in `server/models`
2. Add controllers in `server/controllers`
3. Define routes in `server/routes`
4. Create frontend pages in `client/src/pages`
5. Update Redux state if needed

### Testing
- Use Postman or Thunder Client for API testing
- Test user flow end-to-end
- Verify payment integration in test mode
- Check admin panel functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT

## 👥 Author

**Ajay Chauhan**
- GitHub: [@ChauhanAjay1669](https://github.com/ChauhanAjay1669)
- Email: chauhanajay1669@gmail.com

Built with ❤️ using MERN Stack

---

**ShowQ** - Premium Cinema Booking Platform

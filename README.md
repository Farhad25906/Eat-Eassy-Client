# 🍽️ EatEassy Client - Food Ordering & Meal Management Frontend

A modern, responsive React application for the EatEassy food ordering and meal management system. Built with React, Tailwind CSS, DaisyUI, and extensive features for users and admins.

## 🌐 Live URL

- **Frontend:** [https://eat-eassy-client.vercel.app](https://eat-eassy-client.vercel.app)
- **Backend API:** [https://eat-eassy-server-4mno.vercel.app](https://eat-eassy-server-4mno.vercel.app)

---

## 🎯 Overview

EatEassy Client is a comprehensive frontend application designed to streamline the experience of ordering meals, managing subscriptions, and handling meal requests in a hostel or mess environment.

### Key Highlights

- ✅ **Modern UI/UX** - Built with Tailwind CSS and DaisyUI.
- ✅ **Dark/Light Mode** - Fully supported dynamic theming with Orange primary color.
- ✅ **Role-Based Dashboards** - Separate interfaces for Users and Admins.
- ✅ **Real-Time Data** - Powered by React Query for efficient data fetching.
- ✅ **Secure Payments** - Integrated with Stripe for secure transactions.
- ✅ **Authentication** - Firebase Authentication for secure login and registration.
- ✅ **Responsive Design** - Fully responsive for mobile, tablet, and desktop.

---

## 🚀 Features

### 🔐 Authentication

- **Login/Register** - Secure authentication using Firebase.
- **Social Login** - Supports Google/Social sign-ins.
- **Private Routes** - Protected routes for authenticated users.

### 👤 User Features

- **Browse Meals** - View all available meals with search and filter options.
- **Meal Details** - Detailed view of ingredients, description, and reviews.
- **Meal Requests** - Request new meals to be added to the menu.
- **Upcoming Meals** - Vote (like) for upcoming meals to bring them to the main menu.
- **Reviews** - Post and manage reviews for meals properly.
- **Payment History** - specific payment history tracking.
- **Profile Management** - View and manage user profile and membership status.

### 👨💼 Admin Features

- **Manage Users** - View all users, promote to admin.
- **Add Meals** - Create new meal entries with images (hosted on ImgBB).
- **Manage Meals** - Update or delete existing meals.
- **Serve Meals** - Manage and track served meals status.
- **All Reviews** - Monitor and manage all user reviews.
- **Upcoming Meals Management** - Add and manage upcoming meal proposals.

### 🎨 Shared Features

- **Home Page** - Landing page with banner, featured meals, and plans.
- **Theme Toggle** - Switch between Light and Dark modes.
- **Responsive Navigation** - Smooth navigation with a dynamic sidebar in dashboard.
- **Toast Notifications** - Real-time feedback using React Hot Toast.

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | v18.2.x |
| **Vite** | Build tool | v5.2.x |
| **Tailwind CSS** | Styling | v3.4.x |
| **DaisyUI** | UI component library | v4.12.x |
| **React Router** | Routing | v6.23.x |
| **TanStack Query** | Data fetching | v5.45.x |
| **Firebase** | Authentication | v10.12.x |
| **Stripe** | Payments | v2.7.x |
| **Axios** | HTTP client | v1.7.x |
| **React Hook Form** | Form handling | v7.52.x |
| **Swiper** | Carousels | v11.1.x |

---

## 📁 Project Structure

```
Eat-Eassy-Client/
├── src/
│   ├── Components/       # Reusable UI components
│   │   ├── Shared/       # Shared components like Navbar, Footer
│   ├── Layouts/          # Main and Dashboard layouts
│   ├── pages/            # Application pages
│   │   ├── Home/         # Home page sections
│   │   ├── Login/        # Authentication pages
│   │   ├── Signup/       # Registration page
│   │   ├── Meals/        # Meal listing pages
│   │   ├── MealDetails/  # Single meal detail view
│   │   ├── Dashboards/   # Dashboard pages (Admin & User)
│   │   │   ├── Addmeals/
│   │   │   ├── ManageUser/
│   │   │   ├── Profile/
│   │   │   ├── Payment/
│   │   │   └── ...
│   ├── hooks/            # Custom React hooks (useAuth, useAxiosPublic, etc.)
│   ├── routes/           # Route definitions (Routes, PrivateRoute, AdminRoute)
│   ├── providers/        # Context providers
│   ├── firebase/         # Firebase configuration
│   ├── assets/           # Static assets (images, logos)
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── public/               # Public assets
├── .env.local            # Environment variables
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

---

## 🚦 Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/login` | Login | User login |
| `/signup` | SignUp | User registration |
| `/allMeals` | Meal | Browse all meals |
| `/upcommingMeals` | Upcomming | View upcoming meals |
| `/meal/:id` | MealDetails | View single meal details |

### Protected Routes (User/Admin)

| Path | Component | Description |
|------|-----------|-------------|
| `/dashboard/profile` | Profile | User profile & stats |
| `/dashboard/payment` | Payment | Make payments |
| `/dashboard/paymentHistory` | PaymentHistory | View payment history |
| `/dashboard/requestedMeals` | MealRequest | View requested meals |
| `/dashboard/myReviews` | MyReviews | Manage own reviews |

### Admin Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/dashboard/allUsers` | ManageUser | Manage system users |
| `/dashboard/addMeals` | Addmeals | Add new meals |
| `/dashboard/allMeals` | Managemeals | Manage existing meals |
| `/dashboard/serveMeals` | ServedMeals | Manage served meals |
| `/dashboard/allReviews` | AllReviews | Manage all reviews |
| `/dashboard/allupcomingMeals` | AllUpcomming | Manage upcoming meals |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

# Image Hosting (ImgBB)
VITE_IMAGE_HOSTING_KEY=your_imgbb_key

# Payment Gateway (Stripe)
VITE_PAYMENT_GATEWAY=your_stripe_publishable_key
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Farhad25906/Eat-Eassy-Client.git
   cd Eat-Eassy-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` and add the required variables.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Author

**Farhad Hossen**
- GitHub: [@Farhad25906](https://github.com/Farhad25906)
- Email: farhadhossen2590@gmail.com

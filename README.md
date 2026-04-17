# User Management System - MERN Application

A full-stack user management system built with MongoDB, Express, React, and Node.js (MERN). This application demonstrates secure authentication, role-based access control (RBAC), and comprehensive user management features.

## 🎯 Project Overview

This is a complete MERN application designed to manage user accounts with different roles and permissions. Implemented following Clean Architecture principles with a layered approach: Models → Repository → Service → Controller → Routes.

### Tech Stack

- **Frontend**: React 18 with React Router v6, Axios for API calls
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for password hashing
- **Environment Management**: dotenv

## 📋 Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Access tokens (7 days expiry)
- ✅ Refresh tokens (30 days expiry) for token rotation
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Automatic logout on token expiry
- ✅ Protected routes with middleware

### Role-Based Access Control (RBAC)
Three role tiers with distinct permissions:

**Admin Role**
- Full access to user management
- Create new users
- Edit any user's information
- Delete users
- Assign/change user roles
- Activate/deactivate any user
- View audit information (who created/updated)

**Manager Role**
- View all users and their details
- Edit non-admin user information
- Cannot delete users
- Cannot create users
- Cannot assign admin roles
- Can activate/deactivate non-admin users

**User Role**
- View and edit own profile
- Cannot view other users
- Cannot change own role
- Cannot access admin features

### User Management Features
- ✅ Create users (Admin only)
- ✅ View paginated list of all users with search/filter
- ✅ View individual user details with audit info
- ✅ Edit user information
- ✅ Soft delete (deactivate) users
- ✅ Activate inactive users
- ✅ Filter by role and status
- ✅ Search by name and email

### Audit Tracking
- ✅ `createdAt` and `updatedAt` timestamps
- ✅ `createdBy` and `updatedBy` user tracking
- ✅ Last login timestamp
- ✅ User status tracking (active/inactive)

### Frontend Experience
- ✅ Clean, responsive UI with CSS styling
- ✅ Role-based navigation menus
- ✅ Authentication flow with login/register
- ✅ Dashboard with role-specific information
- ✅ Protected routes with proper redirects
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Token persistence with localStorage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/user-management-system
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_change_this
   REFRESH_TOKEN_EXPIRE=30d
   ADMIN_EMAIL=admin@purplemerit.com
   ADMIN_PASSWORD=Admin@123456
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   # or
   npm start
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`


## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user info (protected)

### User Routes (`/api/users`)
- `GET /` - Get all users with pagination (Admin/Manager only)
- `POST /` - Create new user (Admin only)
- `GET /profile` - Get own profile (protected)
- `PATCH /profile` - Update own profile (protected)
- `GET /:id` - Get user by ID (Admin/Manager only)
- `PUT /:id` - Update user (Admin only)
- `DELETE /:id` - Delete user (Admin only)
- `PATCH /:id/activate` - Activate user (Admin only)
- `PATCH /:id/deactivate` - Deactivate user (Admin only)

### Role Routes (`/api/roles`)
- `GET /` - Get all roles (protected)

## 🔑 Default Credentials

For testing purposes, the system creates a default admin user on startup:

```
Email: admin@purplemerit.com
Password: Admin@123456
Role: Admin
```

**Important**: Change these credentials in production!

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: ObjectId (ref: Role),
  status: String (enum: ['active', 'inactive']),
  isAdmin: Boolean,
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Role Collection
```javascript
{
  _id: ObjectId,
  name: String (enum: ['ADMIN', 'MANAGER', 'USER']),
  permissions: [String],
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Authentication Flow

1. **Registration**: User creates account with email and password
2. **Login**: User submits credentials
3. **Token Generation**: Server generates JWT access and refresh tokens
4. **API Requests**: Frontend includes access token in Authorization header
5. **Token Verification**: Middleware verifies and decodes token
6. **Authorization**: Route middleware checks user role and permissions
7. **Token Refresh**: On expiry, refresh token can be used for new access token
8. **Logout**: Frontend removes tokens and redirects to login
# PurpleMerit-Assignment

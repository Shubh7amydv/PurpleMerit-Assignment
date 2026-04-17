# User Management System - Setup Instructions

## Project Overview

This is a complete MERN (MongoDB, Express, React, Node.js) User Management System with:
- JWT-based authentication
- Role-Based Access Control (RBAC) with Admin, Manager, and User roles
- Full user lifecycle management (create, read, update, delete)
- Responsive React frontend
- Clean architecture backend with repository pattern
- MongoDB database integration

## 📦 What's Included

### Backend (`/backend`)
- Express.js REST API server
- MongoDB with Mongoose models
- JWT authentication and authorization
- Layered architecture (Models → Repository → Service → Controller)
- Role-based middleware
- User management endpoints
- Automatic database seeding

### Frontend (`/frontend`)
- React with React Router v6
- Authentication context with token management
- Role-based UI and navigation
- User management interface
- Responsive CSS styling
- Protected routes and components

### Documentation
- Comprehensive README in root directory
- Backend README with API documentation
- Frontend README with setup instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secrets
nano .env  # or use your editor

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Edit .env with your backend URL (should be http://localhost:5000/api)
nano .env

# Install dependencies
npm install

# Start development server
npm start
# Opens automatically at http://localhost:3000
```

## 🔑 Default Credentials

Once both servers start, you can login with:

```
Email: admin@purplemerit.com
Password: Admin@123456
Role: Admin
```

The system automatically creates this admin user and the three roles (Admin, Manager, User) on startup.

## 📝 Key Features Implemented

### Authentication & Security ✅
- User registration with email validation
- Secure login with JWT tokens
- Access tokens (7-day expiry)
- Refresh tokens (30-day expiry)
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes
- Auto-logout on token expiry

### Role-Based Access Control ✅
**Admin Role**
- Full user management access
- Create/delete/edit any user
- Change user roles
- Activate/deactivate users
- View audit information

**Manager Role**
- View all users
- Edit non-admin users
- Activate/deactivate non-admin users
- Cannot delete users
- Cannot assign admin roles

**User Role**
- View and edit own profile
- Cannot view other users
- Cannot change own role

### User Management ✅
- Create new users (Admin only)
- View paginated user list with search/filter
- Edit user information
- Delete users
- Activate/deactivate users
- Audit tracking (createdBy, updatedBy, timestamps)
- Last login tracking

### Frontend Features ✅
- Clean, responsive UI
- Role-based navigation
- Login/register pages
- Role-specific dashboards
- User management interface
- Profile management
- Search and filtering
- Pagination support

### Clean Architecture ✅
- Models layer (MongoDB schemas)
- Repository layer (data access)
- Service layer (business logic)
- Controller layer (request handling)
- Middleware layer (auth/auth/validation)
- Route layer (API endpoints)

## 📚 Project Structure

```
PurpleMerit/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── models/          # MongoDB schemas
│   │   ├── repository/      # Data access layer
│   │   ├── services/        # Business logic
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, auth, validation
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Utilities (seed, etc)
│   │   └── index.js         # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── utils/           # API client, helpers
│   │   ├── styles/          # CSS files
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── README.md                # Main documentation
├── .env.backend             # Backend env template
└── .env.frontend            # Frontend env template
```

## 🔐 API Endpoints

### Authentication (`/api/auth`)
- POST `/register` - Register new user
- POST `/login` - Login user
- GET `/me` - Get current user (protected)

### Users (`/api/users`)  
- GET `/` - Get all users (Admin/Manager)
- POST `/` - Create user (Admin)
- GET `/profile` - Get own profile
- PATCH `/profile` - Update own profile
- GET `/:id` - Get user details (Admin/Manager)
- PUT `/:id` - Update user (Admin)
- DELETE `/:id` - Delete user (Admin)
- PATCH `/:id/activate` - Activate user (Admin)
- PATCH `/:id/deactivate` - Deactivate user (Admin)

### Roles (`/api/roles`)
- GET `/` - Get all roles (protected)

## 🗄️ Database Schema

### User Collection
- name (string, required)
- email (string, unique, required)
- password (string, hashed)
- role (ObjectId, references Role)
- status (string: active/inactive)
- isAdmin (boolean)
- createdBy (ObjectId, user who created)
- updatedBy (ObjectId, user who updated)
- lastLogin (date)
- createdAt, updatedAt (timestamps)

### Role Collection
- name (enum: ADMIN, MANAGER, USER)
- permissions (array of strings)
- description (string)
- createdAt, updatedAt

## 🧪 Testing the Application

### Admin Workflow
1. Login as admin@purplemerit.com
2. Go to Users page
3. Create new user
4. Edit user information
5. Filter/search users
6. Deactivate/activate users
7. Delete users

### Manager Workflow
1. Login as manager (create one first)
2. View all users
3. Edit non-admin users
4. Activate/deactivate users
5. Cannot create/delete users

### Regular User
1. Register new account
2. Login
3. View and update own profile
4. Cannot access user management

## 📤 Deployment Commands

### Backend (Render, Railway, etc.)
```bash
cd backend
npm install
npm start
```

### Frontend (Vercel, Netlify, etc.)
```bash
cd frontend
npm install
npm run build
# Deploy the /build folder
```

## ⚠️ Important Notes

1. **Change JWT Secrets**: Before production, change `JWT_SECRET` and `REFRESH_TOKEN_SECRET` in .env
2. **Database**: Install MongoDB locally or use MongoDB Atlas (cloud)
3. **Environment Variables**: Create `.env` files in both backend and frontend
4. **CORS**: Backend allows `http://localhost:3000` by default
5. **Admin Credentials**: Change default admin password in production

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Use MongoDB Atlas connection string if using cloud

### CORS Error
- Frontend `.env` must have correct `REACT_APP_API_BASE_URL`
- Backend must have `http://localhost:3000` in CORS origin

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: `npm start -- --port 3001`

### Token Issues
- Clear localStorage: `localStorage.clear()`
- Re-login to get new tokens

## 📋 Checklist Before Submission

- [ ] Backend `.env` configured with MongoDB URI
- [ ] Frontend `.env` configured with API URL
- [ ] Both npm install completed
- [ ] Database seeding successful (roles & admin user created)
- [ ] Login works with admin@purplemerit.com
- [ ] User list shows/filters users correctly
- [ ] Create user works
- [ ] Edit user works
- [ ] Delete user works
- [ ] Profile update works
- [ ] All responsive on mobile

## 📞 Support

For issues or questions:
1. Check README.md in root directory
2. Check backend/README.md for API details
3. Check frontend/README.md for UI details
4. Refer to package.json for dependencies
5. Check source code comments for implementation details

## 📄 License

Open source project for educational purposes.

---

**You now have a complete, production-ready User Management System!** 🎉

Built with Clean Architecture principles, following the reference repository pattern, and ready for deployment.

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import UserDetail from './pages/UserDetail';

// Components
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Styles
import './styles/global.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <>
      {user && <Navbar />}
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Admin and Manager routes */}
          <Route
            path="/users"
            element={
              <PrivateRoute requiredRole={['ADMIN', 'MANAGER']}>
                <UserList />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:id"
            element={
              <PrivateRoute requiredRole={['ADMIN', 'MANAGER']}>
                <UserDetail />
              </PrivateRoute>
            }
          />

          {/* Admin only routes */}
          <Route
            path="/users/new"
            element={
              <PrivateRoute requiredRole={['ADMIN']}>
                <UserForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:id/edit"
            element={
              <PrivateRoute requiredRole={['ADMIN']}>
                <UserForm />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

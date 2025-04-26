import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Auth Context Provider
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />

              {/* Protected Routes - Any logged in user */}
              <Route 
                path="/posts/create" 
                element={
                  <PrivateRoute>
                    <CreatePostPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/posts/edit/:id" 
                element={
                  <PrivateRoute>
                    <EditPostPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />

              {/* Admin Only Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
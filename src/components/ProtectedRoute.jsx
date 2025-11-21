import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's role
    const roleRedirects = {
      buyer: '/dashboard',
      seller: '/store/dashboard',
      farmer: '/farm/dashboard'
    };

    return (
      <Navigate 
        to={roleRedirects[user.role] || '/dashboard'} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
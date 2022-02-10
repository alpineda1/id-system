import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { currentUser, currentUserRoles, loading } = useAuth();

  return loading ? (
    <LoadingComponent />
  ) : !currentUser ? (
    <Navigate to='/login' replace />
  ) : currentUserRoles.includes('admin') ? (
    children
  ) : (
    <Navigate to='/' replace />
  );
};

export default AdminRoute;

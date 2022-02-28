import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { currentUser, currentUserRoles, currentUserRolesLoading, loading } =
    useAuth();

  return loading ? (
    <LoadingComponent />
  ) : !currentUser ? (
    <Navigate to='/login' replace />
  ) : currentUserRolesLoading ? (
    <LoadingComponent />
  ) : currentUserRoles.includes('admin') ? (
    children
  ) : (
    <Navigate to='/' replace />
  );
};

export default AdminRoute;

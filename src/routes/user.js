import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const { currentUser, currentUserRoles, loading } = useAuth();

  return loading ? (
    <LoadingComponent />
  ) : !currentUser ? (
    <Navigate to='/login' replace />
  ) : currentUserRoles.includes('user') ? (
    children
  ) : (
    <Navigate to='/' replace />
  );
};

export default UserRoute;
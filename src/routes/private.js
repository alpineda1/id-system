import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  return loading ? (
    <LoadingComponent />
  ) : currentUser ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export default PrivateRoute;

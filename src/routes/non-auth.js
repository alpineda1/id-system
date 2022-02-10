import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const NonAuthRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  return loading ? (
    <LoadingComponent />
  ) : currentUser ? (
    <Navigate to='/' replace />
  ) : (
    children
  );
};

export default NonAuthRoute;

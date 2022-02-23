import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const HasIDRoute = ({ children }) => {
  const { currentUser, hasID, loading } = useAuth();

  return loading ? (
    <LoadingComponent />
  ) : !currentUser ? (
    <Navigate to='/login' replace />
  ) : !hasID ? (
    <Navigate to='/' replace />
  ) : (
    children
  );
};

export default HasIDRoute;

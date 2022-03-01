import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const HomeScreen = ({ children }) => {
  const { currentUser, currentUserRoles, currentUserRolesLoading, loading } =
    useAuth();

  return loading ? (
    <LoadingComponent />
  ) : !currentUser ? (
    <Navigate to='/login' replace />
  ) : currentUserRolesLoading ? (
    <LoadingComponent />
  ) : currentUserRoles.includes('admin') ? (
    <Navigate to='/history' replace />
  ) : currentUserRoles.includes('user') ? (
    <Navigate to='/form' replace />
  ) : (
    children
  );
};

export default HomeScreen;

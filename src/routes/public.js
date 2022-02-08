import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ element, path }) => {
  return <Route element={element} path={path} />;
};

export default PublicRoute;

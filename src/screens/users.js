import UserIDPreviewComponent from 'components/user-id-preview';
import UsersComponent from 'components/users';
import React from 'react';
import { useParams } from 'react-router-dom';

const UsersScreen = () => {
  const { uid, id } = useParams();

  return uid && id ? <UserIDPreviewComponent /> : <UsersComponent />;
};

export default UsersScreen;

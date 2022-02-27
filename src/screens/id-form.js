import IDFormComponent from 'components/id-form';
import IDListUserComponent from 'components/id-list-user';
import React from 'react';
import { useParams } from 'react-router-dom';

const IDFormScreen = () => {
  const { id } = useParams();

  return id ? <IDFormComponent /> : <IDListUserComponent />;
};

export default IDFormScreen;

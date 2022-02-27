import IDFormComponent from 'components/id-form';
import IDFormSelectComponent from 'components/id-form-select';
import React from 'react';
import { useParams } from 'react-router-dom';

const IDFormScreen = () => {
  const { id } = useParams();

  return id ? <IDFormComponent /> : <IDFormSelectComponent />;
};

export default IDFormScreen;

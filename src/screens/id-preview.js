import IDPreview from 'components/id-preview';
import IDPreviewSelectComponent from 'components/id-preview-select';
import React from 'react';
import { useParams } from 'react-router-dom';

const IDPreviewScreen = () => {
  const { id } = useParams();

  return id ? <IDPreview /> : <IDPreviewSelectComponent />;
};

export default IDPreviewScreen;

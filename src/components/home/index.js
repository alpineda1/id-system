import { Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      logout();
      navigate('/login');
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <div>Home</div>
      <div>
        <Button onClick={handleClick}>Logout</Button>
      </div>
    </div>
  );
};

export default HomeComponent;

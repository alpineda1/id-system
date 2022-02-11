import { Button } from '@mui/material';
import IdVerificationComponent from 'components/id-verification';
import { useAuth } from 'contexts/auth';
import { Fragment } from 'react';
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
    <Fragment>
      <IdVerificationComponent />
      <div>
        <Button onClick={handleClick}>Logout</Button>
      </div>
    </Fragment>
  );
};

export default HomeComponent;

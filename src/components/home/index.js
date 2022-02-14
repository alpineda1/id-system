import IdVerificationComponent from 'components/id-verification';
import { useAuth } from 'contexts/auth';
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

  return <IdVerificationComponent />;
};

export default HomeComponent;

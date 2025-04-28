import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove the auth token
    navigate('/login'); // redirect to login page
  };

  return (
    <button onClick={handleLogout} style={{ padding: '8px 16px', margin: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Logout
    </button>
  );
};

export default LogoutButton;

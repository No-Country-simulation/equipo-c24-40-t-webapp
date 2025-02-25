import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2>Welcome, {user.email}</h2>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
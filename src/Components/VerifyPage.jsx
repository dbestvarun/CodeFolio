// VerifyPage.jsx
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyPage = ({ handleLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify?token=${token}`);
        // Assuming the response contains the user's email
        const email = response.data.email; // Adjust based on your server response
        handleLogin(email); // Call handleLogin from App component
        navigate('/'); // Redirect to home after successful login
      } catch (error) {
        console.error('Token verification failed', error);
        // Handle verification failure (show an error message, redirect, etc.)
        alert('Token verification failed. Please try again.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      alert('No token found in the URL.');
    }
  }, [location.search, handleLogin, navigate]);

  return (
    <div>
      <h2>Verifying your token...</h2>
      {/* You can add a loading spinner here if desired */}
    </div>
  );
};

export default VerifyPage;

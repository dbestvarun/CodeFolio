import { useState } from 'react';
import axios from 'axios';
import '../style/LoginPage.css';

const LoginPage = ({ handleLogin }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const spans = Array.from({ length: 10000 }, (_, index) => index);

  const emailDomain = '@jcboseust.ac.in'; // Replace with your college's email domain

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${rollNumber}${emailDomain}`; // Construct the full email
    setLoading(true); // Start loading

    try {
      await axios.post('http://localhost:5000/api/send-magic-link', { email });
      alert('Check your email for the magic link.');
      // handleLogin(email);
      setError(null);
    } catch (error) {
      console.error('Error sending magic link', error);
      setError('Failed to send magic link. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section>
      {spans.map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="signin">
        <div className="content">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h2>Log In</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="inputBox">
              <input
                type="text" // Change input type to text for roll number
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)} // Update roll number state
                required
              />
              <i>Roll Number</i>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#">Signup</a>
            </div>

            <div className="inputBox">
              <input type="submit" value={loading ? "Sending..." : "Login"} disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

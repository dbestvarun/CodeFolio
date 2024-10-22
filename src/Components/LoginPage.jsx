import { useState } from 'react';
import '../style/LoginPage.css';

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const spans = Array.from({ length: 10000 }, (_, index) => index);

  const sendMagicLink = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Magic link sent! Check your email to log in.');
        setError('');
      } else {
        throw new Error('Failed to send magic link');
      }
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <section>
      {spans.map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="signin">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="content">
          <h2>Log In</h2>

          <div className="form">
            <div className="inputBox">
              {/* Add onChange to update the email state */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state here
                required
              />
              <i>Roll Number</i>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#">Signup</a>
            </div>

            <div className="inputBox">
              <input type="submit" value="Login" onClick={sendMagicLink} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

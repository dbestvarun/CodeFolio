import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = process.env.JWT_SECRET_KEY; // Secure key from .env

// Dummy in-memory database (use a real database in production)
const users = [];

// Endpoint to send the magic link
app.post('/api/send-magic-link', async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, secretKey, { expiresIn: '15m' });

  const magicLink = `http://localhost:5173/verify?token=${token}`;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Magic Link',
    text: `Click on this link to log in: ${magicLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Magic link sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending magic link');
  }
});

// Endpoint to verify the token
app.get('/api/verify', (req, res) => {
  const { token } = req.query;

  try {
    const { email } = jwt.verify(token, secretKey);
    let user = users.find((u) => u.email === email);
    if (!user) {
      user = { email };
      users.push(user);
    }
    res.status(200).send('User logged in successfully');
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).send('Invalid or expired token');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

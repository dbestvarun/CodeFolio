import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/user.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

const secretKey = process.env.JWT_SECRET_KEY;

app.post("/api/send-magic-link", async (req, res) => {
  const { email, roll_number } = req.body;
  if (!email || !roll_number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      roll_number,
    });
    await newUser.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

  const token = jwt.sign({ email, rollNumber }, secretKey, {
    expiresIn: "24h",
  });

  const magicLink = `http://localhost:5173/verify?token=${token}`;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Magic Link",
    text: `Click on this link to log in: ${magicLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      token: token,
      messsage: "success",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending magic link");
  }
});

// Endpoint to verify the token
app.get("/api/verify", (req, res) => {
  const { token } = req.query;

  try {
    const { email } = jwt.verify(token, secretKey);
    let user = users.find((u) => u.email === email);
    if (!user) {
      user = { email };
      users.push(user);
    }
    res.status(200).send("User logged in successfully");
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).send("Invalid or expired token");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

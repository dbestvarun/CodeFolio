import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/user.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectMongoDB from "./helpers/connection.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectMongoDB(process.env.mongoDbUrl).then(() =>
  console.log("MongoDB connected successfully!!!!!")
);

const secretKey = process.env.JWT_SECRET_KEY;
let users = [];
app.post("/api/send-magic-link", async (req, res) => {
  const { email, rollNumber } = req.body;

  // if (!email || !rollNumber) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  // try {
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  //   const newUser = await User.create({
  //     email: email,
  //     roll_number: rollNumber,
  //   });
  //   console.log(newUser)
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Server error" });
  // }

  const token = jwt.sign({ email, rollNumber }, secretKey, {
    expiresIn: "24h",
  });
  console.log(token);
  const magicLink = `http://localhost:5173/verify?token=${token}`;

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
app.post("/api/signup", async (req, res) => {
  const { email, rollNumber } = req.body;

  if (!email || !rollNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email: email,
        roll_number: rollNumber,
      });
      console.log("New user created:", user);
    } else {
      console.log("Existing user found:", user);
    }

    // Respond with the existing or newly created user
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/verify", (req, res) => {
  const { token } = req.query;

  try {
    const { email, rollNumber } = jwt.verify(token, secretKey);
    console.log(email);
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

app.post("/api/profile", async (req, res) => {
  console.log(req.body);
  const { email, codeforces, leetcode, codechef, geeksforgeeks } = req.body;
  console.log(email);
  console.log(codechef);
  console.log(codeforces);
  console.log(leetcode);
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (codeforces !== undefined) user.codeforces = codeforces;
    if (leetcode !== undefined) user.leetcode = leetcode;
    if (codechef !== undefined) user.codechef = codechef;
    if (geeksforgeeks !== undefined) user.geeksforgeeks = geeksforgeeks;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        codechef: user.codechef,
        codeforces: user.codeforces,
        leetcode: user.leetcode,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/profile/ratings", async (req, res) => {
  console.log(req.body);
  const { email, codeforces, leetcode,questions } = req.body;
  console.log(email);
  console.log(codeforces);
  console.log(leetcode);
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (questions !== undefined) user.total_questions = questions;
    if (leetcode !== undefined) user.lc_rating = leetcode;
    if (codeforces !== undefined) user.cf_rating = codeforces;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        codechef: user.codechef,
        codeforces: user.codeforces,
        leetcode: user.leetcode,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/profile/delete", async (req, res) => {
  console.log(req.body);
  const { email, platform } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (platform === "codeforces") user.codeforces = "";
    if (platform === "codechef") user.codechef = "";
    if (platform === "leetcode") user.leetcode = "";
    if (platform === "geeksforgeeks") user.geeksforgeeks = "";
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/profile/info", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        codechef: user.codechef,
        codeforces: user.codeforces,
        leetcode: user.leetcode,
        geeksforgeeks: user.geeksforgeeks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

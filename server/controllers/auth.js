import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

const api_key = process.env.SENDGRID_API_KEY;
console.log(api_key);

sgMail.setApiKey(api_key);

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    // Send custom email after successful registration
    const message = {
      to: email, // Send to the email of the new registered user
      from: {
        name: "Cyber Forge",
        email: "cyberforge1@cyberforge1.net",
      },
      subject: "Welcome to Cyber Forge",
      html: `
          <h1>Hello ${firstName} ${lastName},</h1>
          <p>Welcome to Cyber Forge! We are excited to have you on board.</p>
          <p>Thank you for joining our community. We hope you have a great experience here.</p>
          <p>Best regards,</p>
          <p>The Cyber Forge Team</p>
        `,
    };

    sgMail
      .send(message)
      .then(() => console.log("Email sent..."))
      .catch((error) => console.log(error.message));

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

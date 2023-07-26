import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sgMail from "@sendgrid/mail";

const api_key =
  "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";

sgMail.setApiKey(api_key);

console.log(api_key);

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

    // Send email after successful registration
    const message = {
      to: email, // Send to the email of the new registered user
      from: {
        name: "Cyber Forge",
        email: "cyberforge1@cyberforge1.net",
      },
      subject: "Hello from Cyber Forge",
      text: "Hello from Cyber Forge",
      html: "<h1>Welcome to Cyber Forge</h1>",
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

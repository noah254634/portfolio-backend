import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';
import { getTestimonial } from './testimonialController.js';
export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'

      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = generateToken(res, user);
    return res
      .status(201)
      .json({ message: 'User created successfully', token });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ error: err.message });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if(email !== "noahkhaemba290@gmail.com") {
      return res.status(400).json({ error: 'Buda wee si Admin' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email,create an account' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = generateToken(res, user);
    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
export const logoutController = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      return res.status(200).json({ message: 'Logout successful' });
    });
  } catch (err) {
    console.error('Error during logout:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

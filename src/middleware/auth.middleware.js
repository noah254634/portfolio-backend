import jwt from 'jsonwebtoken';
import ENV from '../utils/env.js';
import User from '../models/User.js';
import { token } from 'morgan';
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, ENV().jwt_secret);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;

    next();
  } catch (err) {
    console.error('Error in protectRoute middleware:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

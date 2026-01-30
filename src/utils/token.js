// src/utils/generateToken.js
import jwt from "jsonwebtoken";
import ENV from "./env.js";


export const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    ENV().jwt_secret,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,        // JS cannot access it
    secure: ENV().node_env, // only sent over HTTPS in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

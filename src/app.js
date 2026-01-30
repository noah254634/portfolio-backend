import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
import profileRoutes from "./routes/profile.js";
import projectRoutes from "./routes/projects.js";
import timelineRoutes from "./routes/timeLine.js";
import skillRoutes from "./routes/skills.js";
import socialRoutes from "./routes/socialLinks.js";
import authRoutes from "./routes/auth.js";
import eduRoutes from "./routes/education.js";
import testimonialRoutes from "./routes/testimonial.js";
import heartRoutes from "./routes/heart.js";
import morgan from "morgan";
import { arcjetProtectRoute } from "./middleware/arcjet.middleware.js";
import { upload } from "./middleware/upload.js";
import multer from "multer";

const app = express();
app.use(morgan("dev"));
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Must match your frontend URL exactly (no trailing slash)
  credentials: true,               // ✅ Required because the frontend sends cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
/*app.use(arcjetProtectRoute);*/

app.use("/api/v1/profile",upload.fields([
    {name:"image",maxCount:1},
    {name:"resume",maxCount:1}
]), protectRoute, profileRoutes);
app.use("/api/v1/heartbeat",protectRoute, heartRoutes);
app.use("/api/v1/projects", protectRoute, projectRoutes);
app.use("/api/v1/timeline", protectRoute, timelineRoutes);
app.use("/api/v1/skills", protectRoute, skillRoutes);
app.use("/api/v1/social", protectRoute, socialRoutes);
app.use("/api/v1/education", protectRoute, eduRoutes);
app.use("/api/v1/testimonials", protectRoute, testimonialRoutes);
app.use("/api/v1/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message, field: err.field });
  }
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

export default app;

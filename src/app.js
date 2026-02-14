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
import publicRoutes from "./routes/public.js";
import testimonialRoutes from "./routes/testimonial.js";
import heartRoutes from "./routes/heart.js";
import morgan from "morgan";
import { arcjetProtectRoute } from "./middleware/arcjet.middleware.js";
import { upload } from "./middleware/upload.js";
import multer from "multer";

const app = express();
app.use(morgan("dev"));
const allowedOrigins = [     
  "http://localhost:5173",         
  'https://admin-frontend-portfolio-delta.vercel.app',
  'https://admin-frontend-portfolio.vercel.app' ,
  'https://noahs-personal-portfolio.vercel.app',
  'https://noahs-personal-portfolio.vercel.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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
app.use("/api/v1/heartbeat", heartRoutes);
app.use("/api/v1/projects", protectRoute, projectRoutes);
app.use("/api/v1/timeline", protectRoute, timelineRoutes);
app.use("/api/v1/skills", protectRoute, skillRoutes);
app.use("/api/v1/social", protectRoute, socialRoutes);
app.use("/api/v1/education", protectRoute, eduRoutes);
app.use("/api/v1/testimonials", protectRoute, testimonialRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/public", publicRoutes);

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

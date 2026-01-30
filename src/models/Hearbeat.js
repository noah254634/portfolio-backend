// models/Heartbeat.js
import mongoose from "mongoose";

const heartbeatSchema = new mongoose.Schema(
  {
    ping: { 
        type: String, 
        default: "alive" 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Heartbeat", heartbeatSchema);

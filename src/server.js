// src/server.js
import app from "./app.js";
import ENV from "./utils/env.js";
import connectDB from "./utils/db.js";
const p=ENV().port;

app.listen(p, () => {
  console.log(`Server running on port http://localhost:${p}`);
    connectDB();
});

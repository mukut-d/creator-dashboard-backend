const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const savedRoutes = require("./routes/savedRoutes");
const activityRoutes = require("./routes/activityRoutes");
const creditRoutes = require("./routes/creditRoutes");

require("dotenv").config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://creator-dashboard-frontend.web.app",
    "https://creator-dashboard-frontend.firebaseapp.com",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", savedRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/credits", creditRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

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
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

app.use("/api/auth", authRoutes);
app.use("/api/posts", savedRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/credits", creditRoutes);

connectDB();

const listRoutes = (app, baseUrl) => {
  console.log("📂 Available Routes:");

  // console.log(JSON.stringify(app._router, null, 2));
  // console.log("base url " + baseurl);

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Regular routes
      const method = Object.keys(middleware.route.methods)
        .join(", ")
        .toUpperCase();
      console.log(`${method} ${baseUrl}${middleware.route.path}`);
    } else if (middleware.name === "router") {
      // Nested router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const method = Object.keys(handler.route.methods)
            .join(", ")
            .toUpperCase();
          console.log(`${method} ${baseUrl}${handler.route.path}`);
        }
      });
    }
  });
};
const PORT = process.env.PORT || 8080;
const baseurl = `http://localhost:${PORT}`;

console.log("port " + PORT);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
  // listRoutes(app, baseurl);
});

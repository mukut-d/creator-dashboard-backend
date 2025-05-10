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

app.options("/api/auth/login", cors(corsOptions));
// Apply CORS middleware
app.use(cors(corsOptions));

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

// const listRoutes = (app, baseUrl) => {
//   console.log("📂 Available Routes:");

//   // console.log(JSON.stringify(app._router, null, 2));
//   // console.log("base url " + baseurl);

//   app._router?.stack.forEach((middleware) => {
//     if (middleware.route) {
//       // Regular routes
//       const method = Object.keys(middleware.route.methods)
//         .join(", ")
//         .toUpperCase();
//       console.log(`${method} ${baseUrl}${middleware.route.path}`);
//     } else if (middleware.name === "router") {
//       // Nested router middleware
//       middleware.handle.stack.forEach((handler) => {
//         if (handler.route) {
//           const method = Object.keys(handler.route.methods)
//             .join(", ")
//             .toUpperCase();
//           console.log(`${method} ${baseUrl}${handler.route.path}`);
//         }
//       });
//     }
//   });
// };
// const PORT = process.env.PORT || 8080;
// const baseurl = `http://localhost:${PORT}`;

// console.log("port " + PORT);

// app.listen(PORT, () => {
//   console.log(`Server running at ${PORT}`);
//   listRoutes(app, baseurl);
// });

// Enhanced Route Logger function
const listRoutes = (app, baseUrl) => {
  console.log("\n📂 Available Routes:");

  if (!app._router || !app._router.stack) {
    console.log("No routes found or Express router not initialized.");
    return;
  }

  const extractRoutes = (stack, basePath = "") => {
    const routes = [];

    stack.forEach((layer) => {
      if (layer.route) {
        // It's a route
        const path = basePath + (layer.route.path || "");
        const methods = Object.keys(layer.route.methods)
          .filter((method) => layer.route.methods[method])
          .map((method) => method.toUpperCase())
          .join(", ");

        routes.push({ path, methods });
      } else if (
        layer.name === "router" &&
        layer.handle &&
        layer.handle.stack
      ) {
        // It's a router middleware
        const path = layer.regexp.toString().includes("^\\/")
          ? basePath +
            layer.regexp.toString().split("^\\/")[1].split("\\/?")[0] +
            "/"
          : basePath;

        // Recursively extract routes from the nested router
        routes.push(...extractRoutes(layer.handle.stack, path));
      }
    });

    return routes;
  };

  const routes = extractRoutes(app._router.stack);

  if (routes.length === 0) {
    console.log("No routes found.");
    return;
  }

  // Sort routes for better readability
  routes.sort((a, b) => a.path.localeCompare(b.path));

  // Print routes in a formatted table
  console.log("┌─────────────┬────────────────────────────────────────────┐");
  console.log("│ METHOD      │ URL                                        │");
  console.log("├─────────────┼────────────────────────────────────────────┤");

  routes.forEach((route) => {
    const method = route.methods.padEnd(10);
    const fullUrl = `${baseUrl}${route.path}`;
    console.log(`│ ${method} │ ${fullUrl.padEnd(42)} │`);
  });

  console.log("└─────────────┴────────────────────────────────────────────┘");
  console.log(`Total routes: ${routes.length}\n`);
};

// Usage in your server file:
const PORT = process.env.PORT || 8080;
const baseUrl = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  listRoutes(app, baseUrl);
});

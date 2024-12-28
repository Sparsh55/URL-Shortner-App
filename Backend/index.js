import "./env.js";
import exrpess from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDBUsingMoongoose from "./src/config/moongose.db.js";
import rateLimit from "express-rate-limit";
import logger from "./logger.js";
import moongose from "mongoose";
import Authrouter from "./src/routes/authRoutes.js";
import URLrouter from "./src/routes/urlRoutes.js";
import swaggerDocsMiddleware from "./swagger.js";
import cookieParser from "cookie-parser";

export const app = exrpess();

moongose.set("strictQuery", false);

//cors policy
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5600",
  "https://url-shortner-app-rbyi.onrender.com",
  "https://delightful-caramel-2610ae.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

//swagger
swaggerDocsMiddleware(app);

// Apply rate limiting to prevent abuse of the shorten endpoint
const limitter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit to 5 requests per minute
  message: "Too many requests, please try again later.",
});

app.use("/api/shorten", limitter);

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  res.header("Access-Control-Allow-Origin", "http://localhost:5600");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/api/auth", Authrouter);
app.use("/api/url", URLrouter);

// Default route
app.get("/", (req, res) => {
  res.send("<a href= 'http://localhost:5600/api/auth/google'>googleLogin</a>");
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send("Something went wrong!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5600");
  connectDBUsingMoongoose();
});

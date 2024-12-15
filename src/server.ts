import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to your Express server.");
});

// Port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

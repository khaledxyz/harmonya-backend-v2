import express, { Request, Response } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { i18n } from "./middlewares/i18n.middleware";
import { router } from "./routes";
import { setupSwagger } from "./utils/swagger";
import { rateLimiter } from "./middlewares/rate-limiter.middleware";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

// Middlewares setup
app.use(express.json());
app.use(rateLimiter());
app.use(morganMiddleware);
app.use(i18n);

// Setup Swagger for API documentation
setupSwagger(app);

// Register routes
app.use("/", router);

// Server configuration
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`
  ${chalk.green("Harmonya API v2 is running 🚀")}
  - Local:        ${chalk.blue(`http://localhost:${PORT}`)}
  - Environment:  ${chalk.blue(process.env.NODE_ENV || "development")}
  - Docs:         ${chalk.blue(`http://localhost:${PORT}/docs`)}
  `);
});

// Graceful shutdown
const shutdown = () => {
  console.log(chalk.yellow("\nShutting down gracefully..."));
  server.close(() => {
    console.log(chalk.green("Server closed. Goodbye!"));
    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

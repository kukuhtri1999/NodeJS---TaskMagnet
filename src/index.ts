import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerOptions"; // Make sure to adjust the path based on your project structure
import authRouter from "./routes/user"; // Import your authentication routes

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use your authentication routes
app.use("/api/auth", authRouter);

// Start the Express server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerOptions";
import authRouter from "./routes/auth";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the base path for API routes first
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Use your authentication routes
apiRouter.use("/auth", authRouter);

// Other routes or middleware can be added here

// Start the Express server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

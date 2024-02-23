import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerOptions";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import tasksRouter from "./routes/task";
import projectRouter from "./routes/project";
import LabelRouter from "./routes/label";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Set the base path for API routes first
const apiRouter = express.Router();
app.use("/api", apiRouter);

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", tasksRouter);
app.use("/api/label", LabelRouter); // Catch all route to get label by name

// Use your authentication routes
app.use("/api/user", userRouter);
apiRouter.use("/auth", authRouter);

// Other routes or middleware can be added here

// Start the Express server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

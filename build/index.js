"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = __importDefault(require("./swagger/swaggerOptions")); // Make sure to adjust the path based on your project structure
const auth_1 = __importDefault(require("./routes/auth")); // Import your authentication routes
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions_1.default));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Set the base path for API routes
const apiRouter = express_1.default.Router();
app.use("/api", apiRouter);
// Use your authentication routes
app.use("/api/auth", auth_1.default);
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
// Start the Express server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

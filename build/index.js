"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = __importDefault(require("./swaggerOptions")); // Make sure to adjust the path based on your project structure
const user_1 = __importDefault(require("./routes/user")); // Import your authentication routes
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions_1.default));
// Use your authentication routes
app.use("/api/auth", user_1.default);
// Start the Express server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

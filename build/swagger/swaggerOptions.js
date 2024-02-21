"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "TaskMagnet API",
        version: "1.0.0",
        description: "This is a simple Task Manager API",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
};
const options = {
    swaggerDefinition,
    // Specify the paths to your route files directly
    apis: [
        path_1.default.resolve(__dirname, "../routes/*.ts"), // Adjust the path accordingly
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;

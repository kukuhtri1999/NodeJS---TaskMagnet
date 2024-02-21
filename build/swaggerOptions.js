"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
    // Paths to files containing OpenAPI definitions
    apis: ["routes/*.ts"], // Adjust this to point to your API routes
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;

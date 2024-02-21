import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TaskMagnet API",
    version: "1.0.0",
    description: "This is a simple Task Manager API",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  // Specify the paths to your route files directly
  apis: [
    path.resolve(__dirname, "../routes/*.ts"), // Adjust the path accordingly
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

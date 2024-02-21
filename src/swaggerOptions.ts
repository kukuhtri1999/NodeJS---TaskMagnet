import swaggerJSDoc from "swagger-jsdoc";

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

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["/routes/*.ts"], // Adjust this to point to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

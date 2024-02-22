import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TaskMagnet API - by Kukuh Tri W N",
    version: "1.0.0",
    description:
      "Effortlessly organize and manage tasks with TaskMagnet, a robust web application. Featuring user authentication, task CRUD operations, and project management, this Node.js project uses Express.js, TypeScript, Prisma, and PostgreSQL. I put JWT in this  project for learning purpose and to make this API process more understandable for everyone because i dont have a plan to create a front end for this (yet). For real project, JWT should be handled by Front End. <b>Important note : Some endpoints might need JWT Token authentications , you need to do login first. if you dont have account yet , feel free to register a new one here  </b>",
  },
  externalDocs: {
    url: "https://github.com/kukuhtri1999/NodeJS---TaskMagnet",
    description: "Find more info on GitHub",
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

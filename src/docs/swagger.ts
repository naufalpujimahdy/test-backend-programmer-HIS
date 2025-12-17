import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const appUrl = process.env.APP_URL || "http://localhost:3000";

const apis =
  process.env.NODE_ENV === "production"
    ? [path.resolve(process.cwd(), "dist/routes/*.js")]
    : [path.resolve(process.cwd(), "src/routes/*.ts")];

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Test Backend Programmer HIS - Naufal Puji Mahdy",
      version: "1.0.0",
      description: "Documentation for Take Home Test API",
    },
    servers: [
      {
        url: appUrl,
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Development Server",
      },
    ],
    tags: [
      {
        name: "1. Module Membership",
      },
      { name: "2. Module Information" },
      {
        name: "3. Module Transaction",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis,
});

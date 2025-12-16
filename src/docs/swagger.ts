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
        description: "Registration, Login, Profile",
      },
      { name: "2. Module Information", description: "Banner & Services" },
      {
        name: "3. Module Transaction",
        description: "Balance, Topup, Transaction, History",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 0 },
            message: { type: "string", example: "Sukses" },
            data: { nullable: true },
          },
          required: ["status", "message", "data"],
        },
      },
    },
  },
  apis,
});

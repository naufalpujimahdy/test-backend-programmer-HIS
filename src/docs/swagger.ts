import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Test Backend Programmer HIS - Naufal Puji Mahdy",
      version: "1.0.0",
      description: "Express JS",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
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
  apis: ["src/routes/*.ts"],
});

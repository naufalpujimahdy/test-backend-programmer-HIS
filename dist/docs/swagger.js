"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const health_routes_1 = require("./routes/health.routes");
exports.app = (0, express_1.default)();
exports.app.set("trust proxy", 1);
// middlewares
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, morgan_1.default)("dev"));
exports.app.get("/", (_req, res) => {
    res.status(200).json({
        status: 0,
        message: "Test Programmer Backend is Running",
        data: {
            docs: "/docs",
            health: "/health",
        },
    });
});
exports.app.use(health_routes_1.healthRouter);
exports.app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
exports.app.get("/docs.json", (_req, res) => res.json(swagger_1.swaggerSpec));
// 404 handler
exports.app.use((_req, res) => {
    res.status(404).json({
        status: 404,
        message: "Not Found",
        data: null,
    });
});
// error handler
exports.app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
    });
});

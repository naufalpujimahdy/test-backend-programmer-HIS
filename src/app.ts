import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { healthRouter } from "./routes/health";
import { profileRouter } from "./routes/profile";
import { dbRouter } from "./routes/db";

export const app = express();

app.set("trust proxy", 1);

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    status: 0,
    message: "Test Programmer Backend is Running",
    data: {
      docs: "/docs",
      health: "/health",
    },
  });
});
app.use(healthRouter);
app.use(dbRouter);
app.use(profileRouter);

app.use(
  "/docs",
  swaggerUi.serveFiles(swaggerSpec),
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);
app.get("/docs.json", (_req, res) => res.json(swaggerSpec));

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
    data: null,
  });
});

// error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    data: null,
  });
});

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { healthRouter } from "./routes/health";
import { profileRouter } from "./routes/profile";
import { dbRouter } from "./routes/db";
import { membershipRouter } from "./routes/membership";

export const app = express();

app.set("trust proxy", 1);

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helmet
app.use(helmet());

// cors
const allowedOrigins = [
  "https://api-doc.naufalpujimahdy.id",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight
app.options(/.*/, cors());

// logger
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    status: 0,
    message: "Test Programmer Backend is Running",
    data: { docs: "/docs", health: "/health" },
  });
});

// routes
app.use(healthRouter);
app.use(dbRouter);
app.use(profileRouter);
app.use(membershipRouter);

// swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true },
  })
);

app.get("/docs.json", (_req, res) => res.json(swaggerSpec));

// 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Not Found", data: null });
});

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err?.message || err);
  res.status(500).json({
    status: 500,
    message: err?.message || "Internal Server Error",
    data: null,
  });
});

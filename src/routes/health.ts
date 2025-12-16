import { Router } from "express";

export const healthRouter = Router();

// /**
//  * @openapi
//  * /health:
//  *   get:
//  *     tags: [System]
//  *     summary: Health check
//  *     responses:
//  *       200:
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status: { type: integer, example: 0 }
//  *                 message: { type: string, example: "OK" }
//  *                 data: { nullable: true, example: null }
//  */
healthRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: 0, message: "OK", data: null });
});

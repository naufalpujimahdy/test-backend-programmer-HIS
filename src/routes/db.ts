import { Router } from "express";
import { query } from "../db/pool";

export const dbRouter = Router();

// /**
//  * @openapi
//  * /db/ping:
//  *   get:
//  *     tags: [System]
//  *     summary: Ping database
//  *     responses:
//  *       200:
//  *         description: DB OK
//  */
dbRouter.get("/db/ping", async (_req, res) => {
  const r = await query<{ now: string }>("SELECT NOW() as now");
  res.json({ status: 0, message: "DB OK", data: { now: r.rows[0].now } });
});

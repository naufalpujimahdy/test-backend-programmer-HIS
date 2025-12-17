import { Router } from "express";
import { authJwt } from "../middlewares/authJwt";
import { list } from "../controllers/service.controller";

export const serviceRouter = Router();

/**
 * @openapi
 * /services:
 *   get:
 *     tags: [2. Module Information]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 0 }
 *                 message: { type: string, example: Sukses }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code: { type: string, example: PULSA }
 *                       service_name: { type: string, example: Pulsa }
 *                       service_icon: { type: string, example: https://naufalpujimahdy.id/dummy.jpg }
 *                       service_tariff: { type: integer, example: 40000 }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 108 }
 *                 message: { type: string, example: Token tidak tidak valid atau kadaluwarsa }
 *                 data: { nullable: true, example: null }
 */
serviceRouter.get("/services", authJwt, list);

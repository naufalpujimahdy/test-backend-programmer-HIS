import { Router } from "express";
import { authJwt } from "../middlewares/authJwt";
import { balanceUser } from "../controllers/balance.controller";

export const transactionRouter = Router();

/**
 * @openapi
 * /balance:
 *   get:
 *     tags: [3. Module Transaction]
 *     summary: API Balance Private
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Balance / Saldo Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 0 }
 *                 message: { type: string, example: Get Balance Berhasil }
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance: { type: integer, example: 1000000 }
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
transactionRouter.get("/balance", authJwt, balanceUser);

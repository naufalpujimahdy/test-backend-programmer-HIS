import { Router } from "express";
import { authJwt } from "../middlewares/authJwt";
import { balanceUser } from "../controllers/balance.controller";
import { topup } from "../controllers/topup.controller";

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

/**
 * @openapi
 * /topup:
 *   post:
 *     tags: [3. Module Transaction]
 *     summary: API Topup Private
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [top_up_amount]
 *             properties:
 *               top_up_amount:
 *                 type: integer
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 0 }
 *                 message: { type: string, example: Top Up Balance berhasil }
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance: { type: integer, example: 2000000 }
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 102 }
 *                 message: { type: string, example: Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0 }
 *                 data: { nullable: true, example: null }
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
transactionRouter.post("/topup", authJwt, topup);

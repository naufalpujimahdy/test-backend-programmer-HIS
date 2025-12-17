import { Router } from "express";
import { authJwt } from "../middlewares/authJwt";
import { balanceUser } from "../controllers/balance.controller";
import { topup } from "../controllers/topup.controller";
import { transaction } from "../controllers/payment.controller";
import { history } from "../controllers/history.controller";

export const transactionRouter = Router();

/**
 * @openapi
 * /balance:
 *   get:
 *     tags: [3. Module Transaction]
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
 *                 message: { type: string, example: Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0 }
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

/**
 * @openapi
 * /transaction:
 *   post:
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [service_code]
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PULSA
 *     responses:
 *       200:
 *         description: Transaksi Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 0 }
 *                 message: { type: string, example: Transaksi berhasil }
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number: { type: string, example: INV17082023-001 }
 *                     service_code: { type: string, example: PLN_PRABAYAR }
 *                     service_name: { type: string, example: PLN Prabayar }
 *                     transaction_type: { type: string, example: PAYMENT }
 *                     total_amount: { type: integer, example: 10000 }
 *                     created_on: { type: string, example: 2023-08-17T10:10:10.000Z }
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 102 }
 *                 message: { type: string, example: Service atau Layanan tidak ditemukan }
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
transactionRouter.post("/transaction", authJwt, transaction);

/**
 * @openapi
 * /transaction/history:
 *   get:
 *     tags: [3. Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema: { type: integer, example: 0 }
 *         required: false
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 3 }
 *         required: false
 *     responses:
 *       200:
 *         description: Get History Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 0 }
 *                 message: { type: string, example: Get History Berhasil }
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset: { type: integer, example: 0 }
 *                     limit: { type: integer, nullable: true, example: 3 }
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number: { type: string, example: INV17082023-001 }
 *                           transaction_type: { type: string, example: TOPUP }
 *                           description: { type: string, example: Top Up balance }
 *                           total_amount: { type: integer, example: 100000 }
 *                           created_on: { type: string, example: 2023-08-17T10:10:10.000Z }
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
transactionRouter.get("/transaction/history", authJwt, history);

import { Router } from "express";
import { registration } from "../controllers/membership.controller";

export const membershipRouter = Router();

/**
 * @openapi
 * /registration:
 *   post:
 *     tags: [1. Module Membership]
 *     summary: API Registration Public
 *     description: Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, first_name, last_name, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@nutech-integrasi.com
 *               first_name:
 *                 type: string
 *                 example: User
 *               last_name:
 *                 type: string
 *                 example: Nutech
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: abcdef1234
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Registrasi berhasil silahkan login
 *                 data:
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Paramter email tidak sesuai format
 *                 data:
 *                   nullable: true
 *                   example: null
 */
membershipRouter.post("/registration", registration);

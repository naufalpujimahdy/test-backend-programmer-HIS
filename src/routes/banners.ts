import { Router } from "express";
import { list } from "../controllers/banner.controller";

export const bannerRouter = Router();

/**
 * @openapi
 * /banner:
 *   get:
 *     tags: [2. Module Information]
 *     summary: API Banner Public
 *     description: Digunakan untuk mendapatkan list banner
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
 *                       banner_name: { type: string, example: Banner 1 }
 *                       banner_image: { type: string, example: https://nutech-integrasi.app/dummy.jpg }
 *                       description: { type: string, example: Lerem Ipsum Dolor sit amet }
 */
bannerRouter.get("/banner", list);

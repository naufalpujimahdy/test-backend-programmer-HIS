import { Request, Response } from "express";
import { pay } from "../services/payment.service";

export async function transaction(req: Request, res: Response) {
  const data = await pay(req.userEmail, req.body ?? {});
  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Transaksi berhasil",
    data: data.data,
  });
}

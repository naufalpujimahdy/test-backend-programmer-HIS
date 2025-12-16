import { Request, Response } from "express";
import { getBalance } from "../services/balance.service";

export async function balanceUser(req: Request, res: Response) {
  const data = await getBalance(req.userEmail);
  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Get Balance Berhasil",
    data: data.data,
  });
}

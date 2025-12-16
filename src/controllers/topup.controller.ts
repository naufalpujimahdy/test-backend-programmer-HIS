import { Request, Response } from "express";
import { topupBalance } from "../services/topup.service";

export async function topup(req: Request, res: Response) {
  const data = await topupBalance(req.userEmail, req.body ?? {});
  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Top Up Balance berhasi",
    data: data.data,
  });
}

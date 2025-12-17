import { Request, Response } from "express";
import { getTransactionHistory } from "../services/history.service";

export async function history(req: Request, res: Response) {
  const data = await getTransactionHistory(req.userEmail, {
    offset: req.query.offset,
    limit: req.query.limit,
  });
  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  res.status(200).json({
    status: 0,
    message: "Get History Berhasil",
    data: data.data,
  });
}

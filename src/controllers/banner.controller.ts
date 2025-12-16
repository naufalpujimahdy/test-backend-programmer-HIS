import { Request, Response } from "express";
import { listBanner } from "../services/banner.service";

export async function list(_req: Request, res: Response) {
  const data = await listBanner();
  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Sukses",
    data: data.data,
  });
}

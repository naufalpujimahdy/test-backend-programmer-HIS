import { Request, Response } from "express";
import { listService } from "../services/service.service";

export async function list(req: Request, res: Response) {
  const data = await listService(req.userEmail);
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

import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/membership.service";

export async function registration(req: Request, res: Response) {
  const data = await registerUser(req.body ?? {});

  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Registrasi berhasil silahkan login",
    data: null,
  });
}

export async function login(req: Request, res: Response) {
  const data = await loginUser(req.body ?? {});

  if (!data.ok) {
    return res
      .status(data.httpStatus)
      .json({ status: data.status, message: data.message, data: null });
  }

  return res
    .status(200)
    .json({ status: 0, message: "Login Sukses", data: data.data });
}

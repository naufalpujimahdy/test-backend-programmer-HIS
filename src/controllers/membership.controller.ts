import { Request, Response } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfileName,
} from "../services/membership.service";

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

export async function profile(req: Request, res: Response) {
  const data = await getProfile(req.userEmail);

  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    staus: 0,
    message: "Sukses",
    data: data.data,
  });
}

export async function updateProfile(req: Request, res: Response) {
  const data = await updateProfileName(req.userEmail, req.body ?? {});

  if (!data.ok) {
    return res.status(data.httpStatus).json({
      status: data.status,
      message: data.message,
      data: null,
    });
  }

  return res.status(200).json({
    status: 0,
    message: "Update Profile berhasil",
    data: data.data,
  });
}

import { Response } from "express";

export function ok(res: Response, message: String, data: any = null) {
  return res.status(200).json({ status: 0, message, data });
}

export function badRequest(res: Response, status: number, message: string) {
  return res.status(200).json({ status, message, data: null });
}

export function unauthorized(res: Response, message: String) {
  return res.status(401).json({ status: 108, message, data: null });
}

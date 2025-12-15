import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const UNATHORIZED = {
  status: 108,
  message: "Token tidak valid atau kadaluarsa",
  data: null,
};

export function authJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(UNATHORIZED);
  }

  const token = authHeader.substring("Bearer ".length).trim();
  if (!token) return res.status(401).json(UNATHORIZED);

  try {
    const payload = verifyToken(token);

    const email = payload.email;
    if (typeof email !== "string" || !email) {
      return res.status(401).json(UNATHORIZED);
    }

    req.userEmail = email;
    return next();
  } catch {
    return res.status(401).json(UNATHORIZED);
  }
}

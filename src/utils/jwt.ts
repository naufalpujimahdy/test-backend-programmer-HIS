import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export function signToken(email: string): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");

  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as JwtPayload;
}

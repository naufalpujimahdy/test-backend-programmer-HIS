import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET = (process.env.JWT_SECRET || "") as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

export function signToken(email: string): string {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any,
  };

  return jwt.sign({ email }, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");

  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") throw new Error("Invalid token payload");

  return decoded as JwtPayload;
}

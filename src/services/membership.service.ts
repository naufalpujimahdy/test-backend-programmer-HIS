import bcrypt from "bcrypt";
import validator from "validator";
import {
  findUserByEmail,
  findUserIdByEmail,
  insertUser,
} from "../repositories/user.repositories";
import { signToken } from "../utils/jwt";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

export async function registerUser(input: {
  email: unknown;
  first_name: unknown;
  last_name: unknown;
  password: unknown;
}): Promise<ServiceResult<null>> {
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const firstName =
    typeof input.first_name === "string" ? input.first_name.trim() : "";
  const lastName =
    typeof input.last_name === "string" ? input.last_name.trim() : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (!validator.isEmail(email)) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter email tidak sesuai format",
    };
  }

  if (password.length < 8) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter password minimal 8 karakter",
    };
  }

  if (!firstName) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter first_name tidak valid",
    };
  }

  if (!lastName) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter last_name tidak valid",
    };
  }

  const existingId = await findUserIdByEmail(email);
  if (existingId) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Email sudah terdaftar",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await insertUser({
    email,
    firstName,
    lastName,
    passwordHash,
  });

  return { ok: true, data: null };
}

export async function loginUser(input: {
  email: unknown;
  password: unknown;
}): Promise<ServiceResult<{ token: string }>> {
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (!validator.isEmail(email)) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter email tidak sesuai format",
    };
  }

  if (password.length < 8) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Parameter password minimal 8 karakter",
    };
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return {
      ok: false,
      httpStatus: 401,
      status: 103,
      message: "Username atau password salah",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return {
      ok: false,
      httpStatus: 401,
      status: 103,
      message: "Username atau password salah",
    };
  }

  const token = signToken(user.email);
  return { ok: true, data: { token } };
}

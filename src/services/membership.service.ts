import bcrypt from "bcrypt";
import validator from "validator";
import {
  findUserIdByEmail,
  insertUser,
} from "../repositories/user.repositories";

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

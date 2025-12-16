import bcrypt from "bcrypt";
import validator from "validator";
import {
  findUserByEmail,
  findUserIdByEmail,
  findUserProfileByEmail,
  insertUser,
  updateProfileImageUser,
  updateUserByEmail,
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

export async function getProfile(userEmail?: string): Promise<
  ServiceResult<{
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  }>
> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  const profile = await findUserProfileByEmail(userEmail);
  if (!profile) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  return { ok: true, data: profile };
}

export async function updateProfileName(
  userEmail: string | undefined,
  body: {
    first_name?: unknown;
    last_name?: unknown;
  }
): Promise<
  ServiceResult<{
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  }>
> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }

  const firstName =
    typeof body.first_name === "string" ? body.first_name.trim() : "";
  const lastName =
    typeof body.last_name === "string" ? body.last_name.trim() : "";

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

  const updated = await updateUserByEmail({
    email: userEmail,
    firstName,
    lastName,
  });

  if (!updated) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }
  return { ok: true, data: updated };
}

export async function updateProfileImageByEmail(
  userEmail: string | undefined,
  file: Express.Multer.File | undefined,
  publicUrl: string
): Promise<
  ServiceResult<{
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  }>
> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }

  if (!file) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Format Image tidak sesuai",
    };
  }

  const extensetionAllowed = ["image/jpeg", "image/png"];
  if (!extensetionAllowed) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Format Image tidak sesuai",
    };
  }

  const updated = await updateProfileImageUser({
    email: userEmail,
    profileImageUrl: publicUrl,
  });

  if (!updated) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }

  return { ok: true, data: updated };
}

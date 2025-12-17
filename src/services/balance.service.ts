import { findUserIdByEmail } from "../repositories/user.repository";
import { findBalanceByUserId } from "../repositories/wallet.repository";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

export async function getBalance(
  userEmail?: string
): Promise<ServiceResult<{ balance: number }>> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  const userId = await findUserIdByEmail(userEmail);
  if (!userId) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }

  const nominal = await findBalanceByUserId(userId);
  const balance =
    nominal == null
      ? 0
      : typeof nominal === "string"
      ? Number(nominal)
      : nominal;

  return { ok: true, data: { balance } };
}

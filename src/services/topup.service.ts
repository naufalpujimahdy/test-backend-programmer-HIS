import { withTx } from "../db/ts";
import { insertTopupTransaction } from "../repositories/transaction.repository";
import { findUserIdByEmail } from "../repositories/user.repository";
import {
  addBalance,
  lockWalletByUserId,
} from "../repositories/wallet.repository";
import { generateInvoice } from "../utils/invoice";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

function parseAmount(input: unknown): number | null {
  if (
    typeof input === "number" &&
    Number.isFinite(input) &&
    Number.isInteger(input) &&
    input >= 0
  )
    return input;

  if (typeof input === "string") {
    const s = input.trim();
    if (!/^\d+$/.test(s)) return null;
    const n = Number(s);
    if (!Number.isSafeInteger(n)) return null;
    return n;
  }

  return null;
}

export async function topupBalance(
  userEmail: string | undefined,
  body: { top_up_amount?: unknown }
): Promise<ServiceResult<{ balance: number }>> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  const amount = parseAmount(body.top_up_amount);
  if (amount === null) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message:
        "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    };
  }

  const userId = await findUserIdByEmail(userEmail);
  if (!userId) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  const newBalRaw = await withTx(async (client) => {
    const current = await lockWalletByUserId(client, userId);
    if (current === null) {
      throw new Error("Wallet not found");
    }

    const invoiceNumber = generateInvoice("INV");

    const updateBal = await addBalance(client, userId, amount);
    await insertTopupTransaction(client, { userId, invoiceNumber, amount });

    return updateBal;
  });

  const balance = typeof newBalRaw === "string" ? Number(newBalRaw) : newBalRaw;

  return { ok: true, data: { balance } };
}

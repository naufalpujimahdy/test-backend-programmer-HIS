import { findTransactionHistory } from "../repositories/history.repository";
import { findUserIdByEmail } from "../repositories/user.repository";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

function parseNonNegativeInt(v: unknown, fallback: number): number {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return fallback;
  if (!/^\d+$/.test(s)) return fallback;
  const n = Number(s);
  if (!Number.isSafeInteger(n) || n < 0) return fallback;
  return n;
}

export async function getTransactionHistory(
  userEmail: string | undefined,
  queryParams: { offset?: unknown; limit?: unknown }
): Promise<
  ServiceResult<{
    offset: number;
    limit: number | null;
    records: Array<{
      invoice_number: string;
      transaction_type: "TOPUP" | "PAYMENT";
      description: string;
      total_amount: number;
      created_on: string;
    }>;
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

  const userId = await findUserIdByEmail(userEmail);
  if (!userId) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak tidak valid atau kadaluwarsa",
    };
  }

  const offset = parseNonNegativeInt(queryParams.offset, 0);

  const limitStr =
    typeof queryParams.limit === "string" ? queryParams.limit.trim() : "";
  const limit = limitStr && /^\d+$/.test(limitStr) ? Number(limitStr) : null;

  const rows = await findTransactionHistory({
    userId,
    offset,
    limit: limit === null ? undefined : limit,
  });

  const records = rows.map((r) => ({
    invoice_number: r.invoice_number,
    transaction_type: r.transaction_type,
    description: r.description,
    total_amount:
      typeof r.total_amount === "string"
        ? Number(r.total_amount)
        : r.total_amount,
    created_on: r.created_on,
  }));

  return { ok: true, data: { offset, limit, records } };
}

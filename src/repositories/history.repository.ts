import { query } from "../db/pool";

export type HistoryRaw = {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: string | number;
  created_on: string;
};

export async function findTransactionHistory(params: {
  userId: number;
  offset: number;
  limit?: number;
}): Promise<HistoryRaw[]> {
  if (typeof params.limit === "number") {
    const data = await query<HistoryRaw>(
      `SELECT invoice_number, transaction_type, description, total_amount, created_on
            FROM transactions
            WHERE user_id = $1
            ORDER BY created_on DESC
            OFFSET $2
            LIMIT $3`,
      [params.userId, params.offset, params.limit]
    );
    return data.rows;
  }

  const data = await query<HistoryRaw>(
    `SELECT invoice_number, transaction_type, description, total_amount, created_on
    FROM transactions
    WHERE user_id = $1
    ORDER BY created_on DESC
    OFFSET $2`,
    [params.userId, params.offset]
  );
  return data.rows;
}

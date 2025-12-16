import type { PoolClient } from "pg";
import { query } from "../db/pool";

export type WalletRow = { balance: string | number };

export async function createWallet(
  client: PoolClient,
  userId: number
): Promise<void> {
  await client.query(`INSERT INTO wallets (user_id, balance) VALUES ($1, 0)`, [
    userId,
  ]);
}

export async function findBalanceByUserId(
  userId: number
): Promise<string | number | null> {
  const data = await query<WalletRow>(
    `SELECT balance FROM wallets WHERE user_id = $1 LIMIT 1`,
    [userId]
  );

  return data.rowCount ? data.rows[0].balance : null;
}

export async function lockWalletByUserId(client: PoolClient, userId: number) {
  const data = await client.query<{ balance: string | number }>(
    `SELECT balance FROM wallets WHERE user_id = $1 FOR UPDATE`,
    [userId]
  );
  return data.rowCount ? data.rows[0].balance : null;
}

export async function addBalance(
  client: PoolClient,
  userId: number,
  amount: number
) {
  const data = await client.query<{ balance: string | number }>(
    `UPDATE wallets
        SET balance = balance + $2,
        updated_at = NOW()
        WHERE user_id = $1
        RETURNING balance`,
    [userId, amount]
  );
  return data.rows[0].balance;
}

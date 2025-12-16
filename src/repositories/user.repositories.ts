import { QueryResultRow } from "pg";
import { query } from "../db/pool";

export type UserRow = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  profile_image: string | null;
};

export async function findUserIdByEmail(email: string): Promise<number | null> {
  const r = await query<{ id: number }>(
    "SELECT id FROM users WHERE email = $1 LIMIT 1",
    [email]
  );
  return r.rowCount ? r.rows[0].id : null;
}

export async function insertUser(params: {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}): Promise<void> {
  await query<QueryResultRow>(
    `INSERT INTO users (email, first_name, last_name, password_hash)
     VALUES ($1, $2, $3, $4)`,
    [params.email, params.firstName, params.lastName, params.passwordHash]
  );
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const data = await query<UserRow>(
    `SELECT id, email, first_name, last_name, password_hash, profile_image FROM users
    WHERE email = $1
    LIMIT 1`,
    [email]
  );

  return data.rowCount ? data.rows[0] : null;
}

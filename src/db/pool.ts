import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

function toBool(v: string | undefined): boolean {
  return v === "true" || v === "1";
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: process.env.DB_MAX_POOL ? Number(process.env.DB_MAX_POOL) : 10,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MS
    ? Number(process.env.DB_IDLE_TIMEOUT_MS)
    : 30000,
  connectionTimeoutMillis: process.env.DB_CONN_TIMEOUT_MS
    ? Number(process.env.DB_CONN_TIMEOUT_MS)
    : 2000,

  ssl: toBool(process.env.DB_SSL) ? { rejectUnauthorized: false } : undefined,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  return pool.query(text, params);
}

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

export async function closePool(): Promise<void> {
  await pool.end();
}

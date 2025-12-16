import { PoolClient } from "pg";

export async function insertTopupTransaction(
  client: PoolClient,
  params: {
    userId: number;
    invoiceNumber: string;
    amount: number;
  }
) {
  await client.query(
    `INSERT INTO transactions (
        user_id, 
        invoice_number, 
        transaction_type, 
        description, 
        total_amount, 
        created_on
    ) VALUES (
     $1, $2, 'TOPUP','Top Up Balance', $3, NOW()
     )`,
    [params.userId, params.invoiceNumber, params.amount]
  );
}

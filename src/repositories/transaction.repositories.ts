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

export async function insertPaymentTransaction(
  client: PoolClient,
  params: {
    userId: number;
    invoiceNumber: string;
    serviceCode: string;
    serviceName: string;
    amount: number;
  }
) {
  const data = await client.query<{
    invoice_number: string;
    service_code: string | null;
    service_name: string | null;
    transaction_type: string;
    total_amount: string | number;
    created_on: string;
  }>(
    `INSERT INTO transactions (
    user_id, invoice_number, transaction_type, description, total_amount, service_code, service_name, created_on ) VALUES (
    $1, $2, 'PAYMENT', $3, $4, $5, $6, NOW()
    ) 
    RETURNING invoice_number, service_code, service_name, transaction_type, total_amount, created_on`,
    [
      params.userId,
      params.invoiceNumber,
      params.serviceName,
      params.amount,
      params.serviceCode,
      params.serviceName,
    ]
  );

  return data.rows[0];
}

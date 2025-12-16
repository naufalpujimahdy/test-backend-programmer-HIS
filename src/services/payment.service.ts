import { withTx } from "../db/ts";
import { findServiceByCode } from "../repositories/service.repositories";
import { insertPaymentTransaction } from "../repositories/transaction.repositories";
import { findUserIdByEmail } from "../repositories/user.repositories";
import {
  deductBalance,
  lockWalletByUserId,
} from "../repositories/wallet.repository";
import { generateInvoice } from "../utils/invoice";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

export async function pay(
  userEmail: string | undefined,
  body: { service_code?: unknown }
): Promise<
  ServiceResult<{
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: "PAYMENT";
    total_amount: number;
    created_on: string;
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

  const serviceCode =
    typeof body.service_code === "string"
      ? body.service_code.trim().toUpperCase()
      : "";

  if (!serviceCode) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Service ataus Layanan tidak ditemukan",
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

  const service = await findServiceByCode(serviceCode);
  if (!service) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Service ataus Layanan tidak ditemukan",
    };
  }

  const tariff =
    typeof service.service_tariff === "string"
      ? Number(service.service_tariff)
      : service.service_tariff;
  if (!Number.isFinite(tariff) || tariff < 0) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Service atau Layanan tidak ditemukan",
    };
  }

  const inserted = await withTx(async (client) => {
    const balRaw = await lockWalletByUserId(client, userId);
    const balance =
      balRaw == null ? 0 : typeof balRaw === "string" ? Number(balRaw) : balRaw;

    if (balance < tariff) {
      return { error: "Saldo tidak mencukupi" as const };
    }

    await deductBalance(client, userId, tariff);

    const invoiceNumber = generateInvoice("INV");
    const trx = await insertPaymentTransaction(client, {
      userId,
      invoiceNumber,
      serviceCode: service.service_code,
      serviceName: service.service_name,
      amount: tariff,
    });

    return { trx };
  });

  if ("error" in inserted) {
    return {
      ok: false,
      httpStatus: 400,
      status: 102,
      message: "Saldo tidak mencukup",
    };
  }

  const trx = inserted.trx;

  return {
    ok: true,
    data: {
      invoice_number: trx.invoice_number,
      service_code: trx.service_code ?? service.service_code,
      service_name: trx.service_name ?? service.service_name,
      transaction_type: "PAYMENT",
      total_amount:
        typeof trx.total_amount === "string"
          ? Number(trx.total_amount)
          : trx.total_amount,
      created_on: trx.created_on,
    },
  };
}

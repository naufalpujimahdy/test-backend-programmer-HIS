import { query } from "../db/pool";

export type ServiceRow = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export async function allService() {
  const data = await query<{
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: string | string;
  }>(
    `SELECT service_code, service_name, service_icon, service_tariff
    FROM services
    ORDER BY id ASC`
  );
  return data.rows;
}

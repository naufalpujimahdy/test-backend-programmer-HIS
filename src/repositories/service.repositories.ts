import { query } from "../db/pool";

export type ServiceRow = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export type ServiceByCodeRow = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: string | number;
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

export async function findServiceByCode(
  serviceCode: string
): Promise<ServiceByCodeRow | null> {
  const data = await query<ServiceByCodeRow>(
    `SELECT service_code, service_name, service_icon, service_tariff
    FROM services
    WHERE service_code = $1
    LIMIT 1`,
    [serviceCode]
  );
  return data.rowCount ? data.rows[0] : null;
}

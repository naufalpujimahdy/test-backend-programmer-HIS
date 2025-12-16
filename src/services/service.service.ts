import { allService } from "../repositories/service.repositories";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

export async function listService(
  userEmail?: string
): Promise<ServiceResult<any[]>> {
  if (!userEmail) {
    return {
      ok: false,
      httpStatus: 401,
      status: 108,
      message: "Token tidak valid atau kadaluarsa",
    };
  }
  const rows = await allService();

  const services = rows.map((s) => ({
    service_code: s.service_code,
    service_name: s.service_name,
    services_icon: s.service_icon,
    service_tariff:
      typeof s.service_tariff === "string"
        ? Number(s.service_tariff)
        : s.service_tariff,
  }));

  return { ok: true, data: services };
}

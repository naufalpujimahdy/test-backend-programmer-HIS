import { allBanner } from "../repositories/banner.repository";

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; httpStatus: number; status: number; message: string };

export async function listBanner(): Promise<ServiceResult<any[]>> {
  const banners = await allBanner();
  return { ok: true, data: banners };
}

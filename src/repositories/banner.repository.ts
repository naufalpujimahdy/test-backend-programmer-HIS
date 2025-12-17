import { query } from "../db/pool";

export type BannerRow = {
  banner_name: string;
  banner_image: string;
  description: string;
};

export async function allBanner() {
  const data = await query<BannerRow>(
    `SELECT banner_name, banner_image, description
    FROM banners
    ORDER BY id ASC`
  );

  return data.rows;
}

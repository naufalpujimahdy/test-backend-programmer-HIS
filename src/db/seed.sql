INSERT INTO banners (banner_name, banner_image, description)
VALUES
('Banner 1', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 1'),
('Banner 2', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 2'),
('Banner 3', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 3'),
('Banner 4', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 4'),
('Banner 5', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 5'),
('Banner 6', 'https://naufalpujimahdy.id/dummy.jpg', 'Banner 6')
ON CONFLICT DO NOTHING;

INSERT INTO services (service_code, service_name, service_icon, service_tariff)
VALUES
('PAJAK', 'Pajak PBB', 'https://naufalpujimahdy.id/dummy.jpg', 40000),
('PLN', 'Listrik', 'https://naufalpujimahdy.id/dummy.jpg', 10000),
('PDAM', 'PDAM Berlangganan', 'https://naufalpujimahdy.id/dummy.jpg', 40000),
('PULSA', 'Pulsa', 'https://naufalpujimahdy.id/dummy.jpg', 40000),
('PGN', 'PGN Berlangganan', 'https://naufalpujimahdy.id/dummy.jpg', 50000),
('MUSIK', 'Musik Berlangganan', 'https://naufalpujimahdy.id/dummy.jpg', 50000),
('TV', 'TV Berlangganan', 'https://naufalpujimahdy.id/dummy.jpg', 50000),
('PAKET_DATA', 'Paket data', 'https://naufalpujimahdy.id/dummy.jpg', 50000),
('VOUCHER_GAME', 'Voucher Game', 'https://naufalpujimahdy.id/dummy.jpg', 100000),
('VOUCHER_MAKANAN', 'Voucher Makanan', 'https://naufalpujimahdy.id/dummy.jpg', 100000),
('QURBAN', 'Qurban', 'https://naufalpujimahdy.id/dummy.jpg', 200000),
('ZAKAT', 'Zakat', 'https://naufalpujimahdy.id/dummy.jpg', 300000)
ON CONFLICT (service_code) DO NOTHING;

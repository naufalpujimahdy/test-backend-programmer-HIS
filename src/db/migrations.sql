CREATE TABLE IF NOT EXISTS users (
  id            BIGSERIAL PRIMARY KEY,
  email         VARCHAR(150) NOT NULL UNIQUE,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image TEXT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS banners (
  id           BIGSERIAL PRIMARY KEY,
  banner_name  VARCHAR(100) NOT NULL,
  banner_image TEXT NOT NULL,
  description  TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id             BIGSERIAL PRIMARY KEY,
  service_code   VARCHAR(30) NOT NULL UNIQUE,
  service_name   VARCHAR(120) NOT NULL,
  service_icon   TEXT NOT NULL,
  service_tariff BIGINT NOT NULL CHECK (service_tariff >= 0),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_code ON services(service_code);

CREATE TABLE IF NOT EXISTS transactions (
  id               BIGSERIAL PRIMARY KEY,
  user_id          BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  invoice_number   VARCHAR(50) NOT NULL UNIQUE,
  transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('TOPUP', 'PAYMENT')),

  description      VARCHAR(255) NOT NULL,
  total_amount     BIGINT NOT NULL CHECK (total_amount >= 0),

  service_code     VARCHAR(30) NULL,
  service_name     VARCHAR(120) NULL,

  created_on       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_created
  ON transactions(user_id, created_on DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_type
  ON transactions(user_id, transaction_type);

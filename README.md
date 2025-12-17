# Test Backend Programmer HIS

Take Home Test Backend Programmer  
PT Nutech Integrasi  
Author: **Naufal Puji Mahdy**

---

## 📌 Deskripsi

Project ini merupakan implementasi **Take Home Test Backend Programmer HIS** menggunakan **Node.js (Express.js 5)** dan **PostgreSQL**, dengan mengikuti **kontrak API sesuai Swagger** yang diberikan oleh PT Nutech Integrasi.

Fokus utama:

- Authentication & Authorization (JWT)
- Transaction integrity (saldo, top up, payment)
- Clean architecture (Controller – Service – Repository)
- Raw SQL query (prepared statement)
- Production-ready backend

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js v5**
- **TypeScript**
- **PostgreSQL**
- **JWT (Authentication)**
- **Swagger (OpenAPI 3.0)**
- **Docker (Production ready)**

---

## 📂 Struktur Project

.
├── src/
│ ├── app.ts
│ ├── server.ts
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── middlewares/
│ ├── db/
│ └── docs/
├── database/
│ ├── schema.sql
│ └── seed.sql
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

---

## 🗄️ Database Design (DDL)

Database schema tersedia pada file berikut:

Berisi:

- users
- wallets (saldo user)
- banners
- services
- transactions

Relasi dan constraint dibuat untuk memastikan:

- Integrity saldo
- Atomic transaction
- Data consistency

### Menjalankan DDL

```bash
psql -d test_backend_programmer -f database/schema.sql
```

# Test Backend Programmer HIS

**Take Home Test Backend Programmer**
PT Nutech Integrasi
Author: **Naufal Puji Mahdy**

---

## 📌 Deskripsi Project

Project ini merupakan implementasi **Take Home Test Backend Programmer HIS** menggunakan **Node.js (Express.js) + TypeScript** dan **PostgreSQL**, dengan mengacu pada **kontrak API (Swagger/OpenAPI)** yang telah ditentukan.

Project dirancang dengan pendekatan **clean architecture**, terstruktur, dan siap dijalankan di environment **production (Docker-ready)**.

Fokus utama implementasi:

* Authentication & Authorization menggunakan **JWT**
* Manajemen saldo (Top Up & Payment)
* Transaction history
* Validasi bisnis (saldo cukup, atomic transaction)
* Pemisahan layer Controller – Service – Repository
* Dokumentasi API menggunakan Swagger

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **PostgreSQL**
* **JWT (Authentication & Authorization)**
* **Swagger / OpenAPI 3.0**
* **Docker & Docker Compose**

---

## 📂 Struktur Folder Project

```bash
.
├── dist/                   # Hasil build TypeScript
├── node_modules/
├── src/
│   ├── controllers/        # HTTP controller (request & response handler)
│   ├── db/                 # Database connection & query helper
│   ├── docs/               # Swagger / OpenAPI documentation
│   ├── middlewares/        # Custom middleware (auth, error handler, dll)
│   ├── repositories/       # Layer akses data (query ke database)
│   ├── routes/             # Route definitions
│   ├── services/           # Business logic
│   ├── types/              # Global TypeScript types & interfaces
│   ├── utils/              # Helper & utility functions
│   ├── app.ts              # Konfigurasi Express app
│   └── server.ts           # Entry point server
├── uploads/                # (Opsional) file upload storage
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 🧱 Arsitektur Aplikasi

Project ini menggunakan pola **Layered Architecture**:

```
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

**Penjelasan singkat:**

* **Controller**
  Menangani HTTP request & response

* **Service**
  Berisi business logic (validasi saldo, proses transaksi, dll)

* **Repository**
  Bertanggung jawab terhadap query database (PostgreSQL)

* **Middleware**
  JWT authentication, error handling, request validation

---

## 🗄️ Database Design (DDL)

Desain database menggunakan **PostgreSQL** dengan tabel utama:

* **users** — data user
* **wallets** — saldo user
* **services** — layanan yang tersedia
* **transactions** — riwayat transaksi
* **banners** — banner informasi

Relasi dan constraint dibuat untuk memastikan:

* Konsistensi data
* Saldo tidak negatif
* Transaksi bersifat atomic (menggunakan database transaction)

> ⚠️ **DDL disertakan di dalam repository** sesuai permintaan soal take home test.

---

## 🔐 Authentication

* Menggunakan **JWT Bearer Token**
* Token dihasilkan saat login
* Email user **tidak dikirim melalui request body**, tetapi diambil dari payload JWT

---

## 🚀 Menjalankan Project (Local)

### 1️⃣ Install dependency

```bash
npm install
```

### 2️⃣ Copy environment variable

```bash
cp .env.example .env
```

### 3️⃣ Jalankan aplikasi (development)

```bash
npm run dev
```

### 4️⃣ Build & run production

```bash
npm run build
npm start
```

---

## 🐳 Menjalankan dengan Docker

```bash
docker-compose up --build
```

---

## 📖 API Documentation (Swagger)

Swagger dapat diakses melalui endpoint:

```
/api-docs
```

Dokumentasi dibuat menggunakan standar **OpenAPI 3.0** dan mengikuti kontrak API yang diberikan.

---

## ✅ Catatan Tambahan

* Project ini **tidak menggunakan ORM**, seluruh query database dibuat secara eksplisit
* Setiap transaksi payment dipastikan:

  * Saldo mencukupi
  * Menggunakan database transaction
* Struktur folder dirancang agar mudah dikembangkan dan di-maintain

---

## 👤 Author

**Naufal Puji Mahdy**
Backend Engineer Candidate – PT Nutech Integrasi

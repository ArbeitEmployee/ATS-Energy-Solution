# ATS Energy Solutions — Corporate Web Portal & CMS

A Next.js (Frontend) and Express.js + MongoDB (Backend) corporate website and dynamic CMS engineered for **ATS Energy Solutions**, inspired by premier industrial competitors like Super Star Group (SSG).

---

## 🏗️ Architecture Overview

- **Frontend:** Next.js (App Router, TypeScript, Tailwind CSS, Lucide Icons) in [`client`](file:///e:/atsenergybd/client)
- **Backend:** Node.js, Express.js, MongoDB / Mongoose, JWT Auth, Helmet & Security in [`server`](file:///e:/atsenergybd/server)
- **Database:** Local MongoDB (`mongodb://127.0.0.1:27017/atsenergybd`) with seamless switch to MongoDB Atlas via `.env`.

---

## 🚀 Key Features

1. **Corporate UI (SSG Competitor Style):**
   - High-impact Hero with certification trust signals (BSTI, BCSIR, NBR, DNCC).
   - Division showcase: Lighting Solutions, Electrical Accessories, Wiring & Cables, Solar Energy Systems.
   - Comprehensive Footer with complete corporate contact & credentials.

2. **Dynamic Product Details Page with Attributes:**
   - Detailed product view at `/products/[slug]`.
   - Structured **Technical Specifications Table** (Attributes) for Wattage, Voltage, Dimensions, Luminous Efficacy, Warranty, Contact Materials, etc.
   - "Request Corporate Quote" and direct phone hotline triggers.

3. **Built-in Admin CMS Dashboard:**
   - Route: `/admin/login` & `/admin/dashboard`.
   - Add new products dynamically with flexible Key-Value attributes (Specs builder).
   - Review and manage incoming B2B quotations and dealer inquiries.

4. **Authentic ATS Energy Data:**
   - Pre-seeded with original ATS Energy products (AC LEDs, Emergency bulbs, 4-Gang switches, 32A MCB breakers, 2.5 RM pure copper cables, 150W Solar panels, 30A auto charge controllers, decorative holders).
   - Office: *Sonali Neer, Holding-615/9/1, Bosila Road, Mohammadpur, Dhaka-1207*.
   - Contacts: *+880 1848-160565 / +880 1711-703541*.

---

## 🛠️ How to Run the Project

### 1. Run the Backend Server
```powershell
cd e:\atsenergybd\server
npm install
node index.js
# Backend runs on http://localhost:5000
```
*(To seed database with default ATS data & admin, run: `node seeder.js`)*

### 2. Run the Next.js Client
```powershell
cd e:\atsenergybd\client
npm run dev
# Frontend runs on http://localhost:3000
```

### 3. Admin Credentials
- **URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@atsenergybd.com`
- **Password:** `adminpassword123`

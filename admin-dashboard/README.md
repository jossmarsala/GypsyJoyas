# Gypsy Joyas Admin Dashboard

A modern, Bento-style admin dashboard for managing the Gypsy Joyas product catalog.

## Architecture
- **Backend**: Node.js, Express, Prisma (SQLite), Multer (Image Uploads).
- **Frontend**: React, Vite, Axios.
- **Database**: SQLite (`server/database.sqlite`).

## How to Run

You need to run both the backend server and the frontend client simultaneously.

### 1. Start the Backend Server
Open a terminal and run:
```bash
cd admin-dashboard/server
npm start
```
The server will start on [http://localhost:3001](http://localhost:3001).

### 2. Start the Frontend Client
Open a second terminal and run:
```bash
cd admin-dashboard/client
npm run dev
```
The dashboard will be available at [http://localhost:5173](http://localhost:5173).

## Features
- **Product Management**: Add, Edit, Delete products.
- **Image Upload**: Upload product images directly.
- **Bulk Tools**: Increase/Decrease prices by percentage for specific categories/materials.
- **Maintenance Mode**: Toggle the global maintenance overlay on the public site.
- **Search & Filter**: Quickly find products by name, category, or material.

## Data Migration
The system has been pre-seeded with data from your existing JSON files.
The SQLite database file is located at `admin-dashboard/server/database.sqlite`.

## Vercel Deployment
This project is configured for deployment on Vercel using Vercel Postgres and Vercel Blob.
Refer to `VERCEL_INSTRUCTIONS.md` in the root directory for details.

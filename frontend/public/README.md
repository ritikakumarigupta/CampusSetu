# CampusSetu - Smart Campus Management System
**AAYAM TECH FEST 2026 - Problem Statement 06**

## Features Built
1. **JWT Role-Based Auth**: Student & Admin access control.
2. **Maintenance Complaints System**: Upload photo proof, track status (Pending, In-Progress, Resolved).
3. **Classroom & Lab Booking**: Room availability validation and conflict resolution.
4. **Lost & Found Portal**: Post items with photos and contact info.
5. **Campus Announcements**: Broadcast notices directly onto the student dashboard.
6. **Admin Dashboard**: Real-time analytical charts using Chart.js.

---

## 5-Minute Quick Start Guide

### Prerequisites
- Node.js installed (`>= 16.x`)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed     # Pre-populates Admin and Student Demo Accounts
npm run dev      # Server starts on http://localhost:5000
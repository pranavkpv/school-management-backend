# School Management Backend

Backend for the School Management System built with NestJS and MongoDB.

## Repository

```bash
git clone https://github.com/pranavkpv/school-management-backend.git
cd school-management-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Setup

Create a `.env` file in the project root:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/schoolDB

FRONTEND_URL=http://localhost:3000

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

SMTP_USER=your_email@gmail.com

SMTP_PASS=your_app_password

NODE_ENV=development
```

Replace placeholder values with your own configuration.

---

## Run Project

Development:

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start
```

Server runs at:

```bash
http://localhost:5000
```

---

## API Prefix

All routes use:

```bash
/api
```

Example:

```bash
GET /api/students
GET /api/student/fees
POST /api/auth/login
```

---

## Features

- Authentication with JWT
- Cookie-based Access Token
- Role-Based Authorization
- Student Management
- Teacher Management
- Class Management
- Attendance
- Monthly Fee Generation
- Pending Fee Collection APIs
- Email Notifications (Nodemailer)

---

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose
- Passport JWT
- @nestjs/config
- @nestjs/schedule
- Nodemailer
- bcrypt

---

## Modules

### Auth
- Login
- Access Token
- Refresh Token
- Cookie Authentication

### Student
- Create Student
- View Student Profile
- Student Fee Records

### Teacher
- Create Teacher
- Assign Class Teacher

### Class
- Class Management
- Class Teacher Assignment

### Attendance
- Mark Attendance
- View Attendance

### Fees
- Monthly Fee Generation Cron
- Pending Fee Records
- Payment Status Tracking

---

## Fee Collection Structure

Fields:

```bash
studentId
amount
paymentStatus
paymentDate
monthOfPayment
```

Monthly fee records are automatically generated on the 5th of each month.

---


## Quick Start

```bash
git clone https://github.com/pranavkpv/school-management-backend.git

cd school-management-backend

npm install

# create .env

npm run start:dev
```

---

## Important

Do not commit:

```bash
.env
node_modules
dist
```

Make sure `.gitignore` includes them.

---

## Author

Pranav Raj K P V
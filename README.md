# School Management Backend

A basic backend project built with NestJS, TypeScript, and MongoDB for managing:

- Students
- Teachers
- Classes
- Attendance
- Fees

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose
- @nestjs/config
- bcrypt

---

## Project Setup

Clone the repository:

```bash
git clone https://github.com/your-username/school-management-backend.git
cd school-management-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/schoolDB
```

---

## Run Project

Development mode:

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
POST /api/students/register
```

---

## Modules

### Student
Fields:

- name
- class
- rollNumber
- age
- contactInfo
- email
- password

---

### Teacher

- name
- subject
- experience
- contactInfo
- email
- password

---

### Class

- className
- subject
- teacherId
- classId

---

### Attendance

- studentId
- classId
- date
- status

---

### Fees

- studentId
- amount
- dueDate
- status
- paypalOrderId

---

## Project Structure

```bash
src/
├── config/
├── modules/
│   ├── students/
│   ├── teachers/
│   ├── classes/
│   ├── attendance/
│   └── fees/
```

---

## Features Implemented

- NestJS server setup
- MongoDB connection
- Schema models
- Student register API
- Student list API
- Environment config setup

---

## Future Improvements

- JWT Authentication
- Admin Dashboard APIs
- Validation DTOs
- Role-based access
- Fee payment integration with PayPal

---

## Author

Pranav Raj
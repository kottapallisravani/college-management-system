# Backend (API)

Express + TypeScript backend with authentication and core campus APIs.

Environment
- Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

Install & Run

> npm install

Run in dev mode:

> npm run dev

API

Auth
- POST /api/auth/signup
  - body: { role: string, email: string, password: string }
  - returns { success: true }
- POST /api/auth/login
  - body: { email: string, password: string }
  - returns { token, user: { id, email, role } }

Timetable (auth required)
- GET /api/timetable/active
- GET /api/timetable/all (admin)
- POST /api/timetable/upload (admin, CSV)
- PUT /api/timetable/:id (admin)
- DELETE /api/timetable/:id (admin)
- GET /api/timetable/sample

Students/Faculty/Courses/Announcements (auth required)
- GET /api/students, /api/faculty, /api/courses, /api/announcements
- POST/PUT/DELETE for admin where applicable

Attendance (auth required)
- GET /api/attendance?studentId=&courseId=&department=&section=&semester=&startDate=&endDate=&status=&page=&limit=
- POST /api/attendance (faculty/admin)
- PUT /api/attendance/:id (admin)

Exams (auth required)
- GET /api/exams?department=&semester=&type=&startDate=&endDate=&status=&page=&limit=
- POST /api/exams (admin)
- PUT /api/exams/:id (admin)
- DELETE /api/exams/:id (admin)

Fees (auth required)
- GET /api/fees?studentId=&semester=&status=&page=&limit=
- POST /api/fees (faculty/admin)
- PUT /api/fees/:id (admin)
- DELETE /api/fees/:id (admin)

Marks (auth required)
- GET /api/marks?studentId=&courseId=&examType=&semester=&status=&page=&limit=
- POST /api/marks (faculty/admin)
- PUT /api/marks/:id (faculty/admin)
- DELETE /api/marks/:id (admin)

Profile (auth required)
- GET /api/profile/me
- PUT /api/profile/me
- GET /api/profile/:userId (admin)
- PUT /api/profile/:userId (admin)

Notes
- This scaffold does not include rate-limiting, email verification, or production hardening.
- All non-auth endpoints require Authorization: Bearer <token>.

Install deps

```bash
npm install
```

Dev run

```bash
npm run dev
```

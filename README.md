# Student Management System

A full-stack web application for managing student records with role-based access control. Built with NestJS (backend) and Next.js (frontend).

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication with HTTP-only cookies
  - Role-based access control (Admin/User)
  - Protected routes on both frontend and backend

- **Student Management (CRUD)**
  - Create new student records (Admin only)
  - View all students (All authenticated users)
  - View individual student details (All authenticated users)
  - Update student information (Admin only)
  - Delete student records (Admin only)

- **User Roles**
  - **Admin**: Full CRUD access to student records
  - **User**: Read-only access to student records

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **class-validator** - DTO validation
- **cookie-parser** - Cookie handling

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📁 Project Structure

```
CRUD_2/
├── crud/                    # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── dto/
│   │   ├── student/        # Student CRUD module
│   │   │   ├── student.controller.ts
│   │   │   ├── student.service.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── users/          # User management
│   │   ├── common/         # Shared guards, decorators, enums
│   │   └── main.ts         # Application entry point
│   └── package.json
│
└── student-admin/           # Next.js Frontend
    ├── app/
    │   ├── (admin)/        # Protected admin routes
    │   │   └── students/
    │   ├── (public)/       # Public routes
    │   └── page.tsx        # Login page
    ├── components/         # React components
    │   ├── layout/
    │   ├── students/
    │   └── ui/
    ├── lib/                # Utilities and API functions
    │   ├── api.ts          # API client functions
    │   └── types.ts        # TypeScript types
    └── middleware.ts       # Next.js middleware for route protection
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CRUD_2
   ```

2. **Set up the Backend**
   ```bash
   cd crud
   npm install
   ```

3. **Configure Database**
   - Create a PostgreSQL database named `test`
   - Update database credentials in `crud/src/app.module.ts`:
     ```typescript
     host: 'localhost',
     port: 5432,
     username: 'root',
     password: 'admin',
     database: 'test',
     ```

4. **Set up the Frontend**
   ```bash
   cd ../student-admin
   npm install
   ```

### Running the Application

1. **Start PostgreSQL** (if not running as a service)

2. **Start the Backend**
   ```bash
   cd crud
   npm run start:dev
   ```
   Backend runs on `http://localhost:3000`

3. **Start the Frontend**
   ```bash
   cd student-admin
   npm run dev
   ```
   Frontend runs on `http://localhost:3001`

4. **Access the Application**
   - Open `http://localhost:3001` in your browser
   - Login with test credentials:
     - **Admin**: `ram` / `admin`
     - **User**: `sita` / `user`

## 🔐 Authentication Flow

1. User submits login credentials
2. Backend validates credentials and generates JWT token
3. Token is stored in HTTP-only cookie and returned in response
4. Frontend stores token copy in localStorage for Authorization headers
5. All subsequent requests include token in both cookie and Authorization header
6. Backend validates token using `AuthGuard` and `RolesGuard`
7. Middleware protects routes on frontend based on user role

## 📡 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout
- `GET /auth/profile` - Get current user profile (protected)

### Students
- `GET /students` - Get all students (requires `user` role)
- `GET /students/:id` - Get student by ID (requires `user` role)
- `POST /students` - Create student (requires `admin` role)
- `PATCH /students/:id` - Update student (requires `admin` role)
- `DELETE /students/:id` - Delete student (requires `admin` role)

## 🧪 Testing

### Backend Tests
```bash
cd crud
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Test coverage
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `crud` directory:
```env
PORT=3000
JWT_SECRET=your-secret-key
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=root
DATABASE_PASSWORD=admin
DATABASE_NAME=test
```

### CORS Configuration

CORS is configured in `crud/src/main.ts` to allow requests from `http://localhost:3001`. Update this for production.

## 📝 Key Concepts

### Guards
- **AuthGuard**: Validates JWT token from cookies or Authorization header
- **RolesGuard**: Checks if user has required role(s) for the endpoint

### Decorators
- **@Roles()**: Specifies required roles for an endpoint
- **@UseGuards()**: Applies guards to controllers or routes

### Middleware
- Next.js middleware protects routes before rendering
- Validates authentication and redirects unauthorized users


## 🤝 Contributing

This is an internship project. For questions or improvements, please contact the project maintainer.

## 📄 License

This project is for educational purposes.

## 👤 Author

Built as part of an internship project to learn NestJS and Next.js integration.


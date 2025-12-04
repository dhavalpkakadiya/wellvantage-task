# WellVantage - Gym & Lead Management System

A full-stack application for managing gyms and leads with Google OAuth authentication. Built with NestJS backend and React frontend.

## 🚀 Features

- **Authentication**: Google OAuth 2.0 integration with JWT token-based authentication
- **User Management**: User profile management with Google account integration
- **Gym Management**: Create and manage gym profiles associated with users
- **Lead Management**: Create and manage leads with pagination and search functionality
- **Database**: PostgreSQL with TypeORM for data persistence
- **Migrations**: Database migration support for schema versioning

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Google OAuth Credentials** (Client ID and Client Secret)

## 🛠️ Installation & Setup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   # Server Configuration
   PORT=3000

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=wellvantage_db

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Set up the database**:
   ```bash
   # Create the database
   createdb wellvantage_db

   # Run migrations
   npm run migration:run
   ```

5. **Start the backend server**:
   ```bash
   # Development mode
   npm run start:dev
   ```
   The server will start on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `frontend` directory (use `.env.example` as reference):
   ```env
   VITE_REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_REACT_APP_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will start on `http://localhost:5173`.

## 🏃 Running the Application

### Backend Commands
- **Development**: `npm run start:dev` - Start with hot-reload
- **Production**: `npm run build && npm run start:prod` - Build and run
- **Debug**: `npm run start:debug` - Start in debug mode

### Frontend Commands
- **Development**: `npm run dev` - Start Vite dev server
- **Build**: `npm run build` - Build for production
- **Preview**: `npm run preview` - Preview production build

## 📚 API Endpoints

### Authentication

#### POST `/auth/google`
Authenticate with Google OAuth token.

**Request Body:**
```json
{
  "token": "google_oauth_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": { ... },
    "accessToken": "jwt_token"
  }
}
```

#### GET `/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "profilePic": "profile_picture_url",
    ...
  }
}
```

### Gyms

#### POST `/gym/create`
Create a new gym (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Gym Name",
  "address": "Gym Address",
  "phone": "1234567890",
  "email": "gym@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gym created successfully",
  "data": { ... }
}
```

#### GET `/gym/user/:userId`
Get gym by user ID (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Gym found",
  "data": { ... }
}
```

### Leads

#### POST `/lead/create`
Create a new lead (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Lead Name",
  "email": "lead@example.com",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": { ... }
}
```

#### GET `/lead`
Get leads with pagination and search (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for filtering leads

**Example:**
```
GET /lead?page=1&limit=10&search=john
```

**Response:**
```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [ ... ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

## 🗄️ Database Migrations

TypeORM migrations are used to manage database schema changes. Migrations run automatically on application start (`migrationsRun: true`), but you can also run them manually.

### Migration Flow

#### 1. Initial Setup (First Time)

When setting up the project for the first time:

```bash
# 1. Create the database
createdb wellvantage_db

# 2. Build the application (required for migrations)
npm run build

# 3. Run all pending migrations
npm run migration:run

# 4. Verify migration status
npm run migration:show
```

#### 2. Development Workflow

When making schema changes during development:

**Step 1: Modify Entity Files**
- Update entity files in `src/users/entities/`, `src/gyms/entities/`, or `src/leads/entities/`
- Example: Add a new column, change a data type, add a relationship

**Step 2: Generate Migration**
```bash
# Generate migration based on entity changes
npm run migration:generate --name=AddNewColumnToUsers
```

This will:
- Compare your entities with the current database schema
- Generate a new migration file in `src/database/` with timestamp prefix
- Create both `up()` and `down()` methods

**Step 3: Review Generated Migration**
- Check the generated migration file in `src/database/`
- Verify the SQL statements are correct
- Modify if needed (e.g., add data transformations)

**Step 4: Test Migration Locally**
```bash
# Build the application
npm run build

# Run the new migration
npm run migration:run

# Verify the changes
npm run migration:show
```

**Step 5: Test Rollback (Optional)**
```bash
# Revert the last migration
npm run migration:revert

# Re-run to test again
npm run migration:run
```

#### 3. Creating Custom Migrations

For complex migrations that can't be auto-generated:

```bash
# Create an empty migration file
npm run migration:create --name=CustomDataMigration
```

Then manually write the `up()` and `down()` methods:

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomDataMigration1234567890 implements MigrationInterface {
    name = 'CustomDataMigration1234567890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Write your migration logic here
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "new_field" VARCHAR(255)`);
        // Add data transformations, indexes, etc.
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Write the rollback logic here
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "new_field"`);
    }
}
```

#### 4. Production Deployment Flow

**Before Deployment:**
```bash
# 1. Build the application
npm run build

# 2. Check migration status (should show pending migrations)
npm run migration:show

# 3. Test migrations on staging environment first
```

**During Deployment:**
- Migrations run automatically when the application starts (`migrationsRun: true`)
- Ensure database backups are taken before deployment
- Monitor the application logs for migration execution

**Manual Production Migration (if needed):**
```bash
# Run migrations manually in production
npm run migration:run
```

#### 5. Migration Commands Reference

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run migration:generate --name=Name` | Auto-generate migration from entity changes | After modifying entity files |
| `npm run migration:create --name=Name` | Create empty migration file | For custom migrations or data transformations |
| `npm run migration:run` | Execute all pending migrations | After generating or creating migrations |
| `npm run migration:revert` | Revert the last executed migration | To undo the most recent migration |
| `npm run migration:show` | Show migration status | To check which migrations are pending or executed |

#### 6. Migration Best Practices

✅ **Do:**
- Always review generated migrations before running them
- Test migrations on a development database first
- Keep migrations small and focused on a single change
- Write reversible `down()` methods for all migrations
- Commit migration files to version control
- Take database backups before running migrations in production
- Use descriptive migration names (e.g., `AddEmailIndexToUsers`)

❌ **Don't:**
- Modify existing migration files that have already been run in production
- Delete migration files that have been executed
- Mix schema changes with data migrations (create separate migrations)
- Skip testing migrations before deployment
- Run migrations manually in production without backups

#### 7. Troubleshooting

**Migration fails to run:**
```bash
# Check migration status
npm run migration:show

# Verify database connection in .env file
# Ensure the application is built
npm run build

# Try running migrations again
npm run migration:run
```

**Need to reset database (Development only):**
```bash
# ⚠️ WARNING: This will delete all data!
# Drop and recreate the database
dropdb wellvantage_db
createdb wellvantage_db

# Run all migrations from scratch
npm run migration:run
```

**Migration out of sync:**
- If migrations are out of sync, you may need to manually fix the database state
- Consider creating a new migration to align the schema
- Never modify executed migration files

#### 8. Current Migrations

The project includes the following migrations:

1. **Migrations1764828433541** - Initial schema (Users and Gyms tables)
2. **Migrations1764830268199** - Leads table with indexes and relationships

These migrations are automatically executed when the application starts.

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage
```bash
npm run test:cov
```

### E2E Tests
```bash
npm run test:e2e
```

## 📁 Project Structure

```
wellvantage-task/
├── backend/               # NestJS Backend
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── users/        # User management
│   │   ├── gyms/         # Gym management
│   │   ├── leads/        # Lead management
│   │   ├── database/     # Migrations
│   │   └── main.ts       # Entry point
│   └── package.json
│
└── frontend/             # React + Vite Frontend
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── App.jsx       # Main app component
    │   └── main.jsx      # Entry point
    ├── tailwind.config.js
    └── package.json
```

## 💻 Frontend Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Toastify** - Toast notifications
- **Google OAuth** - Authentication

## 🔧 Available Scripts

### Backend
- `npm run build` - Build the application
- `npm run start:dev` - Start in development mode with hot-reload
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run migration:run` - Run database migrations
- `npm run migration:revert` - Revert last migration

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Security

- JWT tokens are used for authentication
- Passwords are not stored (Google OAuth handles authentication)
- CORS is enabled for cross-origin requests
- Environment variables are used for sensitive configuration

## 📝 Notes

- The application uses TypeORM with PostgreSQL
- Database synchronization is disabled (`synchronize: false`) - use migrations instead
- Migrations run automatically on application start (`migrationsRun: true`)
- The default port is 3000, but can be configured via the `PORT` environment variable

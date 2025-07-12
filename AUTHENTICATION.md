# Authentication Setup

This project uses NextAuth.js for authentication with a separate backend API.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Backend API URL
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Backend API Endpoints

Your backend should implement these endpoints:

### POST `/api/auth/signup`
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "username": "johndoe123",
    "password": "password123"
  }
  ```
- **Response (Success):**
  ```json
  {
    "message": "User created successfully"
  }
  ```
- **Response (Error):**
  ```json
  {
    "message": "Email already exists",
    "errors": {
      "email": "Email already exists"
    }
  }
  ```

### POST `/api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (Success):**
  ```json
  {
    "id": "user-id",
    "email": "john@example.com",
    "name": "John Doe",
    "username": "johndoe123",
    "avatar": "https://example.com/avatar.jpg"
  }
  ```
- **Response (Error):**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

## Features

### ✅ Implemented
- [x] NextAuth.js configuration
- [x] Signup form with validation
- [x] Login form with validation
- [x] Protected routes component
- [x] User menu with sign out
- [x] Session management
- [x] Error handling
- [x] Success messages
- [x] Loading states

### 🔄 Usage

#### Protected Routes
```tsx
import { ProtectedRoute } from "@/components/custom";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard content</div>
    </ProtectedRoute>
  );
}
```

#### User Session
```tsx
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
    </div>
  );
}
```

#### Sign Out
```tsx
import { signOut } from "next-auth/react";

const handleSignOut = () => {
  signOut({ callbackUrl: "/" });
};
```

## Security Notes

1. **NEXTAUTH_SECRET**: Generate a strong secret key
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure CORS on your backend
4. **Password Hashing**: Ensure passwords are hashed on the backend
5. **Rate Limiting**: Implement rate limiting on auth endpoints

## Development

1. Start your backend server
2. Set up environment variables
3. Run `npm run dev`
4. Test signup and login flows

## Production Deployment

1. Set `NEXTAUTH_URL` to your production domain
2. Set `BACKEND_URL` to your production API
3. Generate a strong `NEXTAUTH_SECRET`
4. Deploy both frontend and backend 
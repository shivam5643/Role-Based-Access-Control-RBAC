# RBAC Blog Platform

A full-stack blog platform with role-based access control (RBAC) that provides different permissions for users and administrators.

## Features

- **Authentication**: JWT-based authentication system
- **Role-Based Access Control**: Different permissions for users and admins
- **Blog Management**: Create, read, update, and delete blog posts
- **Admin Dashboard**: Manage all posts and users with admin privileges
- **Responsive Design**: Works well on all device sizes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- ES Modules

### Frontend
- React
- TypeScript
- React Router
- Formik & Yup for form validation
- Axios for API requests

## Installation and Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-rbac
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=24h
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to http://localhost:3000



## RBAC Implementation

### User Roles
- **User**: Can read all posts, create posts, and manage their own posts
- **Admin**: Can manage all posts and has access to admin dashboard

### Permissions Matrix

| Action                | User | Admin |
|-----------------------|------|-------|
| View Posts            | ✅   | ✅    |
| Create Posts          | ✅   | ✅    |
| Edit Own Posts        | ✅   | ✅    |
| Delete Own Posts      | ✅   | ✅    |
| Edit Any Post         | ❌   | ✅    |
| Delete Any Post       | ❌   | ✅    |
| Access Admin Dashboard| ❌   | ✅    |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user info

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create a new post (authenticated)
- `PUT /api/posts/:id` - Update a post (authenticated & authorized)
- `DELETE /api/posts/:id` - Delete a post (authenticated & authorized)

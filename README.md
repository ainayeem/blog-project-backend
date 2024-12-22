# Blog Project API

The API enables users to manage blogs using features depending on their user roles (Admin and User) and includes authentication, authorization, and blog management functionality.

## Live URL: [Blog Project](https://myblog-project-backend.vercel.app/)

## Key Features:

- ### User Roles:
  - Admin: Can delete any blog of users, block users but cannot update any blog.
  - User: Can register, log in, create, update, and delete their personal blogs.
- ### Authentication & Authorization:
  - Users have to logged in to create, update, or delete any blog.
  - Admin and User roles have different permissions based on their actions.
- ### Blog Management:
  - Users can create, update, and delete their own blogs.
  - Blogs can be searched, sorted, and filtered via public API.

## API Endpoints:

- ### Authentication:
  - Register: `/api/auth/register` Create a new user.
  - Login: `/api/auth/login` Authenticate a user and generate a JWT token.
- ### Blog Management:
  - Get Blogs: `/api/blogs` Public endpoint to view all blogs with search, sort, and filter options.
  - Create Blog: `/api/blogs` Authenticated users can create blogs.
  - Update Blog: `/api/blogs/:id` Users can update their own blogs.
  - Delete Blog: `/api/blogs/:id` Users can delete their own blogs.
- ### Admin Actions:
  - Block User: `/api/admin/users/:userId/block` Admin can block users.
  - Delete Blog: `/api/admin/blogs/:id` Admin can delete any blog.

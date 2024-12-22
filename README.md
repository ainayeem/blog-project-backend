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

## Folder Structure:

e:/Web2/03_Backend/blog-project/src/
├── app/
│ ├── config/
│ │ └── index.ts
│ ├── errors/
│ │ ├── AppError.ts
│ │ ├── handleCastError.ts
│ │ ├── handleDuplicateError.ts
│ │ ├── handleValidationError.ts
│ │ └── handleZodError.ts
│ ├── interface/
│ │ ├── error.ts
│ │ └── index.d.ts
│ ├── middlewares/
│ │ ├── auth.ts
│ │ ├── globalErrorhandler.ts
│ │ ├── notFound.ts
│ │ └── validateRequest.ts
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.interface.ts
│ │ │ ├── auth.service.ts
│ │ │ └── auth.validation.ts
│ │ ├── blog/
│ │ │ ├── blog.controller.ts
│ │ │ ├── blog.interface.ts
│ │ │ ├── blog.model.ts
│ │ │ ├── blog.route.ts
│ │ │ ├── blog.service.ts
│ │ │ └── blog.validation.ts
│ │ └── user/
│ │ ├── user.constant.ts
│ │ ├── user.controller.ts
│ │ ├── user.interface.ts
│ │ ├── user.model.ts
│ │ ├── user.route.ts
│ │ ├── user.service.ts
│ │ └── user.validation.ts
│ ├── routes/
│ │ └── index.ts
│ └── utils/
│ ├── catchAsync.ts
│ └── sendResponse.ts
├── app.ts
└── server.ts

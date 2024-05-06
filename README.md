# API Management Users

API Management Users is a Node.js application that provides comprehensive user management functionalities. It includes full CRUD operations for users, JWT-based authentication, login capabilities, and password recovery with email notifications. This API is designed to streamline user management processes and ensure secure authentication and data management.

## Features

- **User Management**: Perform CRUD operations (Create, Read, Update, Delete) on user data.
- **Authentication**: Secure endpoints with JWT (JSON Web Tokens) authentication.
- **Login**: Enable users to authenticate and obtain JWT tokens for access.
- **Password Recovery**: Allow users to reset their passwords via email notifications.

## Installation

1. Clone the repository: `git clone https://github.com/your_username/api_management_users.git`
2. Navigate to the project directory: `cd api_management_users`
3. Install dependencies: `npm install`
4. Set up environment variables (see Configuration section).
5. Start the server: `npm start`

## User Management
Perform CRUD operations on user data using the following endpoints:

- GET /login: Make the login in the API.
- GET /logout: Make logout of the API.
- GET /user/recoverpassword: Request a recovering of your password. The function of send an email with the link to recover will be implemented in the future.
- GET /user/changepassword: Change your password after your recovering request.
- GET /user: Get all users.
- GET /user/:id: Get a specific user by ID.
- POST /user: Create a new user.
- PUT /user/:id: Update an existing user.
- DELETE /user/:id: Delete an user.

## Configuration

Configure the application by setting the following environment variables:

- `PORT`: Port number for the server (default is 8686).
- `JWT_SECRET`: Secret key for JWT token generation.
- `SESSION_SECRET`: Secret key for Session generation.
- `PASSWORD_DATABASE`: Database password.


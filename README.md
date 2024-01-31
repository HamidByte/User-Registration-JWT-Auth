# User Registration JWT Auth

This API, built with Node.js, Express, and MongoDB, facilitates seamless user registration, account
activation, and secure login functionalities. Utilizing JSON Web Tokens (JWT) for authentication and
authorization, it ensures protected access to endpoints, offering a comprehensive solution for user
management.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Install locally or use MongoDB Atlas for a cloud-based
  solution.)
- [Git](https://git-scm.com/) (optional but recommended)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HamidByte/User-Registration-JWT-Auth.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd User-Registration-JWT-Auth
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a .env file in the root of the project and set the variables:

5. **Update Configurations:**

   Modify the configuration files in the `config` directory according to your needs.

6. **Update your scripts in `package.json` for a cross-platform solution:**

   If you are working in a Windows environment and using the Command Prompt, you should use the
   `set` command to set environment variables.

   ```json
    "scripts": {
      "start": "nodemon index.js",
      "dev": "set NODE_ENV=development && nodemon index.js",
      "prod": "set NODE_ENV=production && nodemon index.js",
    }
   ```

   If you are working in a Unix-like environment (Linux or macOS), you should use the `export`
   command to set environment variables.

   ```json
    "scripts": {
      "start": "nodemon index.js",
      "dev": "export NODE_ENV=development && nodemon index.js",
      "prod": "export NODE_ENV=production && nodemon index.js",
    }
   ```

   Make sure to check your environment and use the appropriate command accordingly.

7. **Run the Application:**

- For development:

  ```bash
  npm start
  ```

  or

  ```bash
  npm run dev
  ```

- For production:

  ```bash
  npm run prod
  ```

The server will run at http://localhost:3000 by default.

## Endpoints

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Register a new user with a first name, last name, email address, and password.
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully. Please check your email for activation."
  }
  ```

### Activate Account

- **Endpoint:** `/activate/:token`
- **Method:** `GET`
- **Description:** Activate a user account using the activation token sent via email.
- **Parameters:**
  - `token`: Activation token received via email.
- **Response:**
  ```json
  {
    "message": "Account activated successfully."
  }
  ```

### Resend Activation Link

- **Endpoint:** `/resend-activation`
- **Method:** `POST`
- **Description:** Resend the activation link to a user who hasn't activated the account within the
  specified time.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Activation link resent successfully. Please check your email for activation."
  }
  ```

### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticate the user and generate a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
  }
  ```

### Protected Profile Route

- **Endpoint:** `/profile`
- **Method:** `GET`
- **Description:** Access the user's profile route. Requires a valid JWT token.
- **Authorization Header:** Bearer Token
- **Response:**
  ```json
  {
    "message": "Profile route accessed by user with ID: <userId>"
  }
  ```

### Forget Password

- **Endpoint:** `/forget-password`
- **Method:** `POST`
- **Description:** Initiate the process of resetting the user's password by sending a reset link to
  their email.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Reset link sent successfully. Please check your email."
  }
  ```

### Reset Password

- **Endpoint:** `/reset-password/:token`
- **Method:** `POST`
- **Description:** Reset the user's password using the reset token sent via email.
- **Parameters:**
  - `token`: Reset token received via email.
- **Request Body:**
  ```json
  {
    "newPassword": "newPassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password reset successful."
  }
  ```

### 404 Page Not Found

- **Description:** Catch-all route to handle 404 errors.
- **Response:**
  ```json
  {
    "message": "Page not found"
  }
  ```

This catch-all route will respond with a 404 status and a JSON message indicating that the requested
page is not found.

## Middleware

### JWT Verification Middleware

- **Middleware Function:** `verifyToken`
- **Description:** Verifies the JWT token included in the Authorization header. Applied to protected
  routes.

### Notes

- Ensure to include the JWT token in the Authorization header as Bearer Token for protected routes.
- Use the provided activation link or resend-activation endpoint for account activation.
- For security reasons, keep sensitive information such as JWT secret keys and email credentials in
  a secure configuration file (e.g., environment variables).

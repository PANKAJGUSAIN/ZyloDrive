
---

# User Registration API

This is a simple MERN (MongoDB, Express, React, Node.js) stack application to handle user registration with basic validation, password hashing, and JWT-based authentication.

## Features

- User registration via `/users/register` route
- Password hashing using `bcrypt`
- JWT token generation for authentication  using `jsonwebtoken`
- Data validation using `express-validator`

## Project Structure

The project follows a typical MERN stack structure with the following key files:

- **`user.model.js`**: Defines the MongoDB schema for the user, including methods for password hashing, authentication token generation, and password comparison.
- **`user.service.js`**: Contains the business logic for user creation and validation.
- **`user.route.js`**: Handles the HTTP routes for user registration and validation.
- **`user.controller.js`**: Contains the logic for handling registration requests and responding with appropriate tokens and user data.

## API Endpoints

### `POST /users/register`

Registers a new user.

#### Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Validation Rules:

- **email**: Must be a valid email format.
- **fullname.firstname**: At least 3 characters long.
- **fullname.lastname**: Optional, but if provided, must be at least 3 characters long.
- **password**: Must be at least 6 characters long.

#### Response:

```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "_id": "user_id",
    "email": "john.doe@example.com",
    "socketId": "optional_socket_id"
  }
   
}
```

#### Error Responses:

If any validation fails:

```json
{
    "errors": [
        {
            "type": "field",
            "value": "te",
            "msg": "Last name must be at least 3 characters long",
            "path": "fullname.lastname",
            "location": "body"
        }
    ]
}
```

## How to Run

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or use MongoDB Atlas for cloud database

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project folder:

   ```bash
   cd <project_folder>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your `.env` file with necessary environment variables:

   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server:

   ```bash
   npm start
   ```

### Testing

You can test the registration endpoint using tools like Postman or CURL.

#### Example CURL Request:

```bash
curl -X POST http://localhost:5000/users/register \
-H "Content-Type: application/json" \
-d '{"fullname": {"firstname": "John", "lastname": "Doe"}, "email": "john.doe@example.com", "password": "securepassword123"}'
```

## Notes

- Passwords are hashed before being stored in the database for security.
- A JWT token is generated upon successful registration and sent back in the response for use in authentication on subsequent requests.

---

This `README.md` file gives an overview of your user registration API, how to set it up, and how to interact with it. Let me know if you need any adjustments!
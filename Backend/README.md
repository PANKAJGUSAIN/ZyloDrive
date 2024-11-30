# Backend API Documentation
---
## Packages Used
   This project uses the following dependencies:
<ul> 
  <li><code>bcrypt (^5.1.1)</code>: A library to hash and check passwords.</li> 
  <li><code>cors (^2.8.5)</code>: A package for enabling Cross-Origin Resource Sharing (CORS) in your app.</li>
  <li><code>dotenv (^16.4.5)</code>: Loads environment variables from a <code>.env</code> file.</li>
  <li><code>express (^4.21.1)</code>: A fast, unopinionated, minimalist web framework for Node.js.</li> 
  <li><code>express-validator (^7.2.0)</code>: A set of middleware for validating and sanitizing request data.</li>
  <li><code>jsonwebtoken (^9.0.2)</code>: A package to work with JSON Web Tokens (JWT).</li> 
  <li><code>mongoose (^8.8.3)</code>: A MongoDB object modeling tool designed to work in an asynchronous environment.</li>
</ul>

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
   PORT = 3000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server:

   ```bash
   npm start
   ```
## Api Endpoints
<details>
  <summary>
    <h2> /users/register</h2>
  </summary>

## Feature

- User registration via `/users/register` route
- Password hashing using `bcrypt`
- JWT token generation for authentication  using `jsonwebtoken`
- Data validation using `express-validator`

## Structure

The project follows a typical MERN stack structure with the following key files:

- **`user.model.js`**: Defines the MongoDB schema for the user, including methods for password hashing, authentication token generation, and password comparison.
- **`user.service.js`**: Contains the business logic for user creation and validation.
- **`user.route.js`**: Handles the HTTP routes for user registration and validation.
- **`user.controller.js`**: Contains the logic for handling registration requests and responding with appropriate tokens and user data.


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
</details>

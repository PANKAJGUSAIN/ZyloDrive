[# Backend API Documentation
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
   <li><code>cookie-parser (^1.4.7)</code>: for parsing cookies</li>
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
## Models

<details>
  <summary>
    <h2> User  <a href="https://github.com/PANKAJGUSAIN/ZyloDrive/blob/main/Backend/models/user.model.js" >-></a> </h2>
  </summary>

```markdown
# User Model - Mongoose Schema

This contains a Mongoose schema and model for the `User` entity, representing a user in the application. It includes fields for the user's personal information, authentication details, and methods for password hashing, comparison, and token generation.

## Features

- **User Information**: Includes the user's first name, last name, email, and socket ID.
- **Authentication**: Supports JWT-based authentication to securely sign in users and create session tokens.
- **Password Management**: Includes methods for hashing and comparing passwords.
- **Socket ID**: Allows for real-time communication by storing the user's socket connection ID (optional).

## Schema Structure

- **fullname**: Contains `firstname` (required, at least 3 characters) and `lastname` (optional, at least 3 characters).
- **email**: A required field, must be unique, and have a minimum length of 5 characters.
- **password**: A required field, used for authentication, and excluded from queries by default (`select: false`).
- **socketId**: A string to store the socket connection ID for real-time communication (optional).

## Methods

- **generateAuthToken**: Generates a JWT token for the user with a 24-hour expiration. The token is signed using the user's `_id` and a secret key from the environment (`process.env.JWT_SECRET`).
- **comparePassword**: Compares the provided plain text password with the hashed password stored in the database using `bcrypt`.
- **hashPassword**: A static method that hashes a plain text password using `bcrypt` with a salt factor of 10.

## Environment Variables

Ensure that the following environment variable is set in your `.env` file:

- `JWT_SECRET`: Secret key used to sign JWT tokens.

## Dependencies

- `mongoose`: ODM for MongoDB.
- `bcrypt`: Library for hashing and comparing passwords.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
```

</details>


<details>
  <summary>
    <h2> Captain <a href="https://github.com/PANKAJGUSAIN/ZyloDrive/blob/main/Backend/models/captain.model.js" >-></a> </h2>
  </summary>

```markdown
# Captain Model - Mongoose Schema

This contains a Mongoose schema and model for the `Captain` entity, representing a captain (driver) in the application. It includes fields for the captain's personal information, vehicle details, location, and methods for authentication and password management.

## Features

- **Captain Information**: Includes the captain's first name, last name, email, password, and socket ID.
- **Vehicle Information**: Captures the captain's vehicle details, such as color, plate, capacity, and vehicle type.
- **Status**: Tracks whether the captain is active or inactive (whether they are available to take rides).
- **Location**: Optional coordinates (latitude and longitude) to represent the captain's location.
- **Authentication**: Supports JWT-based authentication to securely sign in captains and generate session tokens.
- **Password Management**: Includes methods for hashing and comparing passwords.

## Schema Structure

- **fullname**: Contains `firstname` (required, at least 3 characters) and `lastname` (optional, at least 3 characters).
- **email**: A required field, must be unique, and match a valid email format.
- **password**: A required field, used for authentication, and excluded from queries by default (`select: false`).
- **socketId**: A string to store the socket connection ID for real-time communication (optional).
- **status**: A field to track the captain's availability, with possible values of `'active'` or `'inactive'`. Defaults to `'inactive'`.
- **vehicle**: Contains the captain's vehicle information:
  - `color`: Required, at least 3 characters.
  - `plate`: Required, at least 3 characters.
  - `capacity`: Required, must be at least 1.
  - `vehicleType`: Required, can be one of `'car'`, `'motorcycle'`, or `'auto'`.
- **location**: Optional coordinates for the captain’s location with `lat` and `long` fields, both of which are numbers.

## Methods

- **generateAuthToken**: Generates a JWT token for the captain with a 24-hour expiration. The token is signed using the captain's `_id` and a secret key from the environment (`process.env.JWT_SECRET`).
- **comparePassword**: Compares the provided plain text password with the hashed password stored in the database using `bcrypt`.
- **hashPassword**: A static method that hashes a plain text password using `bcrypt` with a salt factor of 10.

## Environment Variables

Ensure that the following environment variable is set in your `.env` file:

- `JWT_SECRET`: Secret key used to sign JWT tokens.

## Dependencies

- `mongoose`: ODM for MongoDB.
- `bcrypt`: Library for hashing and comparing passwords.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
```
</details>

<details>
  <summary>
    <h2>BlacklistToken <a href="https://github.com/PANKAJGUSAIN/ZyloDrive/blob/main/Backend/models/blacklistToken.model.js" >-></a></h2>
  </summary>

```markdown
# Blacklist Token Model - Mongoose Schema

This  contains a Mongoose schema and model for blacklisting JWT tokens, ensuring that invalidated or revoked tokens are automatically removed after a set period (24 hours).

## Features

- **Token Storage**: Stores blacklisted JWT tokens to prevent their reuse.
- **TTL (Time-To-Live)**: Automatically deletes blacklisted tokens from the database after 24 hours.
- **Uniqueness**: Ensures that each blacklisted token is unique in the collection.
  
## Schema Structure

- **token**: The JWT token that has been blacklisted. This field is required and unique in the collection.
- **createdAt**: The timestamp indicating when the token was blacklisted. This field is automatically set to the current date and time when the token is created.

## TTL (Time-To-Live)

- A TTL index is set on the `createdAt` field to automatically delete documents after 24 hours (86400 seconds). This ensures that blacklisted tokens are removed from the collection after 24 hours, preventing unnecessary storage of invalid tokens.

## Example Use Case

The `BlacklistToken` model can be used to track tokens that have been invalidated (e.g., when a user logs out or when their session is terminated). This helps ensure that a user cannot reuse a token after it has been blacklisted.

## Dependencies

- `mongoose`: ODM for MongoDB, used to define and interact with the MongoDB collection.
```
</details>
   
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
<details>
  <summary>
    <h2> /users/login</h2>
  </summary>

---

### **Feature**

- **User login** functionality via the `/users/login` route.
- Verifies the **email** and **password**.
- Returns a **JWT token** upon successful login.
- Data validation using **`express-validator`**.

### **Structure**

The login route is handled by the following components:

- **`user.model.js`**: Defines the MongoDB schema for the user, including methods for password comparison and authentication token generation.
- **`user.controller.js`**: Contains the logic for handling login requests, validating credentials, and generating the JWT token.
- **`user.route.js`**: Handles the `/users/login` route and applies data validation.

### **Request Body**

```json
{
  "email": "emailid",
  "password": "password"
}
```

### **Validation Rules**

- **email**: Must be a valid email format.
- **password**: Must be at least 6 characters long.

### **Response**

#### **200 OK**

```json
{
  "token": "token",
  "user": {
    "fullname": {
      "firstname": "test_firstname",
      "lastname": "test_lastname"
    },
    "_id": "id",
    "email": "email",
    "password": "password",
    "__v": 0
  }
}
```

#### **Error Responses**

##### **401 Unauthorized - Invalid Email or Password**

If the email or password is incorrect:

```json
{
  "message": "Invalid useremail or password"
}
```

##### **400 Bad Request - Validation Errors**

If any validation fails (e.g., invalid email format or short password):

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

### **Testing**

You can test the login endpoint using tools like **Postman** or **CURL**.

#### **Example CURL Request**

```bash
curl -X POST http://localhost:5000/users/login \
-H "Content-Type: application/json" \
-d '{"email": "test@test.com", "password": "test_@353"}'
```

### **Notes**

- If the **user** is not found, or the **password** doesn't match, the response will return a `401 Unauthorized` status with a message indicating that the email or password is invalid.
- A **JWT token** is generated upon successful login and returned in the response. This token should be used for authenticating subsequent requests to protected endpoints.

</details>

<details>
  <summary>
    <h2> /users/profile</h2>
  </summary>


### **Feature**

- **User Profile** retrieval functionality via the `/users/profile` route.
- The route is protected and requires the user to be authenticated via a **JWT token**.
- There are two ways to pass the token:
  - **Via the Authorization header**: Use the format `Bearer ${token}`.
  - **Via a cookie**: The token is stored in a cookie after a successful login.
  
### **Middleware**

The **authentication middleware** is used to validate the JWT token before granting access to the profile route. The middleware checks for the token either in the request header or in the cookies.

```javascript
module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'UnAuthorized' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'UnAuthorized' });
    }
}
```

### **Request Method**

- **POST**: `/users/profile`

### **Request Headers**

- **Authorization** (Optional if the token is passed in cookies):
  - Format: `Bearer ${token}`
  
- **Cookie** (Optional if the token is passed in the header):
  - Format: `token=${token}`

### **Response**

#### **200 OK**

Upon successful authentication, the user's profile data will be returned.

```json
{
  "_id": "id",
  "fullname": {
    "firstname": "firstname",
    "lastname": "lastname"
  },
  "email": "email",
  "password": "password"
}
```

#### **Error Responses**

##### **401 Unauthorized**

If the token is missing, invalid, or expired, the response will return a `401 Unauthorized` status.

```json
{
  "message": "UnAuthorized"
}
```

### **Testing**

You can test the profile endpoint using tools like **Postman** or **CURL**.

#### **Example CURL Request (with Authorization Header)**

```bash
curl -X POST http://localhost:5000/users/profile \
-H "Authorization: Bearer ${token}"
```

#### **Example CURL Request (with Cookie)**

```bash
curl -X POST http://localhost:5000/users/profile \
-H "Content-Type: application/json" \
--cookie "token=${token}"
```

### **Notes**

- This route requires the user to be authenticated via a **JWT token**.
- The token can be passed in the **Authorization header** or in **cookies**.
- If the token is missing, invalid, or expired, the user will receive an `Unauthorized` response (`401` status).
- The response contains the **user profile data** after successful authentication.

---

</details>


<details>
  <summary>
    <h2> /users/logout</h2>
  </summary>

### **Feature**

- **User logout** functionality via the `/users/logout` route.
- Logs out the user by **removing the token** from the client-side cookies.
- It also blacklists the token to ensure it cannot be used again for authentication.

### **Middleware**

The **authentication middleware** (`authUser`) is used to verify the token before the user is logged out. It checks if the token is blacklisted or invalid.

```javascript
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isBlacklisted) {
      console.log('Token is blacklisted:', isBlacklisted);  // Log the blacklisted token
      return res.status(401).json({ message: 'Unauthorized Access!' });
    }

    // If token is valid and not blacklisted, proceed to authenticate the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;

    return next();  // Proceed to the logout action
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
```

---

### **BlacklistToken Model**

The **`BlacklistToken` model** is responsible for storing blacklisted tokens in the database. These are the tokens that have been invalidated or revoked, ensuring they can no longer be used for authentication.

#### **Schema Overview:**

The schema for the `BlacklistToken` model includes the following fields:

- **token**: A `String` that represents the blacklisted JWT token. It is marked as required and unique, ensuring that each token can only be blacklisted once.
  
- **createdAt**: A `Date` field that represents when the token was added to the blacklist. It has a default value of the current time (`Date.now`), and it is used to set the TTL (Time-to-Live) for the token in the collection.

#### **TTL (Time-To-Live):**

The `createdAt` field is indexed with a TTL of **24 hours**. This means that once a token is added to the blacklist, it will automatically be deleted from the database after 24 hours (86400 seconds).

This TTL feature is enabled using MongoDB's TTL index mechanism. The benefit is that expired tokens are automatically removed from the collection, ensuring that the database does not grow unnecessarily.

#### **Schema Code:**

```javascript
const mongoose = require('mongoose');

// Schema for blacklisting token with TTL (Time-To-Live) of 24 hours
const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // Ensures each token is unique in the collection
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current time
    },
  },
  { timestamps: true }
);

// Create a TTL index to automatically delete documents after 24 hours (86400 seconds)
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const blacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema , 'blacklistedtokens');

module.exports = blacklistTokenModel;
```

### **How It Works**

1. When a user logs out, their JWT token is added to the `blacklistedtokens` collection, making it invalid for future authentication requests.
2. The token is stored in the collection with a `createdAt` timestamp.
3. After **24 hours**, the token is automatically deleted from the collection due to the TTL index, meaning the token will only be blacklisted for a limited period.

### **Usage in Middleware**

In the `/users/logout` route, the `blacklistTokenModel` is used to check if a token has been blacklisted before allowing access to the route:

```javascript
const isBlacklisted = await blacklistTokenModel.findOne({ token });
if (isBlacklisted) {
  return res.status(401).json({ message: 'Unauthorized Access!' });
}
```

This ensures that a blacklisted token cannot be used for logout or future requests, adding an additional layer of security.

---

### **Request Method**

- **GET**: `/users/logout`

### **Response**

#### **200 OK**

Upon successful logout, the server will clear the cookie containing the token and the response will indicate the successful logout.

```json
{
  "message": "Logged out successfully"
}
```

#### **Error Responses**

##### **401 Unauthorized**

If the token is missing, invalid, or already blacklisted:

```json
{
  "message": "Unauthorized"
}
```

### **Testing**

You can test the logout endpoint using tools like **Postman** or **CURL**.

#### **Example CURL Request**

```bash
curl -X GET http://localhost:5000/users/logout \
-H "Authorization: Bearer ${token}"
```

#### **Example CURL Request (with Cookie)**

```bash
curl -X GET http://localhost:5000/users/logout \
--cookie "token=${token}"
```

### **Notes**

- The token will be **removed from the cookies** and **blacklisted** to prevent further use.
- If the token is missing or invalid, the user will receive a `401 Unauthorized` response.
- Ensure that the **Authorization header** or the **cookie** is sent with the request in order to authenticate and log out the user.

---
</details>
<details>
   <summary>
    <h2> /maps  </h2>
  </summary>

## **Base Route**
All routes start with the `/maps` base route.

---

## **1. Fetch Coordinates of an Address**

### **Route**
`GET /maps/get-coordinates`

### **Description**
Retrieves the latitude and longitude for a given address.

### **Request Query Parameters**
- `address` (string, required): The address to retrieve coordinates for. Must have a minimum length of 3 characters.

### **Authentication**
The route is protected by the `authUser` middleware.

### **Response**
#### **200 OK**
Returns the coordinates of the address:
```json
{
  "ltd": <latitude>,
  "lng": <longitude>
}
```

#### **400 Bad Request**
If validation fails or the address is not provided:
```json
{
  "errors": [
    { "msg": "Invalid value", "param": "address", "location": "query" }
  ]
}
```

#### **404 Not Found**
If the address cannot be found:
```json
{
  "message": "Coordinates not found"
}
```

---

## **2. Fetch Distance and Time Between Two Points**

### **Route**
`GET /maps/get-distance-time`

### **Description**
Calculates the distance and estimated travel time between two locations.

### **Request Query Parameters**
- `origin` (string, required): The starting point. Must have a minimum length of 3 characters.
- `destination` (string, required): The ending point. Must have a minimum length of 3 characters.

### **Authentication**
The route is protected by the `authUser` middleware.

### **Response**
#### **200 OK**
Returns the distance and travel time:
```json
{
  "distance": {
    "text": "<distance in readable format>",
    "value": <distance in meters>
  },
  "duration": {
    "text": "<duration in readable format>",
    "value": <duration in seconds>
  }
}
```

#### **400 Bad Request**
If validation fails or parameters are missing:
```json
{
  "errors": [
    { "msg": "Invalid value", "param": "origin", "location": "query" },
    { "msg": "Invalid value", "param": "destination", "location": "query" }
  ]
}
```

#### **404 Not Found**
If no route is found:
```json
{
  "message": "No routes found"
}
```

---

## **3. Fetch Address Suggestions**

### **Route**
`GET /maps/get-suggestions`

### **Description**
Provides autocomplete suggestions for a given address query.

### **Request Query Parameters**
- `address` (string, required): The partial address or query for suggestions. Must have a minimum length of 3 characters.

### **Authentication**
The route is protected by the `authUser` middleware.

### **Response**
#### **200 OK**
Returns a list of address suggestions:
```json
[
  {
    "description": "<suggested address>",
    "place_id": "<Google place ID>"
  },
  ...
]
```

#### **400 Bad Request**
If validation fails or the address query is missing:
```json
{
  "errors": [
    { "msg": "Invalid value", "param": "address", "location": "query" }
  ]
}
```

---

## **Notes**
- Ensure the API key for Google Maps services is set in the environment variable `GOOGLE_MAPS_API`.
- The routes require the `authUser` middleware for secure access.
- Validation rules for query parameters are implemented using `express-validator`.

---

</details>

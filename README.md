#Task Management System Documentation
##This API provides a basic authentication and task management system. Users can register, log in, create, update, delete, and view tasks.
________________________________________
Authentication Endpoints
POST /api/auth/register
•	Description: Registers a new user by creating a new user record in the database.
•	Request Body:
{
  "username": "string",
  "password": "string"
}
•	Response:
  201 Created: User registered successfully.
  { "message": "User registered successfully" }
  400 Bad Request: User already exists.
  { "message": "User already exists" }
  500 Internal Server Error: Something went wrong on the server.
  { "message": "Internal server error" }
  Example:
    Request:
  {
    "username": "johnDoe",
    "password": "securePassword123"
  }
  Response:
  { "message": "User registered successfully" }
  
POST /api/auth/login
•	Description: Authenticates an existing user and returns a JWT token upon successful login.
•	Request Body:
{
  "username": "string",
  "password": "string"
}
  Response:
  200 OK: Successfully authenticated. JWT token is returned.
  { "token": "jwt_token_string" }
  404 Not Found: User not found.
  { "message": "User not found!" }
  400 Bad Request: Invalid credentials.
  { "message": "Invalid credentials" }
  500 Internal Server Error: Something went wrong on the server.
  { "message": "Internal server error" }
  Example:
    Request:
    {
      "username": "johnDoe",
      "password": "securePassword123"
    }
    Response:
    { "token": "jwt_token_string" }
    
________________________________________
##Task Management Endpoints
  Authentication middleware is required for all task-related endpoints. Ensure to pass a valid JWT token in the request   header Authorization: Bearer <token>.
POST /api/tasks/create
•	Description: Creates a new task for the authenticated user.
•	Request Body:
  {
    "todo": "Task description"
  }
•	Response:
o	201 Created: Task created successfully.
{ "message": "Task created successfully" }
o	500 Internal Server Error: Something went wrong on the server.
{ "message": "Internal server error" }
•	Example:
o	Request:
{
  "todo": "Complete the task API documentation"
}
o	Response:
{ "message": "Task created successfully" }
GET /api/tasks/get
•	Description: Retrieves all tasks for the authenticated user.
•	Response:
o	200 OK: Returns an array of tasks.
 [
  {
    "_id": "task_id",
    "userId": "user_id",
    "todo": "Task description",
    "isCompleted": false
  },
  ...
]
o	500 Internal Server Error: Something went wrong on the server.
{ "message": "Internal server error" }
•	Example:
o	Response:
 [
  {
    "_id": "60b8d90d5f4a7b2d3c45e36b",
    "userId": "60b8d8db5f4a7b2d3c45e36a",
    "todo": "Complete the task API documentation",
    "isCompleted": false
  },
  {
    "_id": "60b8d90d5f4a7b2d3c45e36c",
    "userId": "60b8d8db5f4a7b2d3c45e36a",
    "todo": "Review pull requests",
    "isCompleted": true
  }
]
PUT /api/tasks/edit
•	Description: Updates an existing task's description.
•	Request Body:
{
  "id": "task_id",
  "todo": "Updated task description"
}
•	Response:
o	200 OK: Task updated successfully.
{ "message": "Task updated successfully", "task": updated_task }
o	404 Not Found: Task not found.
{ "message": "Task not found" }
o	500 Internal Server Error: Something went wrong on the server.
{ "message": "Internal server error" }
•	Example:
o	Request:
{
  "id": "60b8d90d5f4a7b2d3c45e36b",
  "todo": "Complete the API documentation and submit"
}
o	Response:
{ "message": "Task updated successfully", "task": { "_id": "60b8d90d5f4a7b2d3c45e36b", "todo": "Complete the API documentation and submit", "isCompleted": false } }
DELETE /api/tasks/delete
•	Description: Deletes a task.
•	Request Body:
{
  "id": "task_id"
}
•	Response:
o	200 OK: Task deleted successfully.
{ "message": "Task deleted successfully" }
o	404 Not Found: Task not found.
{ "message": "Task not found" }
o	500 Internal Server Error: Something went wrong on the server.
{ "message": "Internal server error" }
•	Example:
o	Request:
{
  "id": "60b8d90d5f4a7b2d3c45e36b"
}
o	Response:
{ "message": "Task deleted successfully" }
________________________________________
Authentication Middleware
•	Purpose: Ensures that the user is authenticated before accessing task management endpoints.
•	The middleware checks for the presence of a valid JWT in the Authorization header (Bearer <token>).
•	If the token is valid, the user ID is extracted from the token and added to the req object as req.userId, allowing access to the user’s tasks.
•	If the token is missing or invalid, a 401 Unauthorized response is returned.
________________________________________
Error Handling
For all requests:
•	If there is an internal server error, a generic 500 Internal Server Error response will be returned.
•	If the request cannot be processed due to invalid input (e.g., missing required fields), an appropriate error message with a 400 Bad Request status will be returned.
________________________________________
Notes
•	All task-related endpoints require authentication, which means the user must include a valid JWT token in the Authorization header of their requests.
•	JWT token expiry is set to 1 hour, after which the user will need to log in again to get a new token.

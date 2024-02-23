# NodeJS - TaskMagnet : Attracting Efficiency in Project Management

Effortlessly organize and manage tasks with TaskMagnet, a robust web application. Featuring user authentication, task CRUD operations, and project management, this Node.js project uses Express.js, TypeScript, Prisma, and PostgreSQL

# TaskMagnet

## Created by: Kukuh Tri Winarno Nugroho

- LinkedIn: [Kukuh Tri Winarno Nugroho](https://www.linkedin.com/in/kukuhtri99/)
- Website: [kukuhtri.my.id](https://kukuhtri.my.id/)

---

**Description:**

TaskMagnet is a powerful Task Manager web application designed to help users organize and manage their tasks effectively. With a user-friendly interface, it allows the creation, update, and deletion of tasks while providing categorization into different projects. This project utilizes Node JS, Express JS, TypeScript, Prisma, and PostgreSQL.

---

**Key Features:**

- **User Authentication:**

  - Implement user authentication and authorization using technologies like Passport.js.
  - Allow users to register, login, and manage their accounts.

- **Task CRUD Operations:**

  - Enable users to create, read, update, and delete tasks.
  - Each task includes a title, description, due date, priority, and status.

- **Project Management:**

  - Implement the ability to create projects and assign tasks to specific projects.
  - Users can view tasks based on their associated projects.

- **User Dashboard:**

  - Create a personalized dashboard for each user displaying an overview of their tasks, upcoming deadlines, and project progress.

- **Real-time Collaboration:**

  - Implement real-time updates using technologies like Socket.io to enable collaboration on tasks without refreshing the page.

- **Task Filtering and Sorting:**

  - Provide options for users to filter and sort tasks based on due date, priority, status, and other relevant criteria.

- **Notifications:**

  - Implement a notification system to remind users of upcoming task deadlines and other important updates.

- **Responsive Design:**

  - Ensure the web application is responsive and works seamlessly on different devices, including desktops, tablets, and mobile phones.

- **Data Persistence:**

  - Utilize a PostgreSQL database to store user accounts, tasks, and project information, ensuring data persistence.

- **Security Measures:**

  - Implement security best practices to protect user data and prevent common web application vulnerabilities.

- **Logging and Error Handling:**

  - Set up logging mechanisms to track application activities and implement error handling for a smooth user experience.

- **Deployment:**
  - Deploy the application on a cloud platform and ensure proper configuration for production.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- PostgreSQL database server running.
- Git installed.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kukuhtri1999/NodeJS---TaskMagnet.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaskMagnet
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the PostgreSQL database:

   - Create a new database and update the database configuration in `prisma/.env`.

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:3000`.

## API Documentation

Explore the API endpoints using Swagger documentation. Visit `http://localhost:3000/api-docs` in your browser.

## Deploying to Production

To deploy TaskMagnet to a production environment, follow these steps:

1. Set up a production-ready PostgreSQL database.

2. Update the database configuration in `prisma/.env` with production credentials.

3. Build the TypeScript project:

   ```bash
   npm run build
   ```

4. Start the production server:

   ```bash
   npm start
   ```

   The server will be running in production mode.

## Contributing

If you'd like to contribute to TaskMagnet, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Database Tables:**

- **Users:**

  - userId (Primary Key)
  - username
  - email
  - password (hashed)
  - firstName
  - lastName
  - createdAt
  - updatedAt

- **Projects:**

  - projectId (Primary Key)
  - projectName
  - description
  - startDate
  - endDate
  - userId (Foreign Key referencing Users table)
  - createdAt
  - updatedAt

- **Tasks:**

  - taskId (Primary Key)
  - title
  - description
  - dueDate
  - priority (Enum: Low, Medium, High)
  - status (Enum: To-Do, In Progress, Done)
  - projectId (Foreign Key referencing Projects table)
  - userId (Foreign Key referencing Users table)
  - createdAt
  - updatedAt

- **Labels:**

  - labelId (Primary Key)
  - labelName
  - createdAt
  - updatedAt

- **TaskLabels:**

  - taskLabelId (Primary Key)
  - taskId (Foreign Key referencing Tasks table)
  - labelId (Foreign Key referencing Labels table)
  - createdAt
  - updatedAt

- **Comments:**
  - commentId (Primary Key)
  - taskId (Foreign Key referencing Tasks table)
  - userId (Foreign Key referencing Users table)
  - comment
  - createdAt
  - updatedAt

---

**API Endpoints:**

**Authentication: with JWT**

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in a user with storing JWT token in cookie.
- GET /api/auth/logout: Log out a user and remove JWT token in the cookie.

**User Profile: need to login for JWT authentication**

- GET /api/user: Get all users.
- GET /api/user/profile/{id}: Get user profile by ID
- PUT /api/user/profile/{id}: Update user profile data by ID
- DELETE /api/user/profile/{id}: Delete user data by ID
- PUT /api/user/change-password/{id}: Change user password data by ID

**Project Management:**

- POST /api/project: Create a new project.
- GET /api/project: Get all projects available.
- GET /api/project/:projectId: Get details of a specific project by ID.
- PUT /api/project/:projectId/update: Update project details by ID.
- DELETE /api/project/:projectId: Delete a project by ID.

**Task Management:**

- POST /api/tasks/: Create a new task for a specific project ( you will need to login first, then userId of this task will be auto related with your logged in account).
- GET /api/tasks/user/:userId: Get all tasks for a user.
- GET /api/tasks/project/:projectId: Get all tasks for a project.
- GET /api/tasks/:taskId: Get details of a specific task.
- PUT /api/tasks/:taskId/update: Update task details.
- DELETE /api/tasks/:taskId/delete: Delete a task.

**Label Management:**

- POST /api/label: Create a new label.
- GET /api/label: Get all labels.
- GET /api/label/:labelId: Get details of a specific label.
- PUT /api/label/:labelId: Update label details.
- DELETE /api/label/:labelId: Delete a label.

**Comment Management:**

- POST /api/comment: Add a comment to a task.
- GET /api/comment/task/:taskId: Get comments for a task.
- GET /api/comment/user/:userId: Get comments from a user.
- GET /api/comment/:Id: Get detail of comment data by spesific Id.
- PUT /api/comment/:commentId: Update a comment.
- DELETE /api/comments/:commentId: Delete a comment.

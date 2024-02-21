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

**Modules:**

- **User Authentication Module:**

  - Register (Endpoint: /api/auth/register)
  - Login (Endpoint: /api/auth/login)
  - Logout (Endpoint: /api/auth/logout)
  - Update User Profile (Endpoint: /api/user/profile)
  - Change Password (Endpoint: /api/user/change-password)

- **Project Module:**

  - Create Project (Endpoint: /api/projects/create)
  - Get Projects by User (Endpoint: /api/projects/user/:userId)
  - Get Project Details (Endpoint: /api/projects/:projectId)
  - Update Project (Endpoint: /api/projects/:projectId/update)
  - Delete Project (Endpoint: /api/projects/:projectId/delete)

- **Task Module:**

  - Create Task (Endpoint: /api/tasks/create)
  - Get Tasks by User (Endpoint: /api/tasks/user/:userId)
  - Get Tasks by Project (Endpoint: /api/tasks/project/:projectId)
  - Get Task Details (Endpoint: /api/tasks/:taskId)
  - Update Task (Endpoint: /api/tasks/:taskId/update)
  - Delete Task (Endpoint: /api/tasks/:taskId/delete)

- **Label Module:**

  - Create Label (Endpoint: /api/labels/create)
  - Get All Labels (Endpoint: /api/labels)
  - Get Label Details (Endpoint: /api/labels/:labelId)
  - Update Label (Endpoint: /api/labels/:labelId/update)
  - Delete Label (Endpoint: /api/labels/:labelId/delete)

- **Comment Module:**
  - Add Comment to Task (Endpoint: /api/comments/create)
  - Get Comments for Task (Endpoint: /api/comments/task/:taskId)
  - Update Comment (Endpoint: /api/comments/:commentId/update)
  - Delete Comment (Endpoint: /api/comments/:commentId/delete)

---

**API Endpoints:**

**Authentication:**

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in a user.
- POST /api/auth/logout: Log out a user.
- PUT /api/user/profile: Update user profile.
- PUT /api/user/change-password: Change user password.

**Project Management:**

- POST /api/projects/create: Create a new project.
- GET /api/projects/user/:userId: Get all projects for a user.
- GET /api/projects/:projectId: Get details of a specific project.
- PUT /api/projects/:projectId/update: Update project details.
- DELETE /api/projects/:projectId/delete: Delete a project.

**Task Management:**

- POST /api/tasks/create: Create a new task.
- GET /api/tasks/user/:userId: Get all tasks for a user.
- GET /api/tasks/project/:projectId: Get all tasks for a project.
- GET /api/tasks/:taskId: Get details of a specific task.
- PUT /api/tasks/:taskId/update: Update task details.
- DELETE /api/tasks/:taskId/delete: Delete a task.

**Label Management:**

- POST /api/labels/create: Create a new label.
- GET /api/labels: Get all labels.
- GET /api/labels/:labelId: Get details of a specific label.
- PUT /api/labels/:labelId/update: Update label details.
- DELETE /api/labels/:labelId/delete: Delete a label.

**Comment Management:**

- POST /api/comments/create: Add a comment to a task.
- GET /api/comments/task/:taskId: Get comments for a task.
- PUT /api/comments/:commentId/update: Update a comment.
- DELETE /api/comments/:commentId/delete: Delete a comment.

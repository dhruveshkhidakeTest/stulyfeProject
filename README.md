
# Node.js Application

This is a simple Node.js application that uses Express, Firebase, and Sequelize to manage employee data.

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL
- Firebase project

### Installation

1. Clone the repository:

    bash
    git clone https://github.com/dhruveshkhidakeTest/stulyfeProject.git
    cd your-repo-name
    

2. Install the dependencies:

    bash
    npm install
    

3. Set up environment variables:

    Create a `.env` file in the root of your project and add the following:

    env
    database=your_database_name
    User=your_database_user
    password=your_database_password
    host=your_database_host
    

4. Set up Firebase:

    - Add your Firebase project's service account key JSON file as `stulyfe-secretKey.json` in the root directory.
    - Add your Firebase configuration JSON file as `firebaseconfig.json` in the `CommonFunction` directory.

### Running the Application

Start the server:

bash
npm start


The server will be running on `http://localhost:3000`.

## API Endpoints

### Register

**POST /register**

Register a new user.

- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)

**Example:**


{
  "email": "user@example.com",
  "password": "yourpassword"
}


### Login

**POST /login**

Login a user.

- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)

**Example:**


{
  "email": "user@example.com",
  "password": "yourpassword"
}


### Add Employee

**POST /employees**

Add a new employee. Requires authentication.

- **Headers:**
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - `Name` (string, required)
  - `Role` (string, required)
  - `Department` (string, required)
  - `Salary` (integer, required)

**Example:**


{
  "Name": "John Doe",
  "Role": "Developer",
  "Department": "Engineering",
  "Salary": 60000
}


### Retrieve All Employees

**GET /employees**

Retrieve all employees with pagination. Requires authentication.

- **Headers:**
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - `page` (integer, optional, default: 1)
  - `limit` (integer, optional, default: 1)

**Example:**


{
  "page": 1,
  "limit": 10
}


### Retrieve Single Employee

**GET /employees/:id**

Retrieve a single employee by ID. Requires authentication.

- **Headers:**
  - `Authorization: Bearer <token>`

### Update Employee

**PUT /employees/:id**

Update an employee by ID. Requires authentication.

- **Headers:**
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - `Name` (string, optional)
  - `Role` (string, optional)
  - `Department` (string, optional)
  - `Salary` (integer, optional)

**Example:**


{
  "Name": "John Smith",
  "Role": "Senior Developer",
  "Department": "Engineering",
  "Salary": 70000
}


### Delete Employee

**DELETE /employees/:id**

Delete an employee by ID. Requires authentication.

- **Headers:**
  - `Authorization: Bearer <token>`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Employee Management App

Employee Management App is a full-stack project to manage **Locations**, **Departments**, and **Employees**.

## Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Spring Boot (Java 17, Maven)
- **Database:** MySQL

## Repository Structure
- `employee_frontend/employee_management_app` - React UI
- `employee_backend/employee` - Spring Boot REST API

## Features
- CRUD operations for:
  - Locations
  - Departments
  - Employees
- Employee filters by:
  - Status
  - Salary threshold

## API Base URL
`http://localhost:8080`

### Main Endpoints
- `/api/locations/*`
- `/api/departments/*`
- `/api/employees/*`

## Prerequisites
- Node.js + npm
- Java 17
- Maven
- MySQL running locally

## Backend Setup
1. Open `employee_backend/employee/src/main/resources/application.properties`.
2. Update database credentials for your local MySQL setup.
3. Run:
   ```bash
   cd employee_backend/employee
   mvn spring-boot:run
   ```

Backend runs on: `http://localhost:8080`

## Frontend Setup
1. Run:
   ```bash
   cd employee_frontend/employee_management_app
   npm install
   npm start
   ```

Frontend runs on: `http://localhost:3000`

## Build and Test Commands
### Frontend
```bash
cd employee_frontend/employee_management_app
npm test -- --watchAll=false
npm run build
```

### Backend
```bash
cd employee_backend/employee
mvn test
mvn -DskipTests package
```

## Notes
- Start backend first, then frontend.
- Ensure MySQL is available before starting the backend.

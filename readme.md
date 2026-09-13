# ⚖️ Legal Case Management System

A full-stack web-based **Legal Case Management System** designed to centralize and organize information related to legal cases, clients, lawyers, court hearings, evidence, and case-lawyer assignments.

The application provides an interactive dashboard and structured case management interface, backed by a relational **MySQL database** and a **RESTful Node.js/Express API**.

---

## 📌 Overview

Managing legal case information across separate records can make it difficult to track clients, assigned lawyers, hearings, evidence, and case status efficiently.

The **Legal Case Management System** addresses this problem by providing a centralized platform where legal case-related information can be stored, retrieved, and managed through a web interface.

The system follows a **three-layer architecture**:

```text
┌──────────────────────────────────────────────┐
│              React Frontend                  │
│        User Interface & Dashboard            │
└──────────────────────┬───────────────────────┘
                       │
                 REST API / HTTP
                       │
┌──────────────────────▼───────────────────────┐
│         Node.js + Express Backend            │
│        API Layer & Business Logic            │
└──────────────────────┬───────────────────────┘
                       │
                     mysql2
                       │
┌──────────────────────▼───────────────────────┐
│              MySQL Database                  │
│        Relational Data & Database Logic      │
└──────────────────────────────────────────────┘


✨ Key Features
📊 Dashboard
Centralized overview of the legal case management system
Total clients, cases, lawyers, and hearings
Case status overview
Recent case information
Upcoming and recorded hearing information
👤 Client Management
View registered clients
Access client contact information
Associate clients with their legal cases
Add client records through the application
📁 Case Management
Maintain case records
Track case type and filing date
Track case status
Associate cases with clients
View case-related information from a centralized interface
👨‍⚖️ Lawyer Management
View registered lawyers
Display lawyer contact information
Display lawyer specialization
Associate lawyers with cases
🔗 Case-Lawyer Assignment
Maintain relationships between cases and lawyers
Retrieve assigned lawyer information for cases
Uses a dedicated relational mapping table
🏛️ Court Hearing Management
Maintain court hearing records
Track hearing date and time
Store court location
Associate hearings with specific cases
📄 Evidence Management
Maintain evidence associated with cases
Store evidence type and description
Link evidence records to the corresponding case

🛠️ Technology Stack
Category	Technologies
Frontend	React.js, JavaScript, HTML5, CSS3
Build Tool	Vite
Backend  	Node.js, Express.js
API       	REST API
Database	MySQL
Database   Driver	mysql2
Middleware	CORS, dotenv
Development Tools	VS Code, MySQL Workbench
Version Control	Git, GitHub

🏗️ Project Architecture
Legal-Case-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── database/
│   └── legal_case_system.sql
│
├── .gitignore
└── README.md
🗄️ Database Design

The application uses a relational MySQL database named:
legal_case_system
Core Entities
CLIENT
   │
   │ 1:N
   ▼
CASE_DETAILS
   │
   ├──────────────► COURT_HEARING
   │
   ├──────────────► EVIDENCE
   │
   │
   ▼
CASE_LAWYER
   ▲
   │
   │
LAWYER
Major Tables

The database contains the following major tables:
CLIENT
CASE_DETAILS
LAWYER
CASE_LAWYER
WITNESS
CASE_WITNESS
EVIDENCE
COURT_HEARING
AUDIT_LOG
Database Features

The database implementation includes:
Primary keys
Foreign keys
Composite keys
Relational mappings
Stored procedures
User-defined functions
Triggers
Audit logging

This structure allows related legal information to be stored consistently while maintaining relationships between cases, clients, lawyers, hearings, witnesses, and evidence.

🔄 Application Data Flow
For example, when the application retrieves client information:
User opens Client Page
        ↓
React Frontend
        ↓
GET /api/clients
        ↓
Express.js Backend
        ↓
mysql2
        ↓
MySQL CLIENT table
        ↓
JSON response
        ↓
React displays client records

The frontend does not directly connect to MySQL.
Instead, the Node.js/Express backend acts as the API layer between the React application and the MySQL database.

🔌 REST API
The current backend exposes the following endpoints:
Method	Endpoint	Description
GET	/api/test-db	Tests MySQL connectivity
GET	/api/clients	Retrieves client records
GET	/api/cases	Retrieves case records
GET	/api/lawyers	Retrieves lawyer records
GET	/api/assignments	Retrieves case-lawyer assignments
GET	/api/hearings	Retrieves court hearing records

Additional CRUD endpoints are being developed as the system evolves.

🚀 Getting Started
Prerequisites
Make sure the following are installed:
Node.js
npm
MySQL
MySQL Workbench
Git

1. Clone the Repository
git clone https://github.com/Aarushi1607/Legal-Case-Management-System.git
cd Legal-Case-Management-System

2. Set Up the Database
Open MySQL Workbench.
Run the SQL script:
database/legal_case_system.sql
This creates the database, tables, relationships, sample data, stored procedures, functions, and triggers.

3. Configure the Backend
Navigate to the backend directory:
cd backend
Install the required dependencies:
npm install
Create a .env file inside the backend folder:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=legal_case_system

Replace YOUR_MYSQL_PASSWORD with your local MySQL password.
⚠️ Security: Never commit the .env file to GitHub.

4. Start the Backend
From the backend directory, run:
node server.js
The API server will run at:
http://localhost:5000

You can test the database connection using:
http://localhost:5000/api/test-db

5. Start the Frontend
Open a second terminal.
Navigate to the frontend directory:
cd frontend
Install the required dependencies:
npm install
Start the development server:
npm run dev
The frontend will be available at:
http://localhost:5173

🔐 Security
The application follows basic security practices:
Database credentials are stored using environment variables.
.env is excluded from version control.
Database credentials are never hard-coded into frontend code.
The React frontend communicates with MySQL through the Express backend.
The frontend does not directly access the database.

📈 Current Development Status
✅ Completed
React frontend
Responsive dashboard interface
Client management interface
Case management interface
Lawyer interface
Hearing interface
Evidence interface
Case-lawyer assignment interface
MySQL relational database
Database relationships and constraints
Stored procedures
Database functions
Database triggers
Node.js/Express backend
MySQL connection using mysql2
REST API endpoints
Frontend-backend integration
Git version control
GitHub repository

🚧 In Progress
Complete CRUD operations for lawyers
Complete CRUD operations for clients
Complete CRUD operations for cases
Complete CRUD operations for hearings
Complete CRUD operations for evidence
Case-lawyer assignment management
Improved form validation
Enhanced error handling
Success and error notifications

🔮 Future Enhancements

Potential future improvements include:
🔐 User authentication and role-based access control
👨‍⚖️ Dedicated lawyer dashboard
📑 Legal document upload and management
🔔 Automated hearing reminders
🔎 Advanced case search and filtering
📊 Case analytics and reporting
📧 Email notifications
🤖 AI-powered legal case assistant
☁️ Cloud deployment
📱 Improved mobile responsiveness
🎯 Learning Outcomes

This project provides hands-on experience with:
Full-stack web application development
React component-based UI development
REST API design
Node.js and Express.js backend development
MySQL relational database design
SQL queries and relationships
Stored procedures, functions, and triggers
Frontend-backend integration
Environment variable management
Git and GitHub version control

👩‍💻 Author
Aarushi
Computer Science Engineering Student

GitHub:
https://github.com/Aarushi1607

📄 License
This project is currently intended for educational and portfolio purposes.
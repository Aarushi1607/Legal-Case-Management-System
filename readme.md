# ⚖️ Legal Case Management System

> A MySQL-based relational database system for managing legal cases, clients, lawyers, witnesses, evidence, and court hearings.

---

## 📌 Project Overview

The **Legal Case Management System** is a database management project designed to organize and manage information related to legal cases.

The system maintains relationships between clients, cases, lawyers, witnesses, evidence, and court hearings while demonstrating important **DBMS and SQL concepts**.

---

## ✨ Key Features

- 👤 Client management
- ⚖️ Legal case management
- 👨‍⚖️ Lawyer assignment and specialization tracking
- 👥 Witness management
- 📄 Evidence tracking
- 🏛️ Court hearing scheduling
- 🔄 Case status management
- 📊 Case analysis using SQL queries
- 📝 Automated audit logging
- ⚙️ Stored procedures for common operations
- 🔍 Custom SQL function for client case counting
- 🛡️ Trigger-based case status validation

---

## 🗄️ Database Architecture

The database consists of the following tables:

| Table | Purpose |
|---|---|
| `CLIENT` | Stores client information |
| `CASE_DETAILS` | Stores legal case information |
| `LAWYER` | Stores lawyer details and specialization |
| `CASE_LAWYER` | Maps lawyers to cases |
| `WITNESS` | Stores witness information |
| `CASE_WITNESS` | Maps witnesses to cases |
| `EVIDENCE` | Stores case evidence |
| `COURT_HEARING` | Stores hearing schedules |
| `AUDIT_LOG` | Records newly created cases |

---

## 🔗 Relationships

The system demonstrates:

- **One-to-Many relationships**
  - Client → Cases
  - Case → Evidence
  - Case → Court Hearings

- **Many-to-Many relationships**
  - Cases ↔ Lawyers
  - Cases ↔ Witnesses

These relationships are implemented using **foreign keys and mapping tables**.

---

## 🧠 SQL Concepts Demonstrated

### Database Design

- Primary Keys
- Foreign Keys
- Composite Primary Keys
- Auto Increment
- Unique Constraints
- Default Values
- Referential Integrity
- `ON DELETE CASCADE`

### SQL Queries

- `SELECT`
- `JOIN`
- `WHERE`
- `GROUP BY`
- `COUNT()`
- `ORDER BY`
- `UPDATE`
- Aggregate Functions

### Advanced MySQL

- Stored Procedures
- User-Defined Function
- Triggers
- Conditional Logic
- `IF EXISTS`
- `SIGNAL SQLSTATE`
- `LAST_INSERT_ID()`
- `ROW_COUNT()`
- Custom Delimiters

---

## ⚙️ Stored Procedures

The project includes the following procedures:

### `add_new_case()`

Adds a new case after verifying that the client exists.

### `assign_lawyer()`

Assigns a lawyer to a case while avoiding duplicate mappings.

### `close_case()`

Updates the status of a case to `Closed`.

### `get_case_summary()`

Retrieves:

- Case details
- Client information
- Assigned lawyers
- Court hearings

---

## 🔧 Custom Function

### `count_cases_for_client()`

Returns the total number of cases associated with a specific client.

Example:

```sql
SELECT count_cases_for_client(1)
AS total_cases_for_client1;
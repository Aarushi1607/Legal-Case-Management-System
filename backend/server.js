const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ==================== TEST ROUTE ====================

app.get("/", (req, res) => {
  res.json({
    message: "Legal Case Management System backend is running!"
  });
});


// ==================== DATABASE TEST ====================

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      message: "MySQL connection successful!",
      result: rows[0].result
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "MySQL connection failed",
      error: error.message
    });
  }
});


// ==================== CLIENTS ====================

app.get("/api/clients", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        client_id AS id,
        name,
        address,
        email,
        phone_no AS phone
      FROM CLIENT
      ORDER BY client_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Clients error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==================== CASES ====================

app.get("/api/cases", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        case_id AS id,
        case_type AS type,
        filing_date AS filingDate,
        status,
        client_id AS clientId
      FROM CASE_DETAILS
      ORDER BY case_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Cases error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==================== LAWYERS ====================

app.get("/api/lawyers", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        lawyer_id AS id,
        name,
        phone_no AS phone,
        email,
        specialization
      FROM LAWYER
      ORDER BY lawyer_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Lawyers error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==================== CASE-LAWYER ASSIGNMENTS ====================

app.get("/api/assignments", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        case_id AS caseId,
        lawyer_id AS lawyerId
      FROM CASE_LAWYER
      ORDER BY case_id, lawyer_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Assignments error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==================== COURT HEARINGS ====================

app.get("/api/hearings", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        hearing_id AS id,
        case_id AS caseId,
        DATE_FORMAT(date, '%Y-%m-%d') AS date,
        TIME_FORMAT(time, '%H:%i') AS time,
        court_location AS location
      FROM COURT_HEARING
      ORDER BY date, time
    `);

    res.json(rows);
  } catch (error) {
    console.error("Hearings error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
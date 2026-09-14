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

// CREATE CLIENT
app.post('/api/clients', async (req, res) => {
    try {
        const { name, address, email, phone_no } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        const [result] = await db.query(
            `INSERT INTO CLIENT (name, address, email, phone_no)
             VALUES (?, ?, ?, ?)`,
            [name, address || null, email, phone_no || null]
        );

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            client_id: result.insertId
        });

    } catch (error) {
        console.error('Error creating client:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'A client with this email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create client'
        });
    }
});

console.log("CLIENT POST ROUTE LOADED");

// UPDATE CLIENT
app.put('/api/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email, phone_no } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        const [result] = await db.query(
            `UPDATE CLIENT
             SET name = ?, address = ?, email = ?, phone_no = ?
             WHERE client_id = ?`,
            [name, address || null, email, phone_no || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.json({
            success: true,
            message: 'Client updated successfully'
        });

    } catch (error) {
        console.error('Error updating client:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'A client with this email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update client'
        });
    }
});


// DELETE CLIENT
app.delete('/api/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM CLIENT WHERE client_id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.json({
            success: true,
            message: 'Client deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting client:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to delete client'
        });
    }
});

// ==================== CASES ====================

app.get("/api/cases", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        case_id AS id,
        case_type AS type,
        DATE_FORMAT(filing_date, '%Y-%m-%d') AS filingDate,
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

// ==================== EVIDENCE ====================

app.get("/api/evidence", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        evidence_id AS id,
        type,
        description,
        case_id AS caseId,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt
      FROM EVIDENCE
      ORDER BY evidence_id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Evidence error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/evidence", async (req, res) => {
  try {
    const { type, description, case_id } = req.body;
    const caseId = Number(case_id);

    if (!type?.trim() || !description?.trim() || !Number.isInteger(caseId) || caseId <= 0) {
      return res.status(400).json({ success: false, message: "Type, description, and a valid case are required." });
    }

    const [result] = await db.query(
      "INSERT INTO EVIDENCE (type, description, case_id) VALUES (?, ?, ?)",
      [type.trim(), description.trim(), caseId]
    );
    const [rows] = await db.query(
      `SELECT evidence_id AS id, type, description, case_id AS caseId,
       DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt
       FROM EVIDENCE WHERE evidence_id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, message: "Evidence logged successfully.", evidence: rows[0] });
  } catch (error) {
    console.error("Error creating evidence:", error.message);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ success: false, message: "Selected case does not exist." });
    }
    res.status(500).json({ success: false, message: "Failed to log evidence." });
  }
});


// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

// CREATE HEARING
app.post("/api/hearings", async (req, res) => {
  try {
    const { date, time, court_location, case_id } = req.body;
    const caseId = Number(case_id);

    if (!date || !time || !court_location?.trim() || !Number.isInteger(caseId) || caseId <= 0) {
      return res.status(400).json({ success: false, message: "Date, time, court location, and a valid case are required." });
    }

    const [result] = await db.query(
      `INSERT INTO COURT_HEARING (date, time, court_location, case_id)
       VALUES (?, ?, ?, ?)`,
      [date, time, court_location.trim(), caseId]
    );

    res.status(201).json({ success: true, message: "Hearing created successfully.", hearing_id: result.insertId });
  } catch (error) {
    console.error("Error creating hearing:", error.message);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ success: false, message: "Selected case does not exist." });
    }
    res.status(500).json({ success: false, message: "Failed to create hearing." });
  }
});

// UPDATE HEARING
app.put("/api/hearings/:id", async (req, res) => {
  try {
    const hearingId = Number(req.params.id);
    const { date, time, court_location, case_id } = req.body;
    const caseId = Number(case_id);

    if (!Number.isInteger(hearingId) || hearingId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid hearing ID." });
    }
    if (!date || !time || !court_location?.trim() || !Number.isInteger(caseId) || caseId <= 0) {
      return res.status(400).json({ success: false, message: "Date, time, court location, and a valid case are required." });
    }

    const [result] = await db.query(
      `UPDATE COURT_HEARING
       SET date = ?, time = ?, court_location = ?, case_id = ?
       WHERE hearing_id = ?`,
      [date, time, court_location.trim(), caseId, hearingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Hearing not found." });
    }

    res.json({ success: true, message: "Hearing updated successfully." });
  } catch (error) {
    console.error("Error updating hearing:", error.message);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ success: false, message: "Selected case does not exist." });
    }
    res.status(500).json({ success: false, message: "Failed to update hearing." });
  }
});

// DELETE HEARING
app.delete("/api/hearings/:id", async (req, res) => {
  try {
    const hearingId = Number(req.params.id);
    if (!Number.isInteger(hearingId) || hearingId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid hearing ID." });
    }

    const [result] = await db.query("DELETE FROM COURT_HEARING WHERE hearing_id = ?", [hearingId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Hearing not found." });
    }

    res.json({ success: true, message: "Hearing deleted successfully." });
  } catch (error) {
    console.error("Error deleting hearing:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete hearing." });
  }
});

// CREATE LAWYER
app.post("/api/lawyers", async (req, res) => {
  try {
    const { name, phone_no, email, specialization } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ success: false, message: "Name and email are required." });
    }

    const [result] = await db.query(
      `INSERT INTO LAWYER (name, phone_no, email, specialization)
       VALUES (?, ?, ?, ?)`,
      [name.trim(), phone_no?.trim() || null, email.trim(), specialization?.trim() || null]
    );

    res.status(201).json({ success: true, message: "Lawyer created successfully.", lawyer_id: result.insertId });
  } catch (error) {
    console.error("Error creating lawyer:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, message: "A lawyer with this email already exists." });
    }
    res.status(500).json({ success: false, message: "Failed to create lawyer." });
  }
});

// UPDATE LAWYER
app.put("/api/lawyers/:id", async (req, res) => {
  try {
    const lawyerId = Number(req.params.id);
    const { name, phone_no, email, specialization } = req.body;

    if (!Number.isInteger(lawyerId) || lawyerId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid lawyer ID." });
    }
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ success: false, message: "Name and email are required." });
    }

    const [result] = await db.query(
      `UPDATE LAWYER
       SET name = ?, phone_no = ?, email = ?, specialization = ?
       WHERE lawyer_id = ?`,
      [name.trim(), phone_no?.trim() || null, email.trim(), specialization?.trim() || null, lawyerId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Lawyer not found." });
    }

    res.json({ success: true, message: "Lawyer updated successfully." });
  } catch (error) {
    console.error("Error updating lawyer:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, message: "A lawyer with this email already exists." });
    }
    res.status(500).json({ success: false, message: "Failed to update lawyer." });
  }
});

// DELETE LAWYER
app.delete("/api/lawyers/:id", async (req, res) => {
  try {
    const lawyerId = Number(req.params.id);
    if (!Number.isInteger(lawyerId) || lawyerId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid lawyer ID." });
    }

    const [result] = await db.query("DELETE FROM LAWYER WHERE lawyer_id = ?", [lawyerId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Lawyer not found." });
    }

    res.json({ success: true, message: "Lawyer deleted successfully." });
  } catch (error) {
    console.error("Error deleting lawyer:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete lawyer." });
  }
});

// CREATE CASE
app.post("/api/cases", async (req, res) => {
  try {
    const { case_type, filing_date, status, client_id } = req.body;
    const clientId = Number(client_id);

    if (!case_type?.trim() || !filing_date || !status?.trim() || !Number.isInteger(clientId) || clientId <= 0) {
      return res.status(400).json({ success: false, message: "Case type, filing date, status, and a valid client are required." });
    }

    const [result] = await db.query(
      `INSERT INTO CASE_DETAILS (case_type, filing_date, status, client_id)
       VALUES (?, ?, ?, ?)`,
      [case_type.trim(), filing_date, status.trim(), clientId]
    );

    res.status(201).json({
      success: true,
      message: "Case created successfully.",
      case_id: result.insertId
    });
  } catch (error) {
    console.error("Error creating case:", error.message);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ success: false, message: "Selected client does not exist." });
    }
    res.status(500).json({ success: false, message: "Failed to create case." });
  }
});

// UPDATE CASE
app.put("/api/cases/:id", async (req, res) => {
  try {
    const caseId = Number(req.params.id);
    const { case_type, filing_date, status, client_id } = req.body;
    const clientId = Number(client_id);

    if (!Number.isInteger(caseId) || caseId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid case ID." });
    }
    if (!case_type?.trim() || !filing_date || !status?.trim() || !Number.isInteger(clientId) || clientId <= 0) {
      return res.status(400).json({ success: false, message: "Case type, filing date, status, and a valid client are required." });
    }

    const [result] = await db.query(
      `UPDATE CASE_DETAILS
       SET case_type = ?, filing_date = ?, status = ?, client_id = ?
       WHERE case_id = ?`,
      [case_type.trim(), filing_date, status.trim(), clientId, caseId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Case not found." });
    }

    res.json({ success: true, message: "Case updated successfully." });
  } catch (error) {
    console.error("Error updating case:", error.message);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ success: false, message: "Selected client does not exist." });
    }
    res.status(500).json({ success: false, message: "Failed to update case." });
  }
});

// DELETE CASE
app.delete("/api/cases/:id", async (req, res) => {
  try {
    const caseId = Number(req.params.id);
    if (!Number.isInteger(caseId) || caseId <= 0) {
      return res.status(400).json({ success: false, message: "Invalid case ID." });
    }

    const [result] = await db.query("DELETE FROM CASE_DETAILS WHERE case_id = ?", [caseId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Case not found." });
    }

    res.json({ success: true, message: "Case deleted successfully." });
  } catch (error) {
    console.error("Error deleting case:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete case." });
  }
});

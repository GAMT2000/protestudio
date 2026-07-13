const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all billing records
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT billing.*, clients.full_name 
       FROM billing 
       JOIN clients ON billing.client_id = clients.id
       ORDER BY payment_date DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new billing record
router.post("/", async (req, res) => {
  try {
    const { client_id, amount, payment_method, payment_date, description } = req.body;

    const [result] = await db.query(
      "INSERT INTO billing (client_id, amount, payment_method, payment_date, description) VALUES (?, ?, ?, ?, ?)",
      [client_id, amount, payment_method, payment_date, description]
    );

    res.status(201).json({ message: "Pago registrado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly income summary
router.get("/summary/monthly", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT DATE_FORMAT(payment_date, '%Y-%m') AS month, SUM(amount) AS total
       FROM billing
       GROUP BY month
       ORDER BY month DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
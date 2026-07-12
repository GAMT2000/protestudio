const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT orders.*, clients.full_name 
       FROM orders 
       JOIN clients ON orders.client_id = clients.id
       ORDER BY order_date DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { client_id, supplier, item_description, order_date, expected_delivery, cost } = req.body;

    const [result] = await db.query(
      "INSERT INTO orders (client_id, supplier, item_description, order_date, expected_delivery, cost) VALUES (?, ?, ?, ?, ?, ?)",
      [client_id, supplier, item_description, order_date, expected_delivery, cost]
    );

    res.status(201).json({ message: "Pedido creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);

    res.json({ message: "Estado actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
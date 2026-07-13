const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get all supplies
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM supplies ORDER BY name");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock quantity
router.put("/:id/stock", async (req, res) => {
  try {
    const { current_stock } = req.body;

    await db.query("UPDATE supplies SET current_stock = ? WHERE id = ?", [
      current_stock,
      req.params.id,
    ]);

    res.json({ message: "Stock actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
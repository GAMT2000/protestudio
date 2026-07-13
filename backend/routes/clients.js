const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, email, phone, hair_type, hair_color, hair_texture, hair_density, created_at FROM clients ORDER BY full_name",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, email, phone, hair_type, hair_color, hair_texture, hair_density, created_at FROM clients WHERE id = ?",
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { full_name, email, phone, hair_type, hair_color, hair_texture, hair_density } = req.body;

    const [result] = await db.query(
      "INSERT INTO clients (full_name, email, phone, hair_type, hair_color, hair_texture, hair_density) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [full_name, email, phone, hair_type, hair_color, hair_texture, hair_density]
    );

    res.status(201).json({ message: "Cliente creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

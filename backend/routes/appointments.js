const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT appointments.*, clients.full_name
            FROM appointments
            JOIN clients ON appointments.client_id = clients.id
            ORDER BY appointment_date, appointment_time`
        );
        res.json(rows);
    }   catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/", async(req, res) => {
    try {
        const {client_id, appointment_date, appointment_time, type, notes} = req.body;

        const [result] = await db.query(
            "INSERT INTO appointments (client_id, appointment_date, appointment_time, type, notes) VALUES (?, ?, ?, ?, ?)",
            [client_id, appointment_date, appointment_time, type, notes]
        );

        res.status(201).json({message: "Cita creada", id: result.insertId});
    }   catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const [[{ newClients }]] = await db.query(
      `SELECT COUNT(*) AS newClients FROM clients 
       WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
    );

    const [[{ appointmentsToday }]] = await db.query(
      `SELECT COUNT(*) AS appointmentsToday FROM appointments 
       WHERE appointment_date = CURDATE()`
    );

    const [[{ lowStock }]] = await db.query(
      `SELECT COUNT(*) AS lowStock FROM supplies 
       WHERE current_stock < minimum_stock`
    );

    const [[{ pendingOrders }]] = await db.query(
      `SELECT COUNT(*) AS pendingOrders FROM orders 
       WHERE status != 'Entregado'`
    );

    const [[{ monthlyIncome }]] = await db.query(
      `SELECT COALESCE(SUM(amount), 0) AS monthlyIncome FROM billing 
       WHERE MONTH(payment_date) = MONTH(CURDATE()) AND YEAR(payment_date) = YEAR(CURDATE())`
    );

    const [[{ totalClients }]] = await db.query(
      `SELECT COUNT(*) AS totalClients FROM clients`
    );

    res.json({
      newClients,
      appointmentsToday,
      lowStock,
      pendingOrders,
      monthlyIncome,
      totalClients,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
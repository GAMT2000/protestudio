const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const appointmentsRoutes = require("./routes/appointments");
const clientRoutes = require("./routes/clients");
const orderRoutes = require("./routes/orders");
const supplyRoutes = require("./routes/supplies");
const billingRoutes = require("./routes/billing");
const dashboardRoutes = require("./routes/dashboard");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Protestudio backend is running");
});

const PORT = process.env.PORT || 5000;

const db = require("./config/db");

app.get("/test-db", async(req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM clients");
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

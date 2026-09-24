const policyRoutes = require("./routes/policyRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================================
   Middleware
========================================= */

app.use(cors());

app.use(express.json());

app.use("/api/policies", policyRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/settings", settingsRoutes);


/* =========================================
   Health Check
========================================= */

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "PolicyVault API is running",
        timestamp: new Date().toISOString()
    });
});


/* =========================================
   Database Test
========================================= */

app.get("/api/db-test", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT 1 AS database_connected"
        );

        res.json({
            success: true,
            message: "MySQL database connected successfully",
            result: rows[0]
        });

    } catch (error) {

        console.error(
            "Database connection error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to connect to MySQL database",
            error: error.message
        });

    }

});


/* =========================================
   Start Server
========================================= */

app.listen(PORT, () => {

    console.log(
        `PolicyVault API running on http://localhost:${PORT}`
    );

});
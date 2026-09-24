const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                payments.id,
                payments.policy_id,
                policies.policy_name,
                policies.provider,
                payments.amount,
                payments.payment_date,
                payments.status,
                payments.payment_method
            FROM payments
            INNER JOIN policies
                ON payments.policy_id = policies.id
            ORDER BY payments.payment_date DESC
        `);

        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error("Unable to fetch payments:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch payments"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                payments.id,
                payments.policy_id,
                policies.policy_name,
                policies.provider,
                payments.amount,
                payments.payment_date,
                payments.status,
                payments.payment_method
            FROM payments
            INNER JOIN policies
                ON payments.policy_id = policies.id
            WHERE payments.id = ?
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("Unable to fetch payment:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch payment"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            policy_id,
            amount,
            payment_date,
            status,
            payment_method
        } = req.body;

        if (!policy_id || !amount || !payment_date) {
            return res.status(400).json({
                success: false,
                message: "Policy, amount and payment date are required"
            });
        }

        const [result] = await db.query(`
            INSERT INTO payments
            (policy_id, amount, payment_date, status, payment_method)
            VALUES (?, ?, ?, ?, ?)
        `, [
            policy_id,
            amount,
            payment_date,
            status || "Paid",
            payment_method || null
        ]);

        const [rows] = await db.query(`
            SELECT
                payments.id,
                payments.policy_id,
                policies.policy_name,
                policies.provider,
                payments.amount,
                payments.payment_date,
                payments.status,
                payments.payment_method
            FROM payments
            INNER JOIN policies
                ON payments.policy_id = policies.id
            WHERE payments.id = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: "Payment added successfully",
            data: rows[0]
        });
    } catch (error) {
        console.error("Unable to create payment:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create payment"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM payments WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.json({
            success: true,
            message: "Payment deleted successfully"
        });
    } catch (error) {
        console.error("Unable to delete payment:", error);

        res.status(500).json({
            success: false,
            message: "Unable to delete payment"
        });
    }
});

module.exports = router;
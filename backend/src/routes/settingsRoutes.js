const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const [rows] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                currency,
                date_format,
                payment_reminders,
                policy_expiry_reminders
            FROM users
            WHERE id = ?
            `,
            [req.params.userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("Unable to fetch settings:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch settings"
        });
    }
});

router.put("/:userId", async (req, res) => {
    try {
        const {
            name,
            email,
            currency,
            date_format,
            payment_reminders,
            policy_expiry_reminders
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        const [result] = await db.query(
            `
            UPDATE users
            SET
                name = ?,
                email = ?,
                currency = ?,
                date_format = ?,
                payment_reminders = ?,
                policy_expiry_reminders = ?
            WHERE id = ?
            `,
            [
                name,
                email,
                currency || "INR",
                date_format || "DD MMM YYYY",
                payment_reminders ?? true,
                policy_expiry_reminders ?? true,
                req.params.userId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const [rows] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                currency,
                date_format,
                payment_reminders,
                policy_expiry_reminders
            FROM users
            WHERE id = ?
            `,
            [req.params.userId]
        );

        res.json({
            success: true,
            message: "Settings saved successfully",
            data: rows[0]
        });
    } catch (error) {
        console.error("Unable to save settings:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save settings"
        });
    }
});

module.exports = router;
const express = require("express");
const db = require("../config/db");

const router = express.Router();


/* =========================================
   GET ALL POLICIES
========================================= */

router.get("/", async (req, res) => {

    try {

        const [policies] = await db.query(`
            SELECT
                id,
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status,
                premium_amount,
                premium_frequency,
                coverage_amount,
                start_date,
                maturity_date,
                next_payment_date,
                nominee_name,
                nominee_relation,
                notes,
                created_at
            FROM policies
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            count: policies.length,
            data: policies
        });

    } catch (error) {

        console.error(
            "Error fetching policies:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch policies",
            error: error.message
        });

    }

});


/* =========================================
   GET SINGLE POLICY
========================================= */

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [policies] = await db.query(
            `
            SELECT
                id,
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status,
                premium_amount,
                premium_frequency,
                coverage_amount,
                start_date,
                maturity_date,
                next_payment_date,
                nominee_name,
                nominee_relation,
                notes,
                created_at
            FROM policies
            WHERE id = ?
            `,
            [id]
        );

        if (policies.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Policy not found"
            });

        }

        res.json({
            success: true,
            data: policies[0]
        });

    } catch (error) {

        console.error(
            "Error fetching policy:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch policy",
            error: error.message
        });

    }

});


/* =========================================
   CREATE POLICY
========================================= */

router.post("/", async (req, res) => {

    try {

        const {
            user_id,
            policy_name,
            provider,
            policy_number,
            policy_type,
            status,
            premium_amount,
            premium_frequency,
            coverage_amount,
            start_date,
            maturity_date,
            next_payment_date,
            nominee_name,
            nominee_relation,
            notes
        } = req.body;


        /* -----------------------------------------
           Basic validation
        ----------------------------------------- */

        if (
            !user_id ||
            !policy_name ||
            !provider ||
            !policy_number ||
            !policy_type ||
            !premium_amount ||
            !coverage_amount
        ) {

            return res.status(400).json({
                success: false,
                message: "Required policy fields are missing"
            });

        }


        /* -----------------------------------------
           Insert policy
        ----------------------------------------- */

        const [result] = await db.query(
            `
            INSERT INTO policies (
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status,
                premium_amount,
                premium_frequency,
                coverage_amount,
                start_date,
                maturity_date,
                next_payment_date,
                nominee_name,
                nominee_relation,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status || "Active",
                premium_amount,
                premium_frequency || "Monthly",
                coverage_amount,
                start_date || null,
                maturity_date || null,
                next_payment_date || null,
                nominee_name || null,
                nominee_relation || null,
                notes || null
            ]
        );


        /* -----------------------------------------
           Get newly created policy
        ----------------------------------------- */

        const [newPolicy] = await db.query(
            `
            SELECT
                id,
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status,
                premium_amount,
                premium_frequency,
                coverage_amount,
                start_date,
                maturity_date,
                next_payment_date,
                nominee_name,
                nominee_relation,
                notes,
                created_at
            FROM policies
            WHERE id = ?
            `,
            [result.insertId]
        );


        res.status(201).json({
            success: true,
            message: "Policy created successfully",
            data: newPolicy[0]
        });

    } catch (error) {

        console.error(
            "Error creating policy:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to create policy",
            error: error.message
        });

    }

});


/* =========================================
   UPDATE POLICY
========================================= */

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            policy_name,
            provider,
            policy_number,
            policy_type,
            status,
            premium_amount,
            premium_frequency,
            coverage_amount,
            start_date,
            maturity_date,
            next_payment_date,
            nominee_name,
            nominee_relation,
            notes
        } = req.body;


        /* -----------------------------------------
           Check whether policy exists
        ----------------------------------------- */

        const [existingPolicies] = await db.query(
            `
            SELECT id
            FROM policies
            WHERE id = ?
            `,
            [id]
        );

        if (existingPolicies.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Policy not found"
            });

        }


        /* -----------------------------------------
           Update policy
        ----------------------------------------- */

        await db.query(
            `
            UPDATE policies
            SET
                policy_name = ?,
                provider = ?,
                policy_number = ?,
                policy_type = ?,
                status = ?,
                premium_amount = ?,
                premium_frequency = ?,
                coverage_amount = ?,
                start_date = ?,
                maturity_date = ?,
                next_payment_date = ?,
                nominee_name = ?,
                nominee_relation = ?,
                notes = ?
            WHERE id = ?
            `,
            [
                policy_name,
                provider,
                policy_number,
                policy_type,
                status || "Active",
                premium_amount,
                premium_frequency || "Monthly",
                coverage_amount,
                start_date || null,
                maturity_date || null,
                next_payment_date || null,
                nominee_name || null,
                nominee_relation || null,
                notes || null,
                id
            ]
        );


        /* -----------------------------------------
           Get updated policy
        ----------------------------------------- */

        const [updatedPolicies] = await db.query(
            `
            SELECT
                id,
                user_id,
                policy_name,
                provider,
                policy_number,
                policy_type,
                status,
                premium_amount,
                premium_frequency,
                coverage_amount,
                start_date,
                maturity_date,
                next_payment_date,
                nominee_name,
                nominee_relation,
                notes,
                created_at
            FROM policies
            WHERE id = ?
            `,
            [id]
        );


        res.json({
            success: true,
            message: "Policy updated successfully",
            data: updatedPolicies[0]
        });

    } catch (error) {

        console.error(
            "Error updating policy:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update policy",
            error: error.message
        });

    }

});

/* =========================================
   DELETE POLICY
========================================= */

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        /* -----------------------------------------
           Check whether policy exists
        ----------------------------------------- */

        const [existingPolicies] = await db.query(
            `
            SELECT id
            FROM policies
            WHERE id = ?
            `,
            [id]
        );


        if (existingPolicies.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Policy not found"
            });

        }


        /* -----------------------------------------
           Delete policy
        ----------------------------------------- */

        await db.query(
            `
            DELETE FROM policies
            WHERE id = ?
            `,
            [id]
        );


        /* -----------------------------------------
           Success response
        ----------------------------------------- */

        res.json({
            success: true,
            message: "Policy deleted successfully"
        });

    } catch (error) {

        console.error(
            "Error deleting policy:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to delete policy",
            error: error.message
        });

    }

});


module.exports = router;
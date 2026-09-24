import { useEffect, useState } from "react";
import { getPolicies } from "../services/api";
import StatCard from "./StatCard";
import "./DashboardStats.css";

function DashboardStats() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPolicies() {
            try {
                const data = await getPolicies();

                setPolicies(data);
            } catch (error) {
                console.error("Unable to load dashboard policies:", error);
            } finally {
                setLoading(false);
            }
        }

        loadPolicies();
    }, []);

    const totalPolicies = policies.length;

    const activePolicies = policies.filter(
        (policy) => policy.status === "Active"
    ).length;

    const monthlyPremium = policies.reduce(
        (total, policy) => {
            const amount = Number(policy.premiumAmount || 0);

            if (policy.premiumFrequency === "Quarterly") {
                return total + amount / 3;
            }

            if (policy.premiumFrequency === "Half-Yearly") {
                return total + amount / 6;
            }

            if (policy.premiumFrequency === "Yearly") {
                return total + amount / 12;
            }

            return total + amount;
        },
        0
    );

    const today = new Date();

    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const dueSoonAmount = policies
        .filter((policy) => {
            if (
                policy.status !== "Active" ||
                !policy.nextPaymentDate
            ) {
                return false;
            }

            const paymentDate = new Date(policy.nextPaymentDate);

            return (
                paymentDate >= today &&
                paymentDate <= next30Days
            );
        })
        .reduce(
            (total, policy) =>
                total + Number(policy.premiumAmount || 0),
            0
        );

    if (loading) {
        return (
            <section className="pv-dashboard-stats">
                <StatCard
                    icon="bi-journal-bookmark"
                    title="Policies"
                    value="..."
                    description="Across your vault"
                />

                <StatCard
                    icon="bi-shield-check"
                    title="Active"
                    value="..."
                    description="Currently in force"
                />

                <StatCard
                    icon="bi-currency-rupee"
                    title="Monthly rhythm"
                    value="..."
                    description="Recurring commitment"
                />

                <StatCard
                    icon="bi-bell"
                    title="Due soon"
                    value="..."
                    description="Next 30 days"
                />
            </section>
        );
    }

    return (
        <section className="pv-dashboard-stats">

            <StatCard
                icon="bi-journal-bookmark"
                title="Policies"
                value={totalPolicies}
                description="Across your vault"
            />

            <StatCard
                icon="bi-shield-check"
                title="Active"
                value={activePolicies}
                description="Currently in force"
            />

            <StatCard
                icon="bi-currency-rupee"
                title="Monthly rhythm"
                value={`₹${Math.round(monthlyPremium).toLocaleString("en-IN")}`}
                description="Recurring commitment"
            />

            <StatCard
                icon="bi-bell"
                title="Due soon"
                value={`₹${dueSoonAmount.toLocaleString("en-IN")}`}
                description="Next 30 days"
            />

        </section>
    );
}

export default DashboardStats;
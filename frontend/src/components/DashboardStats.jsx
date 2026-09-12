import { getPolicies } from "../data/policyStore";
import StatCard from "./StatCard";
import "./DashboardStats.css";

function DashboardStats() {
    const policies = getPolicies();

    const totalPolicies = policies.length;

    const activePolicies = policies.filter(
        (policy) => policy.status === "Active"
    ).length;

    const monthlyPremium = policies.reduce(
        (total, policy) => total + policy.premiumAmount,
        0
    );

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
                value={`₹${monthlyPremium.toLocaleString("en-IN")}`}
                description="Recurring commitment"
            />

            <StatCard
                icon="bi-bell"
                title="Due soon"
                value="₹2,500"
                description="Next 30 days"
            />
        </section>
    );
}

export default DashboardStats;
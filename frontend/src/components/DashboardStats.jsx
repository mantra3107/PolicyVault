import StatCard from "./StatCard";
import "./DashboardStats.css";

function DashboardStats() {
    return (
        <section className="pv-dashboard-stats">
            <StatCard
                icon="bi-journal-bookmark"
                title="Policies"
                value="4"
                description="Across your vault"
            />

            <StatCard
                icon="bi-shield-check"
                title="Active"
                value="3"
                description="Currently in force"
            />

            <StatCard
                icon="bi-currency-rupee"
                title="Monthly rhythm"
                value="₹8,500"
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
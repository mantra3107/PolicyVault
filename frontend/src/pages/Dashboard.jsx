import DashboardHeader from "../components/DashboardHeader";
import PaymentAlert from "../components/PaymentAlert";
import DashboardStats from "../components/DashboardStats";
import PolicyLedger from "../components/PolicyLedger";
import PremiumChart from "../components/PremiumChart";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div>
            <DashboardHeader />

            <PaymentAlert />

            <DashboardStats />

            <div className="pv-dashboard-lower">
                <PolicyLedger />

                <PremiumChart />
            </div>
        </div>
    );
}

export default Dashboard;
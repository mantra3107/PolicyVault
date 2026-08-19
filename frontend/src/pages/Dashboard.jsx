import DashboardHeader from "../components/DashboardHeader";
import PaymentAlert from "../components/PaymentAlert";
import DashboardStats from "../components/DashboardStats";

function Dashboard() {
    return (
        <div>
            <DashboardHeader />

            <PaymentAlert />

            <DashboardStats />
        </div>
    );
}

export default Dashboard;
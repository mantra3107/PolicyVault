import { useNavigate } from "react-router";
import "./DashboardHeader.css";

function DashboardHeader() {
    const navigate = useNavigate();

    const today = new Date();

    const date = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    return (
        <section className="pv-dashboard-header">
            <div>
                <div className="section-label mb-3">
                    {date}
                </div>

                <h1 className="page-heading">
                    Good morning, Mantra.
                </h1>

                <p className="pv-dashboard-subtitle">
                    Here's the calm version of your insurance overview.
                </p>
            </div>

            <button
                className="pv-btn pv-add-policy-btn"
                onClick={() => navigate("/policies")}
            >
                <i className="bi bi-plus-lg"></i>
                <span>Add a policy</span>
            </button>
        </section>
    );
}

export default DashboardHeader;
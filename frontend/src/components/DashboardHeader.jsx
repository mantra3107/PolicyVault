import "./DashboardHeader.css";

function DashboardHeader() {
    return (
        <section className="pv-dashboard-header">
            <div>
                <div className="section-label mb-3">
                    Tuesday, 19 August
                </div>

                <h1 className="page-heading">
                    Good morning, Mantra.
                </h1>

                <p className="pv-dashboard-subtitle">
                    Here's the calm version of your insurance overview.
                </p>
            </div>

            <button className="pv-btn pv-add-policy-btn">
                <i className="bi bi-plus-lg"></i>
                <span>Add a policy</span>
            </button>
        </section>
    );
}

export default DashboardHeader;
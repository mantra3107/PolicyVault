import { useNavigate } from "react-router";
import "./PolicyLedger.css";

function PolicyLedger() {
    const navigate = useNavigate();

    const policies = [
        {
            name: "Secure Future Plan",
            number: "123456789",
            premium: "₹2,500",
            frequency: "monthly",
            nextPayment: "10 Sep 2026",
            status: "Active"
        },
        {
            name: "Family Protection Plan",
            number: "987654321",
            premium: "₹1,800",
            frequency: "monthly",
            nextPayment: "15 Sep 2026",
            status: "Active"
        },
        {
            name: "Retirement Secure",
            number: "456789123",
            premium: "₹4,200",
            frequency: "monthly",
            nextPayment: "20 Sep 2026",
            status: "Active"
        }
    ];

    return (
        <section className="pv-policy-ledger surface">
            <div className="pv-ledger-header">
                <div>
                    <div className="section-label">
                        Your policies
                    </div>

                    <h2>
                        Policy ledger
                    </h2>
                </div>

                <button
                    className="pv-ledger-view-all"
                    onClick={() => navigate("/policies")}
                >
                    View all
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>

            <div className="pv-policy-list">
                {policies.map((policy) => (
                    <div
                        className="pv-policy-row"
                        key={policy.number}
                    >
                        <div className="pv-policy-main">
                            <div className="pv-policy-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>

                            <div>
                                <h3>
                                    {policy.name}
                                </h3>

                                <p>
                                    Policy No. {policy.number}
                                </p>
                            </div>
                        </div>

                        <div className="pv-policy-details">
                            <div>
                                <span>Premium</span>
                                <strong>
                                    {policy.premium}
                                    <small>/{policy.frequency}</small>
                                </strong>
                            </div>

                            <div>
                                <span>Next payment</span>
                                <strong>
                                    {policy.nextPayment}
                                </strong>
                            </div>

                            <span className="pv-policy-status">
                                {policy.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PolicyLedger;
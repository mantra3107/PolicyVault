import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../services/api";
import "./PolicyLedger.css";

function PolicyLedger() {
    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPolicies() {
            try {
                const data = await getPolicies();
                setPolicies(data);
            } catch (error) {
                console.error("Unable to load policies:", error);
                setError("Unable to load policies.");
            } finally {
                setLoading(false);
            }
        }

        loadPolicies();
    }, []);

    if (loading) {
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
                    <p>Loading policies...</p>
                </div>
            </section>
        );
    }

    if (error) {
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
                    <p>{error}</p>
                </div>
            </section>
        );
    }

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
                        key={policy.id}
                    >
                        <div className="pv-policy-main">
                            <div className="pv-policy-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>

                            <div>
                                <h3>
                                    {policy.policyName}
                                </h3>

                                <p>
                                    Policy No. {policy.policyNumber}
                                </p>
                            </div>
                        </div>

                        <div className="pv-policy-details">
                            <div>
                                <span>
                                    Premium
                                </span>

                                <strong>
                                    ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
                                    <small>
                                        /{policy.premiumFrequency.toLowerCase()}
                                    </small>
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Next payment
                                </span>

                                <strong>
                                    {policy.nextPaymentDate
                                        ? new Date(
                                              policy.nextPaymentDate
                                          ).toLocaleDateString("en-IN", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric"
                                          })
                                        : "Not set"}
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
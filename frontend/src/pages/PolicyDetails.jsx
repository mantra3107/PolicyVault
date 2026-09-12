import { useNavigate, useParams } from "react-router";
import { getPolicies } from "../data/policyStore";
import "./PolicyDetails.css";

function PolicyDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const policies = getPolicies();

    const policy = policies.find(
        (item) => String(item.id) === String(id)
    );

    if (!policy) {
        return (
            <div className="pv-policy-not-found">
                <div className="section-label">
                    Policy
                </div>

                <h1 className="page-heading">
                    Policy not found
                </h1>

                <p>
                    The policy you're looking for doesn't
                    exist in your vault.
                </p>

                <button
                    className="pv-btn"
                    onClick={() => navigate("/policies")}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to policies
                </button>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Not provided";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="pv-policy-details-page">

            {/* Header */}

            <section className="pv-policy-details-header">

                <button
                    className="pv-back-button"
                    onClick={() => navigate("/policies")}
                >
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to policies</span>
                </button>

                <div className="pv-policy-details-title">

                    <div className="pv-policy-details-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>

                    <div>
                        <div className="section-label">
                            {policy.provider}
                        </div>

                        <h1 className="page-heading">
                            {policy.policyName}
                        </h1>

                        <p>
                            Policy No. {policy.policyNumber}
                        </p>
                    </div>

                </div>

                <span className="pv-policy-status">
                    {policy.status}
                </span>

            </section>


            {/* Overview */}

            <section className="pv-details-section surface">

                <div className="pv-details-section-heading">
                    <div>
                        <div className="section-label">
                            Policy information
                        </div>

                        <h2>
                            Policy overview
                        </h2>
                    </div>

                    <i className="bi bi-info-circle"></i>
                </div>


                <div className="pv-details-grid">

                    <div className="pv-detail-item">
                        <span>Provider</span>
                        <strong>{policy.provider}</strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Policy type</span>
                        <strong>{policy.policyType}</strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Policy number</span>
                        <strong>{policy.policyNumber}</strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Coverage</span>
                        <strong>
                            {formatCurrency(policy.coverageAmount)}
                        </strong>
                    </div>

                </div>

            </section>


            {/* Premium */}

            <section className="pv-details-section surface">

                <div className="pv-details-section-heading">
                    <div>
                        <div className="section-label">
                            Financial details
                        </div>

                        <h2>
                            Premium
                        </h2>
                    </div>

                    <i className="bi bi-currency-rupee"></i>
                </div>


                <div className="pv-premium-highlight">

                    <div>
                        <span>Premium amount</span>

                        <strong>
                            {formatCurrency(policy.premiumAmount)}
                        </strong>

                        <small>
                            /{policy.premiumFrequency.toLowerCase()}
                        </small>
                    </div>

                    <div>
                        <span>Next payment</span>

                        <strong>
                            {formatDate(policy.nextPaymentDate)}
                        </strong>
                    </div>

                </div>

            </section>


            {/* Timeline */}

            <section className="pv-details-section surface">

                <div className="pv-details-section-heading">
                    <div>
                        <div className="section-label">
                            Policy timeline
                        </div>

                        <h2>
                            Important dates
                        </h2>
                    </div>

                    <i className="bi bi-calendar3"></i>
                </div>


                <div className="pv-details-grid">

                    <div className="pv-detail-item">
                        <span>Start date</span>

                        <strong>
                            {formatDate(policy.startDate)}
                        </strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Maturity date</span>

                        <strong>
                            {formatDate(policy.maturityDate)}
                        </strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Next payment</span>

                        <strong>
                            {formatDate(policy.nextPaymentDate)}
                        </strong>
                    </div>

                </div>

            </section>


            {/* Nominee */}

            <section className="pv-details-section surface">

                <div className="pv-details-section-heading">
                    <div>
                        <div className="section-label">
                            Nominee
                        </div>

                        <h2>
                            Nominee details
                        </h2>
                    </div>

                    <i className="bi bi-people"></i>
                </div>


                <div className="pv-details-grid">

                    <div className="pv-detail-item">
                        <span>Name</span>

                        <strong>
                            {policy.nomineeName || "Not provided"}
                        </strong>
                    </div>

                    <div className="pv-detail-item">
                        <span>Relationship</span>

                        <strong>
                            {policy.nomineeRelation || "Not provided"}
                        </strong>
                    </div>

                </div>

            </section>


            {/* Notes */}

            {policy.notes && (
                <section className="pv-details-section surface">

                    <div className="pv-details-section-heading">
                        <div>
                            <div className="section-label">
                                Additional information
                            </div>

                            <h2>
                                Notes
                            </h2>
                        </div>
                    </div>

                    <p className="pv-policy-notes">
                        {policy.notes}
                    </p>

                </section>
            )}


            {/* Actions */}

            <div className="pv-policy-details-actions">

                <button
                    className="pv-btn-outline"
                    onClick={() => navigate("/policies")}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to policies
                </button>

                <button
                    className="pv-btn"
                    disabled
                    title="Edit functionality will be added next"
                >
                    <i className="bi bi-pencil"></i>
                    Edit policy
                </button>

            </div>

        </div>
    );
}

export default PolicyDetails;
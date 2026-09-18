import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deletePolicy, getPolicy } from "../services/api";
import "./PolicyDetails.css";

function PolicyDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function loadPolicy() {
            try {
                setLoading(true);
                setError("");

                const data = await getPolicy(id);

                setPolicy(data);
            } catch (error) {
                console.error("Unable to load policy:", error);

                if (error.message === "Policy not found") {
                    setPolicy(null);
                } else {
                    setError(
                        "Unable to load this policy. Please make sure the backend is running."
                    );
                }
            } finally {
                setLoading(false);
            }
        }

        loadPolicy();
    }, [id]);

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

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this policy?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deletePolicy(id);

            navigate("/policies");
        } catch (error) {
            console.error(
                "Unable to delete policy:",
                error
            );

            setError(
                error.message ||
                "Unable to delete the policy. Please try again."
            );

            setDeleting(false);
        }
    }

    /* Loading state */

    if (loading) {
        return (
            <div className="pv-policy-not-found">

                <div className="section-label">
                    Policy
                </div>

                <h1 className="page-heading">
                    Loading policy...
                </h1>

                <p>
                    Fetching the policy details from your PolicyVault server.
                </p>

            </div>
        );
    }

    /* Error state */

    if (error && !policy) {
        return (
            <div className="pv-policy-not-found">

                <div className="section-label">
                    Policy
                </div>

                <h1 className="page-heading">
                    Unable to load policy
                </h1>

                <p>
                    {error}
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

    /* Policy not found */

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

    return (
        <div className="pv-policy-details-page">

            {/* Header */}

            <section className="pv-policy-details-header">

                <button
                    className="pv-back-button"
                    onClick={() => navigate("/policies")}
                    disabled={deleting}
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

                        <span>
                            Provider
                        </span>

                        <strong>
                            {policy.provider}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Policy type
                        </span>

                        <strong>
                            {policy.policyType}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Policy number
                        </span>

                        <strong>
                            {policy.policyNumber}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Coverage
                        </span>

                        <strong>
                            {formatCurrency(
                                policy.coverageAmount
                            )}
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

                        <span>
                            Premium amount
                        </span>

                        <strong>
                            {formatCurrency(
                                policy.premiumAmount
                            )}
                        </strong>

                        <small>
                            /{(
                                policy.premiumFrequency ||
                                "Monthly"
                            ).toLowerCase()}
                        </small>

                    </div>


                    <div>

                        <span>
                            Next payment
                        </span>

                        <strong>
                            {formatDate(
                                policy.nextPaymentDate
                            )}
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

                        <span>
                            Start date
                        </span>

                        <strong>
                            {formatDate(
                                policy.startDate
                            )}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Maturity date
                        </span>

                        <strong>
                            {formatDate(
                                policy.maturityDate
                            )}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Next payment
                        </span>

                        <strong>
                            {formatDate(
                                policy.nextPaymentDate
                            )}
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

                        <span>
                            Name
                        </span>

                        <strong>
                            {policy.nomineeName ||
                                "Not provided"}
                        </strong>

                    </div>


                    <div className="pv-detail-item">

                        <span>
                            Relationship
                        </span>

                        <strong>
                            {policy.nomineeRelation ||
                                "Not provided"}
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


            {/* Delete error */}

            {error && policy && (
                <div className="pv-form-error">

                    <i className="bi bi-exclamation-circle"></i>

                    <span>
                        {error}
                    </span>

                </div>
            )}


            {/* Actions */}

            <div className="pv-policy-details-actions">

                <button
                    className="pv-btn-outline"
                    onClick={() => navigate("/policies")}
                    disabled={deleting}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to policies
                </button>


                <button
                    className="pv-btn"
                    onClick={() =>
                        navigate(`/policies/${id}/edit`)
                    }
                    disabled={deleting}
                >
                    <i className="bi bi-pencil"></i>
                    Edit policy
                </button>


                <button
                    className="pv-btn"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    <i
                        className={
                            deleting
                                ? "bi bi-arrow-repeat"
                                : "bi bi-trash"
                        }
                    ></i>

                    {deleting
                        ? "Deleting..."
                        : "Delete policy"}
                </button>

            </div>

        </div>
    );
}

export default PolicyDetails;
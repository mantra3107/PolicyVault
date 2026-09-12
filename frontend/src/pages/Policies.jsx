import { useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../data/policyStore";
import "./Policies.css";

function Policies() {
    const navigate = useNavigate();

    const [policies] = useState(() => getPolicies());

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredPolicies = policies.filter((policy) => {
        const matchesSearch =
    (policy.policyName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
    (policy.provider || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
    (policy.policyNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            policy.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="pv-policies-page">

            {/* Page Header */}

            <section className="pv-policies-header">

                <div>
                    <div className="section-label">
                        Your policies
                    </div>

                    <h1 className="page-heading">
                        Your insurance policies
                    </h1>

                    <p className="pv-policies-subtitle">
                        Keep every policy organized, accessible,
                        and easy to understand.
                    </p>
                </div>

                <button
                    className="pv-btn"
                    onClick={() => navigate("/policies/add")}
                >
                    <i className="bi bi-plus-lg"></i>
                    <span>Add a policy</span>
                </button>

            </section>


            {/* Search and Filters */}

            <section className="pv-policy-controls surface">

                <div className="pv-policy-search">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search by policy name, provider or number..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>


                <div className="pv-policy-filter">

                    <label htmlFor="status-filter">
                        Status
                    </label>

                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                    >
                        <option value="All">
                            All
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Expired">
                            Expired
                        </option>

                        <option value="Upcoming">
                            Upcoming
                        </option>

                        <option value="Lapsed">
                            Lapsed
                        </option>
                    </select>

                </div>

            </section>


            {/* Results */}

            <div className="pv-policy-results">

                <div className="pv-policy-results-header">

                    <span>
                        {filteredPolicies.length}{" "}
                        {filteredPolicies.length === 1
                            ? "policy"
                            : "policies"}
                    </span>

                </div>


                {/* Policy Cards */}

                <div className="pv-policy-cards">

                    {filteredPolicies.map((policy) => (

                        <article
                            className="pv-policy-card surface"
                            key={policy.id}
                        >

                            <div className="pv-policy-card-top">

                                <div className="pv-policy-card-title">

                                    <div className="pv-policy-icon">
                                        <i className="bi bi-shield-check"></i>
                                    </div>

                                    <div>

                                        <h2>
                                            {policy.policyName}
                                        </h2>

                                        <p>
                                            {policy.provider}
                                            {" • "}
                                            Policy No.{" "}
                                            {policy.policyNumber}
                                        </p>

                                    </div>

                                </div>


                                <span className="pv-policy-status">
                                    {policy.status}
                                </span>

                            </div>


                            <div className="pv-policy-card-details">

                                <div>
                                    <span>
                                        Premium
                                    </span>

                                    <strong>
                                        ₹
                                        {policy.premiumAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                    <small>
                                        /{policy.premiumFrequency.toLowerCase()}
                                    </small>
                                </div>


                                <div>
                                    <span>
                                        Coverage
                                    </span>

                                    <strong>
                                        ₹
                                        {policy.coverageAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Next payment
                                    </span>

                                    <strong>
                                        {new Date(
                                            policy.nextPaymentDate
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}
                                    </strong>
                                </div>


                                <button
                                    className="pv-policy-view-button"
                                    onClick={() =>
                                        navigate(
                                            `/policies/${policy.id}`
                                        )
                                    }
                                >
                                    View details
                                    <i className="bi bi-arrow-right"></i>
                                </button>

                            </div>

                        </article>

                    ))}


                    {/* Empty State */}

                    {filteredPolicies.length === 0 && (

                        <div className="pv-policy-empty surface">

                            <i className="bi bi-search"></i>

                            <h2>
                                No policies found
                            </h2>

                            <p>
                                Try changing your search or
                                status filter.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Policies;
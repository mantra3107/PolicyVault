import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../services/api";
import "./Policies.css";

function Policies() {

    const navigate = useNavigate();


    /* =========================================
       State
    ========================================= */

    const [policies, setPolicies] = useState([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /* =========================================
       Load Policies
    ========================================= */

    useEffect(() => {

        async function loadPolicies() {

            try {

                setLoading(true);

                setError("");

                const data =
                    await getPolicies();

                setPolicies(data);

            } catch (error) {

                console.error(
                    "Unable to load policies:",
                    error
                );

                setError(
                    "Unable to load policies. Please make sure the backend is running."
                );

            } finally {

                setLoading(false);

            }

        }

        loadPolicies();

    }, []);


    /* =========================================
       Search + Filter
    ========================================= */

    const filteredPolicies =
        policies.filter((policy) => {

            const search =
                searchTerm.toLowerCase();

            const matchesSearch =
                (policy.policyName || "")
                    .toLowerCase()
                    .includes(search) ||

                (policy.provider || "")
                    .toLowerCase()
                    .includes(search) ||

                (policy.policyNumber || "")
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                statusFilter === "All" ||
                policy.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    return (

        <div className="pv-policies-page">


            {/* =====================================
                Page Header
            ===================================== */}

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
                    onClick={() =>
                        navigate("/policies/add")
                    }
                >

                    <i className="bi bi-plus-lg"></i>

                    <span>
                        Add a policy
                    </span>

                </button>

            </section>


            {/* =====================================
                Search and Filters
            ===================================== */}

            <section className="pv-policy-controls surface">

                <div className="pv-policy-search">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search by policy name, provider or number..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
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
                            setStatusFilter(
                                event.target.value
                            )
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


            {/* =====================================
                Results
            ===================================== */}

            <div className="pv-policy-results">

                <div className="pv-policy-results-header">

                    <span>

                        {loading
                            ? "Loading..."
                            : `${filteredPolicies.length} ${
                                filteredPolicies.length === 1
                                    ? "policy"
                                    : "policies"
                            }`
                        }

                    </span>

                </div>


                {/* =================================
                    Loading
                ================================= */}

                {loading && (

                    <div className="pv-policy-empty surface">

                        <i className="bi bi-arrow-repeat"></i>

                        <h2>
                            Loading policies
                        </h2>

                        <p>
                            Fetching your policies from the PolicyVault server.
                        </p>

                    </div>

                )}


                {/* =================================
                    Error
                ================================= */}

                {!loading && error && (

                    <div className="pv-policy-empty surface">

                        <i className="bi bi-exclamation-circle"></i>

                        <h2>
                            Unable to load policies
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="pv-btn"
                            onClick={() =>
                                window.location.reload()
                            }
                        >
                            Try again
                        </button>

                    </div>

                )}


                {/* =================================
                    Policy Cards
                ================================= */}

                {!loading &&
                    !error &&
                    filteredPolicies.length > 0 && (

                        <div className="pv-policy-cards">

                            {filteredPolicies.map(
                                (policy) => (

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
                                                    {Number(
                                                        policy.premiumAmount
                                                    ).toLocaleString(
                                                        "en-IN"
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
                                                    Coverage
                                                </span>

                                                <strong>
                                                    ₹
                                                    {Number(
                                                        policy.coverageAmount
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
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
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "Not set"
                                                    }

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

                                )
                            )}

                        </div>

                    )}


                {/* =================================
                    Empty State
                ================================= */}

                {!loading &&
                    !error &&
                    filteredPolicies.length === 0 && (

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

    );

}

export default Policies;
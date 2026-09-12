import { useMemo } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../data/policyStore";
import "./Analytics.css";

function Analytics() {
    const navigate = useNavigate();
    const policies = getPolicies();

    const activePolicies = policies.filter(
        (policy) => policy.status === "Active"
    );

    const totalCoverage = policies.reduce(
        (total, policy) =>
            total + Number(policy.coverageAmount || 0),
        0
    );

    const monthlyPremium = policies.reduce(
        (total, policy) =>
            total + Number(policy.premiumAmount || 0),
        0
    );

    const averagePremium =
        policies.length > 0
            ? monthlyPremium / policies.length
            : 0;

    const activeCoverage = activePolicies.reduce(
        (total, policy) =>
            total + Number(policy.coverageAmount || 0),
        0
    );

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const formatCompactCurrency = (amount) => {
        const value = Number(amount);

        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)} Cr`;
        }

        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)} L`;
        }

        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }

        return formatCurrency(value);
    };

    /*
     * Policy type distribution
     */

    const policyTypeData = useMemo(() => {
        const distribution = {};

        policies.forEach((policy) => {
            const type = policy.policyType || "Other";

            distribution[type] =
                (distribution[type] || 0) + 1;
        });

        return Object.entries(distribution)
            .map(([type, count]) => ({
                type,
                count,
                percentage:
                    policies.length > 0
                        ? (count / policies.length) * 100
                        : 0
            }))
            .sort((a, b) => b.count - a.count);
    }, [policies]);

    /*
     * Premium breakdown
     */

    const premiumData = useMemo(() => {
        return [...policies]
            .sort(
                (a, b) =>
                    Number(b.premiumAmount || 0) -
                    Number(a.premiumAmount || 0)
            )
            .map((policy) => ({
                ...policy,
                amount: Number(policy.premiumAmount || 0)
            }));
    }, [policies]);

    const maxPremium = Math.max(
        ...premiumData.map((policy) => policy.amount),
        1
    );

    /*
     * Coverage breakdown
     */

    const coverageData = useMemo(() => {
        return [...policies]
            .sort(
                (a, b) =>
                    Number(b.coverageAmount || 0) -
                    Number(a.coverageAmount || 0)
            )
            .map((policy) => ({
                ...policy,
                amount: Number(policy.coverageAmount || 0)
            }));
    }, [policies]);

    const maxCoverage = Math.max(
        ...coverageData.map((policy) => policy.amount),
        1
    );

    return (
        <div className="pv-analytics-page">

            {/* =========================================
                Header
            ========================================= */}

            <section className="pv-analytics-header">

                <div>
                    <div className="section-label">
                        Your vault
                    </div>

                    <h1 className="page-heading">
                        Analytics
                    </h1>

                    <p className="pv-analytics-subtitle">
                        Understand your coverage, premiums and policy mix at a glance.
                    </p>
                </div>

                <button
                    type="button"
                    className="pv-btn"
                    onClick={() => navigate("/policies")}
                >
                    <i className="bi bi-shield-check"></i>
                    <span>View policies</span>
                </button>

            </section>


            {/* =========================================
                Overview Cards
            ========================================= */}

            <section className="pv-analytics-summary">

                <div className="pv-analytics-summary-card surface">

                    <div className="pv-analytics-summary-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>

                    <div>
                        <span>Total coverage</span>

                        <strong>
                            {formatCompactCurrency(totalCoverage)}
                        </strong>

                        <small>
                            Across {policies.length} polic
                            {policies.length === 1 ? "y" : "ies"}
                        </small>
                    </div>

                </div>


                <div className="pv-analytics-summary-card surface">

                    <div className="pv-analytics-summary-icon">
                        <i className="bi bi-cash-stack"></i>
                    </div>

                    <div>
                        <span>Monthly premium</span>

                        <strong>
                            {formatCurrency(monthlyPremium)}
                        </strong>

                        <small>
                            Recurring commitment
                        </small>
                    </div>

                </div>


                <div className="pv-analytics-summary-card surface">

                    <div className="pv-analytics-summary-icon">
                        <i className="bi bi-check2-circle"></i>
                    </div>

                    <div>
                        <span>Active policies</span>

                        <strong>
                            {activePolicies.length}
                        </strong>

                        <small>
                            Currently in force
                        </small>
                    </div>

                </div>


                <div className="pv-analytics-summary-card surface">

                    <div className="pv-analytics-summary-icon">
                        <i className="bi bi-bar-chart"></i>
                    </div>

                    <div>
                        <span>Average premium</span>

                        <strong>
                            {formatCurrency(averagePremium)}
                        </strong>

                        <small>
                            Per policy / month
                        </small>
                    </div>

                </div>

            </section>


            {/* =========================================
                Main Analytics Grid
            ========================================= */}

            <section className="pv-analytics-grid">

                {/* Policy Distribution */}

                <div className="pv-analytics-card surface">

                    <div className="pv-analytics-card-header">

                        <div>
                            <div className="section-label">
                                Portfolio
                            </div>

                            <h2>
                                Policy distribution
                            </h2>
                        </div>

                        <span>
                            {policies.length} total
                        </span>

                    </div>


                    <div className="pv-policy-distribution">

                        {policyTypeData.length === 0 ? (

                            <div className="pv-analytics-empty">
                                <i className="bi bi-pie-chart"></i>

                                <p>
                                    No policy data available.
                                </p>
                            </div>

                        ) : (

                            policyTypeData.map((item, index) => (

                                <div
                                    className="pv-distribution-item"
                                    key={item.type}
                                >

                                    <div className="pv-distribution-top">

                                        <div className="pv-distribution-name">

                                            <span
                                                className={`pv-distribution-marker pv-marker-${index % 4}`}
                                            ></span>

                                            <strong>
                                                {item.type}
                                            </strong>

                                        </div>

                                        <span>
                                            {item.count} polic
                                            {item.count === 1
                                                ? "y"
                                                : "ies"}
                                        </span>

                                    </div>


                                    <div className="pv-distribution-bar">

                                        <div
                                            className={`pv-distribution-fill pv-fill-${index % 4}`}
                                            style={{
                                                width: `${item.percentage}%`
                                            }}
                                        ></div>

                                    </div>


                                    <div className="pv-distribution-percentage">
                                        {Math.round(item.percentage)}%
                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>


                {/* Coverage Snapshot */}

                <div className="pv-analytics-card surface">

                    <div className="pv-analytics-card-header">

                        <div>
                            <div className="section-label">
                                Protection
                            </div>

                            <h2>
                                Coverage snapshot
                            </h2>
                        </div>

                    </div>


                    <div className="pv-coverage-highlight">

                        <div className="pv-coverage-highlight-icon">
                            <i className="bi bi-shield-fill-check"></i>
                        </div>

                        <div>

                            <span>
                                Active coverage
                            </span>

                            <strong>
                                {formatCompactCurrency(activeCoverage)}
                            </strong>

                            <small>
                                Protected through active policies
                            </small>

                        </div>

                    </div>


                    <div className="pv-coverage-stats">

                        <div>
                            <span>Total policies</span>
                            <strong>{policies.length}</strong>
                        </div>

                        <div>
                            <span>Active</span>
                            <strong>{activePolicies.length}</strong>
                        </div>

                        <div>
                            <span>Policy types</span>
                            <strong>{policyTypeData.length}</strong>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                Premium Breakdown
            ========================================= */}

            <section className="pv-analytics-card surface pv-breakdown-card">

                <div className="pv-analytics-card-header">

                    <div>
                        <div className="section-label">
                            Spending
                        </div>

                        <h2>
                            Premium breakdown
                        </h2>
                    </div>

                    <span>
                        Monthly
                    </span>

                </div>


                <div className="pv-breakdown-list">

                    {premiumData.map((policy) => {

                        const width =
                            (policy.amount / maxPremium) * 100;

                        return (
                            <button
                                type="button"
                                className="pv-breakdown-row"
                                key={policy.id}
                                onClick={() =>
                                    navigate(
                                        `/policies/${policy.id}`
                                    )
                                }
                            >

                                <div className="pv-breakdown-label">

                                    <div className="pv-breakdown-icon">
                                        <i className="bi bi-shield-check"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {policy.policyName}
                                        </strong>

                                        <span>
                                            {policy.provider}
                                        </span>
                                    </div>

                                </div>


                                <div className="pv-breakdown-bar-wrapper">

                                    <div className="pv-breakdown-bar">

                                        <div
                                            className="pv-breakdown-fill"
                                            style={{
                                                width: `${width}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>


                                <div className="pv-breakdown-value">
                                    {formatCurrency(policy.amount)}
                                </div>

                            </button>
                        );
                    })}

                </div>

            </section>


            {/* =========================================
                Coverage Breakdown
            ========================================= */}

            <section className="pv-analytics-card surface pv-breakdown-card">

                <div className="pv-analytics-card-header">

                    <div>
                        <div className="section-label">
                            Protection
                        </div>

                        <h2>
                            Coverage breakdown
                        </h2>
                    </div>

                    <span>
                        Sum assured
                    </span>

                </div>


                <div className="pv-breakdown-list">

                    {coverageData.map((policy) => {

                        const width =
                            (policy.amount / maxCoverage) * 100;

                        return (
                            <button
                                type="button"
                                className="pv-breakdown-row"
                                key={policy.id}
                                onClick={() =>
                                    navigate(
                                        `/policies/${policy.id}`
                                    )
                                }
                            >

                                <div className="pv-breakdown-label">

                                    <div className="pv-breakdown-icon">
                                        <i className="bi bi-shield-check"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {policy.policyName}
                                        </strong>

                                        <span>
                                            {policy.provider}
                                        </span>
                                    </div>

                                </div>


                                <div className="pv-breakdown-bar-wrapper">

                                    <div className="pv-breakdown-bar">

                                        <div
                                            className="pv-breakdown-fill pv-coverage-fill"
                                            style={{
                                                width: `${width}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>


                                <div className="pv-breakdown-value">
                                    {formatCompactCurrency(
                                        policy.amount
                                    )}
                                </div>

                            </button>
                        );
                    })}

                </div>

            </section>

        </div>
    );
}

export default Analytics;
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { getFamilyMembers } from "../data/familyStore";
import "./Family.css";

function Family() {
    const navigate = useNavigate();

    const familyMembers = getFamilyMembers();

    const totalCoverage = familyMembers.reduce(
        (total, member) =>
            total + Number(member.totalCoverage || 0),
        0
    );

    const membersWithPolicies = familyMembers.filter(
        (member) => member.policies.length > 0
    );

    const totalConnections = familyMembers.reduce(
        (total, member) =>
            total + member.policies.length,
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

    const getInitials = (name) => {
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join("");
    };

    const getMemberColorClass = (index) => {
        return `pv-family-avatar-${index % 4}`;
    };

    return (
        <div className="pv-family-page">

            {/* =========================================
                Header
            ========================================= */}

            <section className="pv-family-header">

                <div>
                    <div className="section-label">
                        Your people
                    </div>

                    <h1 className="page-heading">
                        Family
                    </h1>

                    <p className="pv-family-subtitle">
                        Keep track of the people connected to your insurance protection.
                    </p>
                </div>

                <button
                    type="button"
                    className="pv-btn"
                    onClick={() => navigate("/policies")}
                >
                    <i className="bi bi-people"></i>
                    <span>View policies</span>
                </button>

            </section>


            {/* =========================================
                Summary
            ========================================= */}

            <section className="pv-family-summary">

                <div className="pv-family-summary-card surface">

                    <div className="pv-family-summary-icon">
                        <i className="bi bi-people"></i>
                    </div>

                    <div>
                        <span>Family members</span>

                        <strong>
                            {familyMembers.length}
                        </strong>

                        <small>
                            Connected to your vault
                        </small>
                    </div>

                </div>


                <div className="pv-family-summary-card surface">

                    <div className="pv-family-summary-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>

                    <div>
                        <span>Covered members</span>

                        <strong>
                            {membersWithPolicies.length}
                        </strong>

                        <small>
                            With policy connections
                        </small>
                    </div>

                </div>


                <div className="pv-family-summary-card surface">

                    <div className="pv-family-summary-icon">
                        <i className="bi bi-link-45deg"></i>
                    </div>

                    <div>
                        <span>Policy connections</span>

                        <strong>
                            {totalConnections}
                        </strong>

                        <small>
                            Nominee relationships
                        </small>
                    </div>

                </div>


                <div className="pv-family-summary-card surface">

                    <div className="pv-family-summary-icon">
                        <i className="bi bi-wallet2"></i>
                    </div>

                    <div>
                        <span>Associated coverage</span>

                        <strong>
                            {formatCompactCurrency(totalCoverage)}
                        </strong>

                        <small>
                            Across connected policies
                        </small>
                    </div>

                </div>

            </section>


            {/* =========================================
                Family Members
            ========================================= */}

            <section className="pv-family-section surface">

                <div className="pv-family-section-header">

                    <div>
                        <div className="section-label">
                            Your circle
                        </div>

                        <h2>
                            Family members
                        </h2>
                    </div>

                    <span className="pv-family-count">
                        {familyMembers.length} member
                        {familyMembers.length !== 1 ? "s" : ""}
                    </span>

                </div>


                <div className="pv-family-members">

                    {familyMembers.length === 0 ? (

                        <div className="pv-family-empty">

                            <i className="bi bi-people"></i>

                            <h3>
                                No family members yet
                            </h3>

                            <p>
                                Add a nominee to a policy to see them here.
                            </p>

                            <button
                                type="button"
                                className="pv-btn"
                                onClick={() =>
                                    navigate("/policies/add")
                                }
                            >
                                <i className="bi bi-plus-lg"></i>
                                Add a policy
                            </button>

                        </div>

                    ) : (

                        familyMembers.map((member, index) => (

                            <article
                                className="pv-family-member"
                                key={member.id}
                            >

                                <div className="pv-family-member-top">

                                    <div
                                        className={`pv-family-avatar ${getMemberColorClass(index)}`}
                                    >
                                        {getInitials(member.name)}
                                    </div>

                                    <div className="pv-family-member-info">

                                        <h3>
                                            {member.name}
                                        </h3>

                                        <p>
                                            {member.relation}
                                        </p>

                                    </div>

                                </div>


                                <div className="pv-family-member-stats">

                                    <div>
                                        <span>Policies</span>

                                        <strong>
                                            {member.policies.length}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Coverage</span>

                                        <strong>
                                            {formatCompactCurrency(
                                                member.totalCoverage
                                            )}
                                        </strong>
                                    </div>

                                </div>


                                <div className="pv-family-policy-list">

                                    <div className="pv-family-policy-label">
                                        Connected policies
                                    </div>

                                    {member.policies.map(
                                        (policy) => (

                                            <button
                                                type="button"
                                                className="pv-family-policy"
                                                key={policy.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/policies/${policy.id}`
                                                    )
                                                }
                                            >

                                                <div className="pv-family-policy-icon">
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

                                                <div className="pv-family-policy-coverage">
                                                    {formatCompactCurrency(
                                                        policy.coverageAmount
                                                    )}
                                                </div>

                                                <i className="bi bi-arrow-right"></i>

                                            </button>

                                        )
                                    )}

                                </div>

                            </article>

                        ))

                    )}

                </div>

            </section>


            {/* =========================================
                Information Note
            ========================================= */}

            <section className="pv-family-note">

                <div className="pv-family-note-icon">
                    <i className="bi bi-info-circle"></i>
                </div>

                <div>
                    <strong>
                        Family information comes from your policies
                    </strong>

                    <p>
                        Family members shown here are based on the nominee information
                        saved with your policies.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Family;
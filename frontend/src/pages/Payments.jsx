import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies, getPayments } from "../services/api";
import "./Payments.css";

function Payments() {
    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPayments() {
            try {
                setLoading(true);
                setError("");

                const [policyData, paymentData] = await Promise.all([
                    getPolicies(),
                    getPayments()
                ]);

                setPolicies(policyData);
                setPayments(paymentData);
            } catch (error) {
                console.error("Unable to load payments:", error);

                setError(
                    "Unable to load payment information. Please make sure the backend is running."
                );
            } finally {
                setLoading(false);
            }
        }

        loadPayments();
    }, []);

    const today = new Date();

    const upcomingPayments = useMemo(() => {
        return policies
            .filter((policy) => policy.status === "Active")
            .map((policy) => ({
                ...policy,
                dueDate: new Date(policy.nextPaymentDate)
            }))
            .filter((policy) => policy.dueDate >= today)
            .sort((a, b) => a.dueDate - b.dueDate);
    }, [policies]);

    const overduePayments = useMemo(() => {
        return policies
            .filter((policy) => policy.status === "Active")
            .map((policy) => ({
                ...policy,
                dueDate: new Date(policy.nextPaymentDate)
            }))
            .filter((policy) => policy.dueDate < today)
            .sort((a, b) => b.dueDate - a.dueDate);
    }, [policies]);

    const totalPaid = payments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

    const upcomingAmount = upcomingPayments.reduce(
        (total, policy) => total + Number(policy.premiumAmount || 0),
        0
    );

    const overdueAmount = overduePayments.reduce(
        (total, policy) => total + Number(policy.premiumAmount || 0),
        0
    );

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN")}`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getDaysDifference = (date) => {
        const targetDate = new Date(date);

        const difference =
            targetDate.getTime() - today.getTime();

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    };

    if (loading) {
        return (
            <div className="pv-payments-page">
                <div className="surface pv-loading">
                    Loading payment information...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pv-payments-page">
                <div className="surface pv-error">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="pv-payments-page">

            <section className="pv-payments-header">
                <div>
                    <div className="section-label">
                        Your vault
                    </div>

                    <h1 className="page-heading">
                        Payments
                    </h1>

                    <p className="pv-payments-subtitle">
                        Keep track of upcoming premiums and your payment history.
                    </p>
                </div>

        <div className="pv-payments-header-actions">

            <button
                className="pv-btn-outline"
                onClick={() => navigate("/policies")}
            >
            <i className="bi bi-shield-check"></i>
            <span>View policies</span>
            </button>

            <button
                className="pv-btn"
                onClick={() => navigate("/payments/add")}
            >
            <i className="bi bi-plus-lg"></i>
            <span>Record payment</span>
            </button>

        </div>

            </section>


            <section className="pv-payment-summary">

                <div className="pv-payment-summary-card surface">
                    <div className="pv-payment-summary-icon">
                        <i className="bi bi-calendar-check"></i>
                    </div>

                    <div>
                        <span>Upcoming</span>

                        <strong>
                            {formatCurrency(upcomingAmount)}
                        </strong>

                        <small>
                            {upcomingPayments.length} payment
                            {upcomingPayments.length !== 1 ? "s" : ""}
                        </small>
                    </div>
                </div>


                <div className="pv-payment-summary-card surface">
                    <div className="pv-payment-summary-icon pv-warning-icon">
                        <i className="bi bi-exclamation-circle"></i>
                    </div>

                    <div>
                        <span>Overdue</span>

                        <strong>
                            {formatCurrency(overdueAmount)}
                        </strong>

                        <small>
                            {overduePayments.length} payment
                            {overduePayments.length !== 1 ? "s" : ""}
                        </small>
                    </div>
                </div>


                <div className="pv-payment-summary-card surface">
                    <div className="pv-payment-summary-icon">
                        <i className="bi bi-check2-circle"></i>
                    </div>

                    <div>
                        <span>Paid</span>

                        <strong>
                            {formatCurrency(totalPaid)}
                        </strong>

                        <small>
                            Recorded payments
                        </small>
                    </div>
                </div>


                <div className="pv-payment-summary-card surface">
                    <div className="pv-payment-summary-icon">
                        <i className="bi bi-wallet2"></i>
                    </div>

                    <div>
                        <span>Monthly commitment</span>

                        <strong>
                            {formatCurrency(
                                policies.reduce(
                                    (total, policy) =>
                                        total +
                                        Number(policy.premiumAmount || 0),
                                    0
                                )
                            )}
                        </strong>

                        <small>
                            Across your vault
                        </small>
                    </div>
                </div>

            </section>


            <section className="pv-payments-section surface">

                <div className="pv-payments-section-header">
                    <div>
                        <div className="section-label">
                            Coming up
                        </div>

                        <h2>
                            Upcoming payments
                        </h2>
                    </div>

                    <span className="pv-payment-count">
                        {upcomingPayments.length} upcoming
                    </span>
                </div>


                <div className="pv-upcoming-list">

                    {upcomingPayments.length === 0 ? (
                        <div className="pv-empty-state">
                            <i className="bi bi-check-circle"></i>

                            <h3>
                                You're all caught up
                            </h3>

                            <p>
                                There are no upcoming premium payments right now.
                            </p>
                        </div>
                    ) : (

                        upcomingPayments.map((policy) => {

                            const days = getDaysDifference(
                                policy.nextPaymentDate
                            );

                            return (
                                <div
                                    className="pv-upcoming-row"
                                    key={policy.id}
                                >

                                    <div className="pv-payment-policy">

                                        <div className="pv-payment-policy-icon">
                                            <i className="bi bi-shield-check"></i>
                                        </div>

                                        <div>
                                            <h3>
                                                {policy.policyName}
                                            </h3>

                                            <p>
                                                {policy.provider}
                                                {" · "}
                                                Policy No. {policy.policyNumber}
                                            </p>
                                        </div>

                                    </div>


                                    <div className="pv-payment-amount">

                                        <span>
                                            Premium
                                        </span>

                                        <strong>
                                            {formatCurrency(
                                                policy.premiumAmount
                                            )}
                                        </strong>

                                        <small>
                                            /{policy.premiumFrequency.toLowerCase()}
                                        </small>

                                    </div>


                                    <div className="pv-payment-due">

                                        <span>
                                            Due date
                                        </span>

                                        <strong>
                                            {formatDate(
                                                policy.nextPaymentDate
                                            )}
                                        </strong>

                                        <small>
                                            {days === 0
                                                ? "Due today"
                                                : days === 1
                                                    ? "Due tomorrow"
                                                    : `Due in ${days} days`}
                                        </small>

                                    </div>


                                    <button
                                        className="pv-payment-action"
                                        onClick={() =>
                                            navigate(`/policies/${policy.id}`)
                                        }
                                    >
                                        View policy
                                        <i className="bi bi-arrow-right"></i>
                                    </button>

                                </div>
                            );
                        })
                    )}

                </div>

            </section>


            <section className="pv-payments-section surface">

                <div className="pv-payments-section-header">
                    <div>
                        <div className="section-label">
                            Recent activity
                        </div>

                        <h2>
                            Payment history
                        </h2>
                    </div>

                    <span className="pv-payment-count">
                        {payments.length} recorded
                    </span>
                </div>


                <div className="pv-payment-history">

                    <div className="pv-payment-history-head">
                        <span>Policy</span>
                        <span>Payment date</span>
                        <span>Amount</span>
                        <span>Method</span>
                        <span>Status</span>
                    </div>


                    {payments.length === 0 ? (

                        <div className="pv-empty-state">
                            <i className="bi bi-receipt"></i>

                            <h3>
                                No payment history
                            </h3>

                            <p>
                                Your completed payments will appear here.
                            </p>
                        </div>

                    ) : (

                        payments.map((payment) => (

                            <div
                                className="pv-payment-history-row"
                                key={payment.id}
                            >

                                <div className="pv-history-policy">

                                    <div className="pv-history-icon">
                                        <i className="bi bi-receipt"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {payment.policyName}
                                        </strong>

                                        <span>
                                            {payment.provider}
                                        </span>
                                    </div>

                                </div>


                                <div>
                                    <strong>
                                        {formatDate(
                                            payment.paymentDate
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    <strong>
                                        {formatCurrency(
                                            payment.amount
                                        )}
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        {payment.paymentMethod}
                                    </span>
                                </div>


                                <div>
                                    <span className="pv-payment-status">
                                        <i className="bi bi-check2"></i>
                                        {payment.status}
                                    </span>
                                </div>

                            </div>

                        ))
                    )}

                </div>

            </section>

        </div>
    );
}

export default Payments;
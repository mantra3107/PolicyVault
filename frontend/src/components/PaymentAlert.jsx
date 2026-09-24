import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPolicies } from "../services/api";
import "./PaymentAlert.css";

function PaymentAlert() {
    const navigate = useNavigate();
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUpcomingPayments() {
            try {
                const policies = await getPolicies();

                const today = new Date();
                const next30Days = new Date();

                next30Days.setDate(today.getDate() + 30);

                const count = policies.filter((policy) => {
                    if (
                        policy.status !== "Active" ||
                        !policy.nextPaymentDate
                    ) {
                        return false;
                    }

                    const paymentDate = new Date(policy.nextPaymentDate);

                    return (
                        paymentDate >= today &&
                        paymentDate <= next30Days
                    );
                }).length;

                setUpcomingCount(count);
            } catch (error) {
                console.error(
                    "Unable to load upcoming payments:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadUpcomingPayments();
    }, []);

    let message = "No premiums coming up in your vault.";

    if (loading) {
        message = "Checking your upcoming premiums...";
    } else if (upcomingCount === 1) {
        message = "1 premium coming up in your vault.";
    } else if (upcomingCount > 1) {
        message = `${upcomingCount} premiums coming up in your vault.`;
    }

    return (
        <section className="pv-payment-alert">
            <div className="pv-payment-alert-icon">
                <i className="bi bi-stars"></i>
            </div>

            <div className="pv-payment-alert-content">
                <h2>Stay ahead of the next payment</h2>

                <p>{message}</p>
            </div>

            <button
                className="pv-payment-alert-action"
                onClick={() => navigate("/payments")}
            >
                <span>Open payments</span>
                <i className="bi bi-arrow-right"></i>
            </button>
        </section>
    );
}

export default PaymentAlert;
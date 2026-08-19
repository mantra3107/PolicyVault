import "./PaymentAlert.css";

function PaymentAlert() {
    return (
        <section className="pv-payment-alert">
            <div className="pv-payment-alert-icon">
                <i className="bi bi-stars"></i>
            </div>

            <div className="pv-payment-alert-content">
                <h2>Stay ahead of the next payment</h2>

                <p>
                    2 premiums coming up in your vault.
                </p>
            </div>

            <button className="pv-payment-alert-action">
                <span>Open payments</span>
                <i className="bi bi-arrow-right"></i>
            </button>
        </section>
    );
}

export default PaymentAlert;
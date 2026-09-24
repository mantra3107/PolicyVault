import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createPayment, getPolicies } from "../services/api";
import "./AddPayment.css";

function AddPayment() {
    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);
    const [loadingPolicies, setLoadingPolicies] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        policyId: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "UPI",
        status: "Paid"
    });

    useEffect(() => {
        async function loadPolicies() {
            try {
                setLoadingPolicies(true);
                setError("");

                const data = await getPolicies();

                setPolicies(data);
            } catch (error) {
                console.error("Unable to load policies:", error);

                setError(
                    "Unable to load policies. Please make sure the backend is running."
                );
            } finally {
                setLoadingPolicies(false);
            }
        }

        loadPolicies();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        if (name === "policyId") {
            const selectedPolicy = policies.find(
                (policy) => String(policy.id) === value
            );

            if (selectedPolicy) {
                setFormData((previousData) => ({
                    ...previousData,
                    policyId: value,
                    amount: selectedPolicy.premiumAmount
                }));
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!formData.policyId) {
            setError("Please select a policy.");

            return;
        }

        if (!formData.amount || Number(formData.amount) <= 0) {
            setError("Please enter a valid payment amount.");

            return;
        }

        if (!formData.paymentDate) {
            setError("Please select the payment date.");

            return;
        }

        try {
            setSaving(true);

            await createPayment({
                policyId: Number(formData.policyId),
                amount: Number(formData.amount),
                paymentDate: formData.paymentDate,
                paymentMethod: formData.paymentMethod,
                status: formData.status
            });

            navigate("/payments");
        } catch (error) {
            console.error("Unable to create payment:", error);

            setError(
                error.message ||
                "Unable to record the payment. Please make sure the backend is running."
            );
        } finally {
            setSaving(false);
        }
    }

    const selectedPolicy = policies.find(
        (policy) => String(policy.id) === String(formData.policyId)
    );

    return (
        <div className="pv-add-payment-page">

            {/* Header */}

            <section className="pv-add-payment-header">

                <div>
                    <div className="section-label">
                        Your payments
                    </div>

                    <h1 className="page-heading">
                        Record a payment
                    </h1>

                    <p className="pv-add-payment-subtitle">
                        Record a premium payment to keep your payment
                        history accurate and up to date.
                    </p>
                </div>

                <button
                    type="button"
                    className="pv-btn-outline"
                    onClick={() => navigate("/payments")}
                    disabled={saving}
                >
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to payments</span>
                </button>

            </section>


            {/* Form */}

            <form
                className="pv-payment-form"
                onSubmit={handleSubmit}
            >

                {/* Payment Information */}

                <section className="pv-payment-form-section surface">

                    <div className="pv-payment-form-section-header">

                        <div>
                            <div className="section-label">
                                Payment information
                            </div>

                            <h2>
                                Payment details
                            </h2>
                        </div>

                        <div className="pv-payment-form-section-icon">
                            <i className="bi bi-receipt"></i>
                        </div>

                    </div>


                    <div className="pv-payment-form-grid">

                        {/* Policy */}

                        <div className="pv-payment-form-field pv-payment-form-field-full">

                            <label htmlFor="policyId">
                                Policy
                            </label>

                            <select
                                id="policyId"
                                name="policyId"
                                value={formData.policyId}
                                onChange={handleChange}
                                disabled={
                                    saving ||
                                    loadingPolicies
                                }
                                required
                            >
                                <option value="">
                                    {loadingPolicies
                                        ? "Loading policies..."
                                        : "Select a policy"}
                                </option>

                                {policies.map((policy) => (
                                    <option
                                        key={policy.id}
                                        value={policy.id}
                                    >
                                        {policy.policyName} — {policy.provider}
                                    </option>
                                ))}
                            </select>

                        </div>


                        {/* Selected policy information */}

                        {selectedPolicy && (
                            <div className="pv-selected-policy">

                                <div className="pv-selected-policy-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>

                                <div>
                                    <strong>
                                        {selectedPolicy.policyName}
                                    </strong>

                                    <span>
                                        {selectedPolicy.provider}
                                        {" · "}
                                        {selectedPolicy.policyNumber}
                                    </span>
                                </div>

                                <div className="pv-selected-policy-premium">
                                    <span>
                                        Premium
                                    </span>

                                    <strong>
                                        ₹{Number(
                                            selectedPolicy.premiumAmount
                                        ).toLocaleString("en-IN")}
                                    </strong>

                                    <small>
                                        /{selectedPolicy.premiumFrequency.toLowerCase()}
                                    </small>
                                </div>

                            </div>
                        )}


                        {/* Amount */}

                        <div className="pv-payment-form-field">

                            <label htmlFor="amount">
                                Payment amount
                            </label>

                            <div className="pv-payment-input-with-prefix">
                                <span>₹</span>

                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    min="1"
                                    placeholder="2500"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    disabled={saving}
                                />
                            </div>

                        </div>


                        {/* Date */}

                        <div className="pv-payment-form-field">

                            <label htmlFor="paymentDate">
                                Payment date
                            </label>

                            <input
                                id="paymentDate"
                                name="paymentDate"
                                type="date"
                                value={formData.paymentDate}
                                onChange={handleChange}
                                required
                                disabled={saving}
                            />

                        </div>


                        {/* Payment Method */}

                        <div className="pv-payment-form-field">

                            <label htmlFor="paymentMethod">
                                Payment method
                            </label>

                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="UPI">
                                    UPI
                                </option>

                                <option value="Auto Debit">
                                    Auto Debit
                                </option>

                                <option value="Credit Card">
                                    Credit Card
                                </option>

                                <option value="Debit Card">
                                    Debit Card
                                </option>

                                <option value="Net Banking">
                                    Net Banking
                                </option>

                                <option value="Cash">
                                    Cash
                                </option>
                            </select>

                        </div>


                        {/* Status */}

                        <div className="pv-payment-form-field">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="Paid">
                                    Paid
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Failed">
                                    Failed
                                </option>
                            </select>

                        </div>

                    </div>

                </section>


                {/* Error */}

                {error && (
                    <div className="pv-payment-form-error">

                        <i className="bi bi-exclamation-circle"></i>

                        <span>
                            {error}
                        </span>

                    </div>
                )}


                {/* Actions */}

                <div className="pv-payment-form-actions">

                    <button
                        type="button"
                        className="pv-btn-outline"
                        onClick={() => navigate("/payments")}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="pv-btn"
                        disabled={
                            saving ||
                            loadingPolicies
                        }
                    >
                        <i
                            className={
                                saving
                                    ? "bi bi-arrow-repeat"
                                    : "bi bi-check-lg"
                            }
                        ></i>

                        <span>
                            {saving
                                ? "Recording..."
                                : "Record payment"}
                        </span>

                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddPayment;
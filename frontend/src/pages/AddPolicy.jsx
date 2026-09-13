import { useState } from "react";
import { useNavigate } from "react-router";
import { createPolicy } from "../services/api";
import "./AddPolicy.css";

function AddPolicy() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        policyName: "",
        provider: "",
        policyNumber: "",
        policyType: "Life Insurance",
        status: "Active",

        premiumAmount: "",
        premiumFrequency: "Monthly",
        coverageAmount: "",

        startDate: "",
        maturityDate: "",
        nextPaymentDate: "",

        nomineeName: "",
        nomineeRelation: "Spouse",

        notes: ""
    });

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (
            !formData.policyName.trim() ||
            !formData.provider.trim() ||
            !formData.policyNumber.trim()
        ) {
            setError(
                "Please fill in the policy name, provider and policy number."
            );

            return;
        }

        if (
            !formData.premiumAmount ||
            !formData.coverageAmount
        ) {
            setError(
                "Please enter the premium and coverage amounts."
            );

            return;
        }

        try {
            setSaving(true);

            const policy = {
                ...formData,

                premiumAmount: Number(formData.premiumAmount),
                coverageAmount: Number(formData.coverageAmount)
            };

            await createPolicy(policy);

            navigate("/policies");
        } catch (error) {
            console.error("Unable to create policy:", error);

            setError(
                error.message ||
                "Unable to save the policy. Please make sure the backend is running."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="pv-add-policy-page">

            {/* Header */}

            <section className="pv-add-policy-header">

                <div>
                    <div className="section-label">
                        Your policies
                    </div>

                    <h1 className="page-heading">
                        Add a new policy
                    </h1>

                    <p className="pv-add-policy-subtitle">
                        Add the details of your insurance policy
                        to keep everything organized in your vault.
                    </p>
                </div>

                <button
                    type="button"
                    className="pv-btn-outline"
                    onClick={() => navigate("/policies")}
                    disabled={saving}
                >
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to policies</span>
                </button>

            </section>


            {/* Form */}

            <form
                className="pv-policy-form"
                onSubmit={handleSubmit}
            >

                {/* Policy Information */}

                <section className="pv-form-section surface">

                    <div className="pv-form-section-header">
                        <div>
                            <div className="section-label">
                                Policy information
                            </div>

                            <h2>
                                Basic details
                            </h2>
                        </div>

                        <div className="pv-form-section-icon">
                            <i className="bi bi-shield-check"></i>
                        </div>
                    </div>


                    <div className="pv-form-grid">

                        <div className="pv-form-field pv-form-field-full">
                            <label htmlFor="policyName">
                                Policy name
                            </label>

                            <input
                                id="policyName"
                                name="policyName"
                                type="text"
                                placeholder="e.g. Secure Future Plan"
                                value={formData.policyName}
                                onChange={handleChange}
                                required
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="provider">
                                Insurance provider
                            </label>

                            <input
                                id="provider"
                                name="provider"
                                type="text"
                                placeholder="e.g. LIC"
                                value={formData.provider}
                                onChange={handleChange}
                                required
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="policyNumber">
                                Policy number
                            </label>

                            <input
                                id="policyNumber"
                                name="policyNumber"
                                type="text"
                                placeholder="e.g. 123456789"
                                value={formData.policyNumber}
                                onChange={handleChange}
                                required
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="policyType">
                                Policy type
                            </label>

                            <select
                                id="policyType"
                                name="policyType"
                                value={formData.policyType}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="Life Insurance">
                                    Life Insurance
                                </option>

                                <option value="Health Insurance">
                                    Health Insurance
                                </option>

                                <option value="Retirement">
                                    Retirement
                                </option>

                                <option value="Endowment">
                                    Endowment
                                </option>

                                <option value="Term Insurance">
                                    Term Insurance
                                </option>
                            </select>
                        </div>


                        <div className="pv-form-field">
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
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Upcoming">
                                    Upcoming
                                </option>

                                <option value="Expired">
                                    Expired
                                </option>

                                <option value="Lapsed">
                                    Lapsed
                                </option>
                            </select>
                        </div>

                    </div>

                </section>


                {/* Premium & Coverage */}

                <section className="pv-form-section surface">

                    <div className="pv-form-section-header">

                        <div>
                            <div className="section-label">
                                Financial details
                            </div>

                            <h2>
                                Premium & coverage
                            </h2>
                        </div>

                        <div className="pv-form-section-icon">
                            <i className="bi bi-currency-rupee"></i>
                        </div>

                    </div>


                    <div className="pv-form-grid">

                        <div className="pv-form-field">
                            <label htmlFor="premiumAmount">
                                Premium amount
                            </label>

                            <div className="pv-input-with-prefix">
                                <span>₹</span>

                                <input
                                    id="premiumAmount"
                                    name="premiumAmount"
                                    type="number"
                                    min="0"
                                    placeholder="2500"
                                    value={formData.premiumAmount}
                                    onChange={handleChange}
                                    required
                                    disabled={saving}
                                />
                            </div>
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="premiumFrequency">
                                Premium frequency
                            </label>

                            <select
                                id="premiumFrequency"
                                name="premiumFrequency"
                                value={formData.premiumFrequency}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="Monthly">
                                    Monthly
                                </option>

                                <option value="Quarterly">
                                    Quarterly
                                </option>

                                <option value="Half-Yearly">
                                    Half-Yearly
                                </option>

                                <option value="Yearly">
                                    Yearly
                                </option>
                            </select>
                        </div>


                        <div className="pv-form-field pv-form-field-full">
                            <label htmlFor="coverageAmount">
                                Coverage amount
                            </label>

                            <div className="pv-input-with-prefix">
                                <span>₹</span>

                                <input
                                    id="coverageAmount"
                                    name="coverageAmount"
                                    type="number"
                                    min="0"
                                    placeholder="1000000"
                                    value={formData.coverageAmount}
                                    onChange={handleChange}
                                    required
                                    disabled={saving}
                                />
                            </div>
                        </div>

                    </div>

                </section>


                {/* Dates */}

                <section className="pv-form-section surface">

                    <div className="pv-form-section-header">

                        <div>
                            <div className="section-label">
                                Policy timeline
                            </div>

                            <h2>
                                Important dates
                            </h2>
                        </div>

                        <div className="pv-form-section-icon">
                            <i className="bi bi-calendar3"></i>
                        </div>

                    </div>


                    <div className="pv-form-grid">

                        <div className="pv-form-field">
                            <label htmlFor="startDate">
                                Start date
                            </label>

                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="maturityDate">
                                Maturity date
                            </label>

                            <input
                                id="maturityDate"
                                name="maturityDate"
                                type="date"
                                value={formData.maturityDate}
                                onChange={handleChange}
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field pv-form-field-full">
                            <label htmlFor="nextPaymentDate">
                                Next payment date
                            </label>

                            <input
                                id="nextPaymentDate"
                                name="nextPaymentDate"
                                type="date"
                                value={formData.nextPaymentDate}
                                onChange={handleChange}
                                disabled={saving}
                            />
                        </div>

                    </div>

                </section>


                {/* Nominee */}

                <section className="pv-form-section surface">

                    <div className="pv-form-section-header">

                        <div>
                            <div className="section-label">
                                Nominee
                            </div>

                            <h2>
                                Nominee details
                            </h2>
                        </div>

                        <div className="pv-form-section-icon">
                            <i className="bi bi-people"></i>
                        </div>

                    </div>


                    <div className="pv-form-grid">

                        <div className="pv-form-field">
                            <label htmlFor="nomineeName">
                                Nominee name
                            </label>

                            <input
                                id="nomineeName"
                                name="nomineeName"
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                value={formData.nomineeName}
                                onChange={handleChange}
                                disabled={saving}
                            />
                        </div>


                        <div className="pv-form-field">
                            <label htmlFor="nomineeRelation">
                                Relationship
                            </label>

                            <select
                                id="nomineeRelation"
                                name="nomineeRelation"
                                value={formData.nomineeRelation}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="Spouse">
                                    Spouse
                                </option>

                                <option value="Father">
                                    Father
                                </option>

                                <option value="Mother">
                                    Mother
                                </option>

                                <option value="Son">
                                    Son
                                </option>

                                <option value="Daughter">
                                    Daughter
                                </option>

                                <option value="Sibling">
                                    Sibling
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                    </div>

                </section>


                {/* Notes */}

                <section className="pv-form-section surface">

                    <div className="pv-form-section-header">

                        <div>
                            <div className="section-label">
                                Additional information
                            </div>

                            <h2>
                                Notes
                            </h2>
                        </div>

                    </div>


                    <div className="pv-form-field">

                        <label htmlFor="notes">
                            Notes
                        </label>

                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            placeholder="Add any useful information about this policy..."
                            value={formData.notes}
                            onChange={handleChange}
                            disabled={saving}
                        />

                    </div>

                </section>


                {/* Error */}

                {error && (
                    <div className="pv-form-error">
                        <i className="bi bi-exclamation-circle"></i>

                        <span>
                            {error}
                        </span>
                    </div>
                )}


                {/* Actions */}

                <div className="pv-form-actions">

                    <button
                        type="button"
                        className="pv-btn-outline"
                        onClick={() => navigate("/policies")}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="pv-btn"
                        disabled={saving}
                    >
                        <i
                            className={
                                saving
                                    ? "bi bi-arrow-repeat"
                                    : "bi bi-check-lg"
                            }
                        ></i>

                        <span>
                            {saving ? "Saving..." : "Save policy"}
                        </span>
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddPolicy;
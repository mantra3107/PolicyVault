import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/api";
import "./Settings.css";

function Settings() {
    const [settings, setSettings] = useState({
        name: "",
        email: "",
        currency: "INR",
        dateFormat: "DD MMM YYYY",
        paymentReminders: true,
        policyExpiryReminders: true
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error(
                    "Unable to load settings:",
                    error
                );

                setError("Unable to load settings.");
            } finally {
                setLoading(false);
            }
        }

        loadSettings();
    }, []);

    const updateSetting = (key, value) => {
        setSettings((current) => ({
            ...current,
            [key]: value
        }));

        setSaved(false);
        setError("");
    };

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setSaved(false);
            setError("");

            const updatedSettings =
                await updateSettings(settings);

            setSettings(updatedSettings);
            setSaved(true);

            setTimeout(() => {
                setSaved(false);
            }, 2500);
        } catch (error) {
            console.error(
                "Unable to save settings:",
                error
            );

            setError(
                error.message || "Unable to save settings."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="pv-settings-page">

                <section className="pv-settings-header">

                    <div>
                        <div className="section-label">
                            Your account
                        </div>

                        <h1 className="page-heading">
                            Settings
                        </h1>

                        <p className="pv-settings-subtitle">
                            Manage your profile, preferences and PolicyVault reminders.
                        </p>
                    </div>

                </section>

                <div className="pv-settings-section surface">
                    <div className="pv-family-empty">
                        Loading settings...
                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="pv-settings-page">

            <section className="pv-settings-header">

                <div>
                    <div className="section-label">
                        Your account
                    </div>

                    <h1 className="page-heading">
                        Settings
                    </h1>

                    <p className="pv-settings-subtitle">
                        Manage your profile, preferences and PolicyVault reminders.
                    </p>
                </div>

            </section>


            <form
                className="pv-settings-form"
                onSubmit={handleSave}
            >

                <section className="pv-settings-section surface">

                    <div className="pv-settings-section-header">

                        <div>
                            <div className="section-label">
                                Account
                            </div>

                            <h2>
                                Profile
                            </h2>

                            <p>
                                The basic information used across your PolicyVault account.
                            </p>
                        </div>

                        <div className="pv-settings-section-icon">
                            <i className="bi bi-person"></i>
                        </div>

                    </div>


                    <div className="pv-settings-fields">

                        <div className="pv-settings-field">

                            <label htmlFor="settings-name">
                                Display name
                            </label>

                            <input
                                id="settings-name"
                                type="text"
                                value={settings.name}
                                onChange={(event) =>
                                    updateSetting(
                                        "name",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your name"
                            />

                        </div>


                        <div className="pv-settings-field">

                            <label htmlFor="settings-email">
                                Email address
                            </label>

                            <input
                                id="settings-email"
                                type="email"
                                value={settings.email}
                                onChange={(event) =>
                                    updateSetting(
                                        "email",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your email"
                            />

                        </div>

                    </div>

                </section>


                <section className="pv-settings-section surface">

                    <div className="pv-settings-section-header">

                        <div>
                            <div className="section-label">
                                Personalize
                            </div>

                            <h2>
                                Preferences
                            </h2>

                            <p>
                                Choose how information is displayed throughout the application.
                            </p>
                        </div>

                        <div className="pv-settings-section-icon">
                            <i className="bi bi-sliders"></i>
                        </div>

                    </div>


                    <div className="pv-settings-fields">

                        <div className="pv-settings-field">

                            <label htmlFor="settings-currency">
                                Currency
                            </label>

                            <select
                                id="settings-currency"
                                value={settings.currency}
                                onChange={(event) =>
                                    updateSetting(
                                        "currency",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="INR">
                                    Indian Rupee (₹)
                                </option>

                                <option value="USD">
                                    US Dollar ($)
                                </option>

                                <option value="EUR">
                                    Euro (€)
                                </option>

                            </select>

                        </div>


                        <div className="pv-settings-field">

                            <label htmlFor="settings-date-format">
                                Date format
                            </label>

                            <select
                                id="settings-date-format"
                                value={settings.dateFormat}
                                onChange={(event) =>
                                    updateSetting(
                                        "dateFormat",
                                        event.target.value
                                    )
                                }
                            >
                                <option value="DD MMM YYYY">
                                    12 Sep 2026
                                </option>

                                <option value="DD/MM/YYYY">
                                    12/09/2026
                                </option>

                                <option value="MM/DD/YYYY">
                                    09/12/2026
                                </option>

                            </select>

                        </div>

                    </div>

                </section>


                <section className="pv-settings-section surface">

                    <div className="pv-settings-section-header">

                        <div>
                            <div className="section-label">
                                Stay informed
                            </div>

                            <h2>
                                Notifications
                            </h2>

                            <p>
                                Choose which reminders you want to receive.
                            </p>
                        </div>

                        <div className="pv-settings-section-icon">
                            <i className="bi bi-bell"></i>
                        </div>

                    </div>


                    <div className="pv-settings-options">

                        <div className="pv-settings-option">

                            <div className="pv-settings-option-icon">
                                <i className="bi bi-calendar-check"></i>
                            </div>

                            <div className="pv-settings-option-content">

                                <strong>
                                    Payment reminders
                                </strong>

                                <span>
                                    Get reminded when a premium payment is approaching.
                                </span>

                            </div>

                            <label className="pv-toggle">

                                <input
                                    type="checkbox"
                                    checked={
                                        settings.paymentReminders
                                    }
                                    onChange={(event) =>
                                        updateSetting(
                                            "paymentReminders",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span className="pv-toggle-slider"></span>

                            </label>

                        </div>


                        <div className="pv-settings-option">

                            <div className="pv-settings-option-icon">
                                <i className="bi bi-hourglass-split"></i>
                            </div>

                            <div className="pv-settings-option-content">

                                <strong>
                                    Policy expiry reminders
                                </strong>

                                <span>
                                    Get reminded when a policy is approaching maturity.
                                </span>

                            </div>

                            <label className="pv-toggle">

                                <input
                                    type="checkbox"
                                    checked={
                                        settings.policyExpiryReminders
                                    }
                                    onChange={(event) =>
                                        updateSetting(
                                            "policyExpiryReminders",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span className="pv-toggle-slider"></span>

                            </label>

                        </div>

                    </div>

                </section>


                <section className="pv-settings-section surface">

                    <div className="pv-settings-section-header">

                        <div>
                            <div className="section-label">
                                Storage
                            </div>

                            <h2>
                                Data & privacy
                            </h2>

                            <p>
                                Understand how your current PolicyVault data is stored.
                            </p>
                        </div>

                        <div className="pv-settings-section-icon">
                            <i className="bi bi-database"></i>
                        </div>

                    </div>


                    <div className="pv-settings-data-card">

                        <div className="pv-settings-data-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>

                        <div>

                            <strong>
                                MySQL database
                            </strong>

                            <p>
                                Your PolicyVault account settings are stored in the backend database.
                            </p>

                        </div>

                        <span className="pv-settings-data-status">
                            Connected
                        </span>

                    </div>

                </section>


                <div className="pv-settings-save-bar">

                    <div>

                        {error && (
                            <span className="pv-settings-saved">
                                <i className="bi bi-exclamation-circle"></i>
                                {error}
                            </span>
                        )}

                        {saved && !error && (
                            <span className="pv-settings-saved">
                                <i className="bi bi-check-circle"></i>
                                Changes saved
                            </span>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="pv-btn"
                        disabled={saving}
                    >
                        <i className="bi bi-check2"></i>

                        {saving
                            ? "Saving..."
                            : "Save changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Settings;
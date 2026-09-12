const STORAGE_KEY = "policyvault_settings";

const defaultSettings = {
    name: "Demo User",
    email: "demo@policyvault.app",
    currency: "INR",
    dateFormat: "DD MMM YYYY",
    paymentReminders: true,
    policyExpiryReminders: true
};

export function getSettings() {
    const storedSettings = localStorage.getItem(STORAGE_KEY);

    if (storedSettings) {
        try {
            return {
                ...defaultSettings,
                ...JSON.parse(storedSettings)
            };
        } catch (error) {
            console.error(
                "Unable to read saved settings:",
                error
            );
        }
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultSettings)
    );

    return defaultSettings;
}

export function saveSettings(settings) {
    const updatedSettings = {
        ...defaultSettings,
        ...settings
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedSettings)
    );

    return updatedSettings;
}

export { defaultSettings };
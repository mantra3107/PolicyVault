import initialPolicies from "./policies";

const STORAGE_KEY = "policyvault_policies";

export function getPolicies() {
    const storedPolicies = localStorage.getItem(STORAGE_KEY);

    if (storedPolicies) {
        try {
            return JSON.parse(storedPolicies);
        } catch (error) {
            console.error("Unable to read saved policies:", error);
        }
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialPolicies)
    );

    return initialPolicies;
}

export function savePolicies(policies) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(policies)
    );
}

export function addPolicy(policy) {
    const currentPolicies = getPolicies();

    const newPolicy = {
        ...policy,
        id: Date.now()
    };

    const updatedPolicies = [
        ...currentPolicies,
        newPolicy
    ];

    savePolicies(updatedPolicies);

    return newPolicy;
}
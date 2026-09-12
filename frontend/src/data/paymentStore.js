import initialPayments from "./payments";

const STORAGE_KEY = "policyvault_payments";

export function getPayments() {
    const storedPayments = localStorage.getItem(STORAGE_KEY);

    if (storedPayments) {
        try {
            return JSON.parse(storedPayments);
        } catch (error) {
            console.error("Unable to read saved payments:", error);
        }
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialPayments)
    );

    return initialPayments;
}

export function savePayments(payments) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(payments)
    );
}

export function addPayment(payment) {
    const currentPayments = getPayments();

    const newPayment = {
        ...payment,
        id: Date.now()
    };

    const updatedPayments = [
        newPayment,
        ...currentPayments
    ];

    savePayments(updatedPayments);

    return newPayment;
}
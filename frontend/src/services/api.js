const API_BASE_URL = "http://localhost:5000/api";


/* =========================================
   Generic API Request
========================================= */

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Something went wrong"
        );

    }


    return data;
}


/* =========================================
   Convert API Policy → Frontend Policy
========================================= */

function normalizePolicy(policy) {

    return {
        id: policy.id,

        policyName: policy.policy_name,
        provider: policy.provider,
        policyNumber: policy.policy_number,

        policyType: policy.policy_type,
        status: policy.status,

        premiumAmount: Number(
            policy.premium_amount
        ),

        premiumFrequency:
            policy.premium_frequency,

        coverageAmount: Number(
            policy.coverage_amount
        ),

        startDate: policy.start_date,
        maturityDate: policy.maturity_date,
        nextPaymentDate: policy.next_payment_date,

        nomineeName: policy.nominee_name,
        nomineeRelation:
            policy.nominee_relation,

        notes: policy.notes
    };
}


/* =========================================
   Policies
========================================= */

export async function getPolicies() {

    const response =
        await apiRequest("/policies");

    return response.data.map(
        normalizePolicy
    );

}


export async function getPolicy(id) {

    const response =
        await apiRequest(
            `/policies/${id}`
        );

    return normalizePolicy(
        response.data
    );

}


export async function createPolicy(policy) {

    const response =
        await apiRequest(
            "/policies",
            {
                method: "POST",

                body: JSON.stringify({
                    user_id: policy.userId || 1,

                    policy_name:
                        policy.policyName,

                    provider:
                        policy.provider,

                    policy_number:
                        policy.policyNumber,

                    policy_type:
                        policy.policyType,

                    status:
                        policy.status || "Active",

                    premium_amount:
                        Number(policy.premiumAmount),

                    premium_frequency:
                        policy.premiumFrequency ||
                        "Monthly",

                    coverage_amount:
                        Number(policy.coverageAmount),

                    start_date:
                        policy.startDate || null,

                    maturity_date:
                        policy.maturityDate || null,

                    next_payment_date:
                        policy.nextPaymentDate ||
                        null,

                    nominee_name:
                        policy.nomineeName ||
                        null,

                    nominee_relation:
                        policy.nomineeRelation ||
                        null,

                    notes:
                        policy.notes || null
                })
            }
        );

    return normalizePolicy(
        response.data
    );

}


export async function updatePolicy(
    id,
    policy
) {

    const response =
        await apiRequest(
            `/policies/${id}`,
            {
                method: "PUT",

                body: JSON.stringify({
                    policy_name:
                        policy.policyName,

                    provider:
                        policy.provider,

                    policy_number:
                        policy.policyNumber,

                    policy_type:
                        policy.policyType,

                    status:
                        policy.status,

                    premium_amount:
                        Number(policy.premiumAmount),

                    premium_frequency:
                        policy.premiumFrequency,

                    coverage_amount:
                        Number(policy.coverageAmount),

                    start_date:
                        policy.startDate || null,

                    maturity_date:
                        policy.maturityDate || null,

                    next_payment_date:
                        policy.nextPaymentDate ||
                        null,

                    nominee_name:
                        policy.nomineeName ||
                        null,

                    nominee_relation:
                        policy.nomineeRelation ||
                        null,

                    notes:
                        policy.notes || null
                })
            }
        );

    return normalizePolicy(
        response.data
    );

}


export async function deletePolicy(id) {

    return apiRequest(
        `/policies/${id}`,
        {
            method: "DELETE"
        }
    );

}
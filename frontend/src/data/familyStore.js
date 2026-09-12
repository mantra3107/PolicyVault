import { getPolicies } from "./policyStore";

export function getFamilyMembers() {
    const policies = getPolicies();

    const members = {};

    policies.forEach((policy) => {
        if (!policy.nomineeName) {
            return;
        }

        const name = policy.nomineeName.trim();

        if (!members[name]) {
            members[name] = {
                id: name.toLowerCase().replace(/\s+/g, "-"),
                name,
                relation: policy.nomineeRelation || "Family member",
                policies: [],
                totalCoverage: 0
            };
        }

        members[name].policies.push({
            id: policy.id,
            policyName: policy.policyName,
            policyNumber: policy.policyNumber,
            provider: policy.provider,
            coverageAmount: Number(
                policy.coverageAmount || 0
            )
        });

        members[name].totalCoverage += Number(
            policy.coverageAmount || 0
        );
    });

    return Object.values(members);
}
import { useEffect, useState } from "react";
import { getPolicies } from "../services/api";
import "./PremiumChart.css";

function PremiumChart() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPolicies() {
            try {
                const data = await getPolicies();
                setPolicies(data);
            } catch (error) {
                console.error(
                    "Unable to load premium data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadPolicies();
    }, []);

    const getMonthlyPremium = (policy) => {
        const amount = Number(policy.premiumAmount || 0);

        if (policy.premiumFrequency === "Quarterly") {
            return amount / 3;
        }

        if (policy.premiumFrequency === "Half-Yearly") {
            return amount / 6;
        }

        if (policy.premiumFrequency === "Yearly") {
            return amount / 12;
        }

        return amount;
    };

    const monthlyPremium = policies
        .filter((policy) => policy.status === "Active")
        .reduce(
            (total, policy) => total + getMonthlyPremium(policy),
            0
        );

    const today = new Date();

    const data = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() + index,
            1
        );

        return {
            month: date.toLocaleDateString("en-IN", {
                month: "short"
            }),
            amount: monthlyPremium
        };
    });

    const maxAmount = Math.max(
        12000,
        Math.ceil(monthlyPremium / 1000) * 1000
    );

    const chartWidth = 520;
    const chartHeight = 220;

    const paddingLeft = 45;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 35;

    const usableWidth =
        chartWidth - paddingLeft - paddingRight;

    const usableHeight =
        chartHeight - paddingTop - paddingBottom;

    const points = data.map((item, index) => {
        const x =
            paddingLeft +
            (index / (data.length - 1)) * usableWidth;

        const y =
            paddingTop +
            usableHeight -
            (item.amount / maxAmount) * usableHeight;

        return {
            ...item,
            x,
            y
        };
    });

    const linePoints = points
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    const averagePremium = monthlyPremium;

    if (loading) {
        return (
            <section className="pv-premium-chart surface">
                <div className="pv-chart-header">
                    <div>
                        <div className="section-label">
                            Coverage pulse
                        </div>

                        <h2>
                            Premium rhythm
                        </h2>
                    </div>

                    <span className="pv-chart-period">
                        6 months
                    </span>
                </div>

                <div className="pv-chart-wrapper">
                    <p>Loading premium data...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="pv-premium-chart surface">
            <div className="pv-chart-header">
                <div>
                    <div className="section-label">
                        Coverage pulse
                    </div>

                    <h2>
                        Premium rhythm
                    </h2>
                </div>

                <span className="pv-chart-period">
                    6 months
                </span>
            </div>

            <div className="pv-chart-wrapper">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="pv-chart"
                    role="img"
                    aria-label="Premium rhythm for the next six months"
                >
                    <line
                        x1={paddingLeft}
                        y1={paddingTop}
                        x2={paddingLeft}
                        y2={chartHeight - paddingBottom}
                        className="pv-chart-axis"
                    />

                    <line
                        x1={paddingLeft}
                        y1={chartHeight - paddingBottom}
                        x2={chartWidth - paddingRight}
                        y2={chartHeight - paddingBottom}
                        className="pv-chart-axis"
                    />

                    {[0, 4000, 8000, 12000].map((value) => {
                        const y =
                            paddingTop +
                            usableHeight -
                            (value / maxAmount) * usableHeight;

                        return (
                            <g key={value}>
                                <line
                                    x1={paddingLeft}
                                    y1={y}
                                    x2={chartWidth - paddingRight}
                                    y2={y}
                                    className="pv-chart-grid"
                                />

                                <text
                                    x={paddingLeft - 8}
                                    y={y + 4}
                                    textAnchor="end"
                                    className="pv-chart-label"
                                >
                                    {value === 0
                                        ? "₹0"
                                        : `₹${value / 1000}k`}
                                </text>
                            </g>
                        );
                    })}

                    <polyline
                        points={linePoints}
                        className="pv-chart-line"
                    />

                    {points.map((point) => (
                        <g key={point.month}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                className="pv-chart-point"
                            />

                            <text
                                x={point.x}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                className="pv-chart-label"
                            >
                                {point.month}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="pv-chart-footer">
                <span>
                    Estimated monthly premium
                </span>

                <strong>
                    ₹{Math.round(averagePremium).toLocaleString("en-IN")} average
                </strong>
            </div>
        </section>
    );
}

export default PremiumChart;
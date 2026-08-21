import "./PremiumChart.css";

function PremiumChart() {
    const data = [
        { month: "Aug", amount: 6500 },
        { month: "Sep", amount: 8500 },
        { month: "Oct", amount: 8500 },
        { month: "Nov", amount: 10500 },
        { month: "Dec", amount: 8500 },
        { month: "Jan", amount: 9500 }
    ];

    const maxAmount = 12000;

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
                    ₹8,500 average
                </strong>
            </div>
        </section>
    );
}

export default PremiumChart;
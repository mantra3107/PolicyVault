import "./StatCard.css";

function StatCard({ icon, title, value, description }) {
    return (
        <article className="pv-stat-card">
            <div className="pv-stat-icon">
                <i className={`bi ${icon}`}></i>
            </div>

            <div className="pv-stat-content">
                <div className="pv-stat-title">
                    {title}
                </div>

                <div className="pv-stat-value">
                    {value}
                </div>

                <div className="pv-stat-description">
                    {description}
                </div>
            </div>
        </article>
    );
}

export default StatCard;
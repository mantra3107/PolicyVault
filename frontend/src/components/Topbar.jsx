import "./Topbar.css";

function Topbar() {
    return (
        <header className="pv-topbar">
            <div className="pv-topbar-search">
                <i className="bi bi-search"></i>

                <input
                    type="text"
                    placeholder="Search your policies"
                    aria-label="Search your policies"
                />
            </div>

            <div className="pv-topbar-actions">
                <button
                    type="button"
                    className="pv-icon-button"
                    aria-label="Notifications"
                >
                    <i className="bi bi-bell"></i>
                    <span className="pv-notification-dot"></span>
                </button>

                <button
                    type="button"
                    className="pv-user-button"
                    aria-label="Open user profile"
                >
                    <span className="pv-user-avatar">
                        D
                    </span>

                    <span className="pv-user-name">
                        Demo User
                    </span>
                </button>
            </div>
        </header>
    );
}

export default Topbar;
import { NavLink } from "react-router";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="pv-sidebar">
            <div className="pv-sidebar-brand">
                <div className="pv-brand-icon">
                    <i className="bi bi-shield-check"></i>
                </div>

                <span>PolicyVault</span>
            </div>

            <div className="pv-sidebar-section">
                <div className="pv-sidebar-label">
                    Your Vault
                </div>

                <nav className="pv-sidebar-nav">
                    <NavLink to="/dashboard" className="pv-sidebar-link">
                        <i className="bi bi-grid"></i>
                        <span>Overview</span>
                    </NavLink>

                    <NavLink to="/policies" className="pv-sidebar-link">
                        <i className="bi bi-journal-bookmark"></i>
                        <span>My Policies</span>
                    </NavLink>

                    <NavLink to="/payments" className="pv-sidebar-link">
                        <i className="bi bi-currency-rupee"></i>
                        <span>Payments</span>
                    </NavLink>

                    <NavLink to="/calendar" className="pv-sidebar-link">
                        <i className="bi bi-calendar3"></i>
                        <span>Calendar</span>
                    </NavLink>

                    <NavLink to="/analytics" className="pv-sidebar-link">
                        <i className="bi bi-graph-up-arrow"></i>
                        <span>Analytics</span>
                    </NavLink>

                    <NavLink to="/family" className="pv-sidebar-link">
                        <i className="bi bi-people"></i>
                        <span>Family</span>
                    </NavLink>
                </nav>
            </div>

            <div className="pv-sidebar-account">
                <div className="pv-sidebar-label">
                    Account
                </div>

                <nav className="pv-sidebar-nav">
                    <NavLink to="/settings" className="pv-sidebar-link">
                        <i className="bi bi-gear"></i>
                        <span>Settings</span>
                    </NavLink>

                    <button className="pv-sidebar-link pv-sidebar-button">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
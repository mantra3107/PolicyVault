import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./AppLayout.css";

function AppLayout({ children }) {
    return (
        <div className="pv-app-layout">
            <Sidebar />

            <main className="pv-main">
                <Topbar />

                <div className="pv-page-content">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AppLayout;
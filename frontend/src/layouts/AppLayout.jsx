import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./AppLayout.css";

function AppLayout() {
    return (
        <div className="pv-app">
            <Sidebar />

            <main className="pv-main">
                <Topbar />

                <div className="pv-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AppLayout;
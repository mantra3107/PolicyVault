import Sidebar from "../components/Sidebar";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="pv-app-layout">
      <Sidebar />

      <main className="pv-main-content">
        <div className="pv-page-content">
          <div className="section-label mb-3">
            Your vault
          </div>

          <h1 className="page-heading">
            Welcome to PolicyVault
          </h1>

          <p className="mt-3">
            Your insurance information, organized in one place.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
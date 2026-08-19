import { Routes, Route, Navigate } from "react-router";

import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";
import Payments from "./pages/Payments";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Family from "./pages/Family";
import Settings from "./pages/Settings";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/policies"
                element={<Policies />}
            />

            <Route
                path="/payments"
                element={<Payments />}
            />

            <Route
                path="/calendar"
                element={<Calendar />}
            />

            <Route
                path="/analytics"
                element={<Analytics />}
            />

            <Route
                path="/family"
                element={<Family />}
            />

            <Route
                path="/settings"
                element={<Settings />}
            />
        </Routes>
    );
}

export default AppRoutes;
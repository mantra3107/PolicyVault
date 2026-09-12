import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Policies from "./pages/Policies";
import AddPolicy from "./pages/AddPolicy";
import PolicyDetails from "./pages/PolicyDetails";

import Payments from "./pages/Payments";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Family from "./pages/Family";
import Settings from "./pages/Settings";

function AppRoutes() {
    return (
        <Routes>

            <Route element={<AppLayout />}>

                {/* Default route */}
                <Route
                    index
                    element={<Navigate to="/dashboard" replace />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* Policies */}
                <Route
                    path="/policies"
                    element={<Policies />}
                />

                {/* Add Policy */}
                <Route
                    path="/policies/add"
                    element={<AddPolicy />}
                />

                {/* Policy Details */}
                <Route
                    path="/policies/:id"
                    element={<PolicyDetails />}
                />

                {/* Other pages */}
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

            </Route>

        </Routes>
    );
}

export default AppRoutes;
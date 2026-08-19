import { BrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AppRoutes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;

import MainLayout from "./components/layouts/MainLayout/MainLayout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<MainLayout />} />
            </Routes>
        </div>
    );
}

export default App;

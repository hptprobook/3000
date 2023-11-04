
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import { useState } from "react";
import { useEffect } from "react";
import SnipFullScreenDark from "./components/common/Snip/SnipFullScreenDark";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call or data fetching
        setTimeout(() => {
            setIsLoading(false); // Content is ready to be displayed
        }, 1000);
    }, []);
    return (
        <div className="app">
            {isLoading ? <SnipFullScreenDark /> :
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<MainLayout />} />
                </Routes>}
        </div>
    );
}

export default App;

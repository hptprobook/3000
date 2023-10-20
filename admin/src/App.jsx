import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardRoute from "./routes/dashboard.route";
import Navbar from "./components/layouts/Sidebar/Sidebar";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Navbar />

            <DashboardRoute />
        </div>
    );
}

export default App;

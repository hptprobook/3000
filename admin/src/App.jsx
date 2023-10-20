import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardRoute from "./routes/dashboard.route";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Navbar />
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <DashboardRoute />
        </div>
    );
}

export default App;

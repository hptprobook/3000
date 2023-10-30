import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout/MainLayout";
import "./App.css";

function App() {
    return (
        <div className="app">
            <MainLayout />
        </div>
    );
}

export default App;

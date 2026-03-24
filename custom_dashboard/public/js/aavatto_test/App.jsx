import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

const App = () => {
    const [currentRoute, setCurrentRoute] = useState("");

    useEffect(() => {
        const handleRoute = () => {
            if (typeof frappe !== "undefined" && frappe.get_route) {
                const route = frappe.get_route(); // ["aavatto-test", "customers", ...]
                
                if (route[0] === "aavatto-test") {
                    // Everything after "aavatto-test"
                    const subRoute = route.slice(1).join("/");
                    setCurrentRoute(subRoute || "dashboard");
                }
            }
        };

        window.addEventListener("hashchange", handleRoute);
        handleRoute(); // Initial sync

        return () => {
            window.removeEventListener("hashchange", handleRoute);
        };
    }, []);

    const renderPage = () => {
        switch (currentRoute) {
            case "dashboard":
            case "":
                return <Dashboard />;
            case "customers":
                return <Customers />;
            case "orders":
                return <Orders />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div style={{ border: "4px solid red", minHeight: "100%", width: "100%", background: "#fff" }}>
            <Navbar />
            <div style={{ padding: "20px" }}>
                {renderPage()}
            </div>
        </div>
    );
};

export default App;
export { App };

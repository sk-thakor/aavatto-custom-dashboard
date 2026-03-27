import React, { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import "./styles.css";

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

        window.update_aavatto_react_route = handleRoute;
        window.addEventListener("hashchange", handleRoute);
        handleRoute(); // Initial sync

        return () => {
            window.removeEventListener("hashchange", handleRoute);
            delete window.update_aavatto_react_route;
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
        <div className="aavatto-content-wrapper">
            {renderPage()}
        </div>
    );
};

export default App;
export { App };

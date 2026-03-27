import React, { useState, useEffect } from "react";
import { Layout, Menu, ConfigProvider, theme } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    DatabaseOutlined,
    BarChartOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import "./styles.css";

const { Header, Sider, Content } = Layout;

const App = () => {
    const [currentRoute, setCurrentRoute] = useState("dashboard");

    useEffect(() => {
        const handleRoute = () => {
            if (typeof frappe !== "undefined" && frappe.get_route) {
                const route = frappe.get_route(); // ["aavatto-test", "customers", ...]
                
                if (route[0] === "aavatto-test") {
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

    const menuItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
        {
            key: "customers",
            icon: <UserOutlined />,
            label: "Customers",
        },
        {
            key: "orders",
            icon: <ShoppingCartOutlined />,
            label: "Orders",
        },
        {
            key: "inventory",
            icon: <DatabaseOutlined />,
            label: "Inventory",
        },
        {
            key: "analytics",
            icon: <BarChartOutlined />,
            label: "Analytics",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
    ];

    const handleMenuClick = ({ key }) => {
        if (typeof frappe !== "undefined") {
            frappe.set_route("aavatto-test", key === "dashboard" ? "" : key);
        }
    };

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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4f46e5",
                    borderRadius: 12,
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                },
                components: {
                    Layout: {
                        siderBg: "#ffffff",
                        headerBg: "#ffffff",
                    },
                    Menu: {
                        itemSelectedBg: "#f3f4f6",
                        itemSelectedColor: "#4f46e5",
                    },
                },
            }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    theme="light"
                    breakpoint="lg"
                    collapsedWidth="80"
                    width={260}
                    className="aavatto-antd-sider"
                    style={{
                        borderRight: "1px solid #e5e7eb",
                        position: "fixed",
                        height: "100vh",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 100,
                    }}
                >
                    <div className="aavatto-sidebar-header" style={{ padding: '24px 20px' }}>
                        <div className="aavatto-sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', fontWeight: '800', color: '#4f46e5' }}>
                            <DashboardOutlined style={{ fontSize: '24px' }} />
                            <span style={{ letterSpacing: '-0.5px' }}>Aavatto Dashboard</span>
                        </div>
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[currentRoute]}
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{ borderRight: 0, padding: '0 12px' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '20px', borderTop: '1px solid #e5e7eb' }}>
                        <small style={{ color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '11px' }}>v1.0.0</small>
                    </div>
                </Sider>
                <Layout style={{ marginLeft: 260 }}>
                    <Content style={{ padding: '24px', background: '#f9fafb', minHeight: '100%' }}>
                        <div className="aavatto-content-wrapper">
                            {renderPage()}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
export { App };


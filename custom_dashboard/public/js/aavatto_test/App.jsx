import React, { useState, useEffect } from "react";
import { Layout, Menu, ConfigProvider, Drawer, Button, Grid } from "antd";
import { DashboardOutlined, MenuOutlined } from "@ant-design/icons";

// Centralized Configs
import { themeConfig } from "./config/theme";
import { menuItems, getComponentForRoute } from "./config/navigation";

import "./styles.css";

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
    const [currentRoute, setCurrentRoute] = useState("dashboard");
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();
    
    const isMobile = !screens.lg; // Use lg as breakpoint for mobile layout

    useEffect(() => {
        const handleRoute = () => {
            if (typeof frappe !== "undefined" && frappe.get_route) {
                const route = frappe.get_route();
                
                if (route[0] === "aavatto-test") {
                    const subRoute = route.slice(1).join("/");
                    setCurrentRoute(subRoute || "dashboard");
                }
            }
        };

        window.update_aavatto_react_route = handleRoute;
        window.addEventListener("hashchange", handleRoute);
        handleRoute();

        return () => {
            window.removeEventListener("hashchange", handleRoute);
            delete window.update_aavatto_react_route;
        };
    }, []);

    const handleMenuClick = ({ key }) => {
        if (typeof frappe !== "undefined") {
            frappe.set_route("aavatto-test", key === "dashboard" ? "" : key);
        }
        if (isMobile) {
            setDrawerVisible(false); // Close drawer on mobile after clicking
        }
    };

    const SidebarContent = (
        <>
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
        </>
    );

    return (
        <ConfigProvider theme={themeConfig}>
            <Layout style={{ minHeight: "100vh" }}>
                {/* Desktop Sidebar */}
                {!isMobile && (
                    <Sider
                        theme="light"
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
                        {SidebarContent}
                    </Sider>
                )}

                {/* Mobile Drawer */}
                <Drawer
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    width={260}
                    styles={{ body: { padding: 0 } }}
                    closable={false}
                >
                    {SidebarContent}
                </Drawer>

                <Layout style={{ marginLeft: isMobile ? 0 : 260, transition: 'all 0.2s' }}>
                    {/* Header with Hamburger (Mobile Only) */}
                    {isMobile && (
                        <Header style={{ 
                            background: '#fff', 
                            padding: '0 20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #e5e7eb',
                            height: '64px',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Button
                                    type="text"
                                    icon={<MenuOutlined />}
                                    onClick={() => setDrawerVisible(true)}
                                    style={{ fontSize: '18px' }}
                                />
                                <span style={{ fontWeight: 700, color: '#4f46e5' }}>Aavatto</span>
                            </div>
                        </Header>
                    )}

                    <Content style={{ padding: isMobile ? '16px' : '24px', background: '#f9fafb', minHeight: '100%' }}>
                        <div className="aavatto-content-wrapper">
                            {getComponentForRoute(currentRoute)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
export { App };


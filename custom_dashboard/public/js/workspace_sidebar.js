(function() {
    console.log("Global Sidebar Script: Loading...");

    const sidebarWidth = 220;

    const init = () => {
        if (typeof frappe === 'undefined') {
            setTimeout(init, 100);
            return;
        }

        frappe.ready(() => {
            console.log("Global Sidebar Script: Frappe Ready, initializing...");
            renderSidebar();
            
            // Re-render on route change
            frappe.router.on("change", () => {
                highlightActiveLink();
                // Ensure layout is correct on route change
                setTimeout(adjustLayout, 300);
            });
        });
    };

    function renderSidebar() {
        if (document.querySelector("#global-sidebar")) return;

        console.log("Global Sidebar Script: Creating DOM element...");
        const sidebar = document.createElement("div");
        sidebar.id = "global-sidebar";
        Object.assign(sidebar.style, {
            position: "fixed",
            left: "0",
            top: "0",
            height: "100vh",
            width: sidebarWidth + "px",
            background: "#ffffff",
            borderRight: "1px solid #d1d8dd",
            zIndex: "9999", // High z-index to stay on top
            display: "flex",
            flexDirection: "column",
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)"
        });

        sidebar.innerHTML = `
            <div style="padding: 20px; border-bottom: 1px solid #d1d8dd; background: #fff;">
                <h4 style="margin:0; font-weight: 700; color: #171717;">Mio Amore</h4>
            </div>
            <div id="sidebar-links-container" style="flex: 1; padding: 15px 10px; overflow-y: auto;">
                <div id="links-inner"></div>
            </div>
        `;

        document.body.appendChild(sidebar);
        console.log("Global Sidebar Script: Sidebar appended to body.");

        const container = sidebar.querySelector("#links-inner");
        
        // Define links
        const links = [
            { label: "Aavatto Test", url: "/app/aavatto-test" },
            { label: "Customers", url: "/app/aavatto-test/customers" },
            { label: "Orders", url: "/app/aavatto-test/orders" },
            { label: "Shop Dashboard", url: "/app/ordering-dashboard" }
        ];

        links.forEach(item => {
            const a = document.createElement("a");
            a.href = item.url;
            a.innerHTML = item.label;
            a.className = "global-sidebar-link";
            Object.assign(a.style, {
                display: "block",
                padding: "10px 15px",
                color: "#555",
                textDecoration: "none",
                fontSize: "14px",
                borderRadius: "5px",
                marginBottom: "5px",
                transition: "all 0.2s"
            });
            
            a.addEventListener("mouseover", () => { a.style.background = "#f0f4ff"; a.style.color = "#1677ff"; });
            a.addEventListener("mouseout", () => { if(!a.classList.contains('active')) { a.style.background = "transparent"; a.style.color = "#555"; }});
            
            a.addEventListener("click", (e) => {
                e.preventDefault();
                frappe.set_route(item.url.replace('/app/', ''));
            });

            container.appendChild(a);
        });

        adjustLayout();
        highlightActiveLink();
    }

    function adjustLayout() {
        const sidebar = document.querySelector("#global-sidebar");
        if (!sidebar) return;

        const sidebarVisible = window.innerWidth > 991;
        const offset = sidebarVisible ? sidebarWidth : 0;
        
        sidebar.style.display = sidebarVisible ? "flex" : "none";

        const elementsToPush = [
            document.querySelector(".layout-main"),
            document.querySelector(".page-container"),
            document.querySelector(".navbar"),
            document.querySelector("#app")
        ];

        elementsToPush.forEach(el => {
            if (el) {
                el.style.marginLeft = offset + "px";
                if (el.classList.contains('navbar')) {
                    el.style.width = `calc(100% - ${offset}px)`;
                }
            }
        });
    }

    function highlightActiveLink() {
        const currentPath = window.location.pathname + window.location.hash;
        console.log("Global Sidebar Script: Highlighting path", currentPath);

        document.querySelectorAll(".global-sidebar-link").forEach(a => {
            const href = a.getAttribute("href");
            if (currentPath === href || (href !== "/app/aavatto-test" && currentPath.includes(href))) {
                a.classList.add("active");
                Object.assign(a.style, {
                    background: "#f0f4ff",
                    color: "#1677ff",
                    fontWeight: "600",
                    borderLeft: "4px solid #1677ff"
                });
            } else {
                a.classList.remove("active");
                Object.assign(a.style, {
                    background: "transparent",
                    color: "#555",
                    fontWeight: "400",
                    borderLeft: "none"
                });
            }
        });
    }

    window.addEventListener("resize", adjustLayout);
    init();

})();

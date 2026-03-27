(function() {
    console.log("Aavatto Global Sidebar: Initializing...");

    const sidebarWidth = 240;

    const render = () => {
        if (document.querySelector("#aavatto-global-sidebar")) return;

        console.log("Aavatto Global Sidebar: Spawning Sidebar...");
        const sidebar = document.createElement("div");
        sidebar.id = "aavatto-global-sidebar";
        Object.assign(sidebar.style, {
            position: "fixed",
            left: "0",
            top: "0",
            height: "100vh",
            width: sidebarWidth + "px",
            background: "#ffffff",
            borderRight: "1px solid #d1d8dd",
            zIndex: "10000", 
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 10px rgba(0,0,0,0.1)"
        });

        sidebar.innerHTML = `
            <div style="padding: 24px 20px; border-bottom: 1px solid #eee; background: #fff;">
                <h3 style="margin:0; font-size: 18px; font-weight: 800; color: #111;">Aavatto App</h3>
                <small style="color: #888;">Workspace Navigation</small>
            </div>
            <div style="flex: 1; padding: 20px 10px; overflow-y: auto;" id="asb-links">
                <!-- Links -->
            </div>
        `;

        document.body.appendChild(sidebar);

        const container = sidebar.querySelector("#asb-links");
        const links = [
            { label: "Dashboard", url: "/app/aavatto-test" },
            { label: "Customers", url: "/app/aavatto-test/customers" },
            { label: "Orders", url: "/app/aavatto-test/orders" }
        ];

        links.forEach(item => {
            const a = document.createElement("a");
            a.href = item.url;
            a.className = "asb-link";
            a.style.cssText = "display:block; padding:12px 15px; color:#444; text-decoration:none; font-size:14px; border-radius:8px; margin-bottom:5px; transition:0.2s;";
            a.innerHTML = item.label;
            
            a.onclick = (e) => {
                e.preventDefault();
                frappe.set_route(item.url.replace('/app/', ''));
            };

            a.onmouseover = () => { a.style.background = "#f0f7ff"; a.style.color = "#007bff"; };
            a.onmouseout = () => { if(!a.classList.contains('active')) { a.style.background = "transparent"; a.style.color = "#444"; } };

            container.appendChild(a);
        });

        // Add CSS for active state
        const style = document.createElement("style");
        style.innerHTML = `
            .asb-link.active { background: #eef6ff !important; color: #007bff !important; font-weight: 600; border-left: 4px solid #007bff; }
            @media (max-width: 991px) { #aavatto-global-sidebar { display: none !important; } }
        `;
        document.head.appendChild(style);

        applyLayout();
    };

    const applyLayout = () => {
        const path = window.location.pathname + window.location.hash;
        console.log("Aavatto Global Sidebar: Active Path Check ->", path);

        // Highlight
        document.querySelectorAll(".asb-link").forEach(a => {
            const href = a.getAttribute("href");
            if (path === href || (href !== "/app/aavatto-test" && path.includes(href))) {
                a.classList.add("active");
            } else {
                a.classList.remove("active");
            }
        });

        // Push Page Content
        if (window.innerWidth > 991) {
            const elements = [".layout-main", ".page-container", ".navbar", "#app"];
            elements.forEach(sel => {
                const el = document.querySelector(sel);
                if (el) {
                    el.style.marginLeft = sidebarWidth + "px";
                    if (sel === ".navbar") el.style.width = `calc(100% - ${sidebarWidth}px)`;
                }
            });
        }
    };

    // Force run
    setInterval(render, 1000); // Check every second if sidebar is present
    window.addEventListener("resize", applyLayout);

})();

/**
 * @namespace Aavatto
 * Standardized Premium UI components for Aavatto App
 */
window.Aavatto = window.Aavatto || {};

/**
 * Renders a premium sidebar for a Frappe Page
 * @param {Object} wrapper - The page wrapper (this.wrapper)
 * @param {Array} items - List of menu items [{ label, route, icon }]
 * @param {String} brandName - Optional brand name
 */
Aavatto.renderSidebar = function(wrapper, items, brandName = "Aavatto App") {
  const $sidebar = $(wrapper).find(".layout-side-section");
  $sidebar.empty();

  const menu_html = `
    <div class="aavatto-sidebar">
      <div class="aavatto-sidebar-header">
        <div class="aavatto-sidebar-brand">
          <i class="fa fa-snowflake-o"></i> 
          <span>${brandName}</span>
        </div>
      </div>
      <ul class="aavatto-menu-list">
        ${items.map(item => `
          <li class="aavatto-menu-item">
            <a href="/app/aavatto-test/${item.route === 'dashboard' ? '' : item.route}" 
               class="aavatto-menu-link" 
               data-route="${item.route}">
               <div class="menu-icon"><i class="${item.icon}"></i></div>
               <span>${item.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
      <div class="aavatto-sidebar-footer" style="padding: 20px; border-top: 1px solid var(--border-color); margin-top: auto;">
        <small style="color: var(--text-muted);">v1.0.0</small>
      </div>
    </div>
  `;
  
  $sidebar.append(menu_html);

  // Handle routing
  $sidebar.on("click", ".aavatto-menu-link", function(e) {
    e.preventDefault();
    const route = $(this).data("route");
    const pageName = frappe.get_route()[0];
    frappe.set_route(pageName, route === "dashboard" ? "" : route);
  });

  // Sync active state immediately
  Aavatto.updateSidebarActive(wrapper);
};

/**
 * Syncs the active state based on current URL
 */
Aavatto.updateSidebarActive = function(wrapper) {
  const route = frappe.get_route();
  const subRoute = (route.length > 1) ? route[1] : "dashboard";
  
  $(wrapper).find(".aavatto-menu-link").removeClass("active");
  $(wrapper).find(`.aavatto-menu-link[data-route="${subRoute || 'dashboard'}"]`).addClass("active");
};

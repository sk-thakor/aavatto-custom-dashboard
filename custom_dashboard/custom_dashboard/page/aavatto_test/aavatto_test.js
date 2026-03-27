frappe.pages["aavatto-test"].on_page_load = function (wrapper) {
  const page = frappe.ui.make_app_page({
    parent: wrapper,
    title: __("Aavatto Test"),
    single_column: false,
  });

  // --- CONFIGURATION ---
  const brand = "Aavatto Dashboard";
  const menu_items = [
    { label: "Dashboard", route: "dashboard", icon: "fa fa-th-large" },
    { label: "Customers", route: "customers", icon: "fa fa-users" },
    { label: "Orders",    route: "orders",    icon: "fa fa-shopping-cart" },
    { label: "Inventory", route: "inventory", icon: "fa fa-archive" },
    { label: "Analytics", route: "analytics", icon: "fa fa-bar-chart" },
    { label: "Settings",  route: "settings",  icon: "fa fa-sliders" },
  ];

  // Force load local requirements to ensure sidebar shows immediately
  const common_js = "/assets/custom_dashboard/js/aavatto_common.js";
  const premium_css = "/assets/custom_dashboard/js/aavatto_test/styles.css";

  frappe.require([common_js, premium_css], () => {
    if (window.Aavatto && Aavatto.renderSidebar) {
      Aavatto.renderSidebar(wrapper, menu_items, brand);
    } else {
      console.error("Aavatto namespace not found even after require.");
      $(wrapper).find(".layout-side-section").html("<div style='padding:20px; color:red;'>Error loading assets.</div>");
    }
  });
};

frappe.pages["aavatto-test"].on_page_show = function (wrapper) {
  let $parent = $(wrapper).find(".layout-main-section");
  
  // Sync sidebar active state
  if (window.Aavatto && Aavatto.updateSidebarActive) {
    Aavatto.updateSidebarActive(wrapper);
  }

  if ($parent.find("#react-root").length === 0) {
    $parent.empty().append(`<div id="react-root"></div>`);

    frappe.call({
      method: "custom_dashboard.custom_dashboard.api.get_latest_bundle",
      callback: function (r) {
        if (r.message) {
          frappe.require(r.message).then(() => {
            if (frappe.ui.AavattoTest) {
              frappe.aavatto_test = new frappe.ui.AavattoTest({
                wrapper: $parent.find("#react-root"),
                page: wrapper.page,
              });
            }
          });
        }
      },
    });
  } else {
    if (window.update_aavatto_react_route) {
      window.update_aavatto_react_route();
    }
  }
};
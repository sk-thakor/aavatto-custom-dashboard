frappe.pages["temple-donation"].on_page_load = function (wrapper) {
  const page = frappe.ui.make_app_page({
    parent: wrapper,
    title: __("Temple Donation"),
    single_column: true, // Changed to true to let React handle full-width layout including sidebar
  });

  // Load CSS for basic styling, sidebar is now handled in App.jsx
  const premium_css = "/assets/custom_dashboard/js/aavatto_test/styles.css";
  frappe.require(premium_css);
};

frappe.pages["temple-donation"].on_page_show = function (wrapper) {
  let $parent = $(wrapper).find(".layout-main-section");
  
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
frappe.pages["aavatto-test"].on_page_load = function (wrapper) {
  frappe.ui.make_app_page({
    parent: wrapper,
    title: __("Aavatto Test"),
    single_column: true,
  });
  
  $(wrapper).find(".page-head").hide();
};

frappe.pages["aavatto-test"].on_page_show = function (wrapper) {
  $(wrapper).find(".page-head").hide();
  let $parent = $(wrapper).find(".layout-main-section");
  
  if ($parent.find('#react-root').length === 0) {
      $parent.empty().append(`<div id="react-root" style="height: 100%; width: 100%; padding: 0;"></div>`);
      
      frappe.call({
          method: "custom_dashboard.custom_dashboard.api.get_latest_bundle",
          callback: function(r) {
              if (r.message) {
                  frappe.require(r.message).then(() => {
                      if (frappe.ui.AavattoTest) {
                          frappe.aavatto_test = new frappe.ui.AavattoTest({
                            wrapper: $parent.find('#react-root'),
                            page: wrapper.page,
                          });
                      }
                  });
              }
          }
      });
  } else {
      if (window.update_aavatto_react_route) {
          window.update_aavatto_react_route();
      }
  }
};
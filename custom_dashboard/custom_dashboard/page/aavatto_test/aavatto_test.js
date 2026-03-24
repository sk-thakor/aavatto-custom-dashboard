frappe.pages["aavatto-test"].on_page_load = function (wrapper) {
  frappe.ui.make_app_page({
    parent: wrapper,
    title: __("Aavatto Test"),
    single_column: true,
  });
};

frappe.pages["aavatto-test"].on_page_show = function (wrapper) {
  let $parent = $(wrapper).find(".layout-main-section");
  
  if ($parent.find('#react-root').length === 0) {
      $parent.empty().append(`<div id="react-root" style="height: 500px; width: 100%; background: lightblue; padding: 20px;">
        <h3>Page show triggered!</h3>
        <p>Fetching latest bundle setup...</p>
      </div>`);
      
      frappe.call({
          method: "custom_dashboard.custom_dashboard.api.get_latest_bundle",
          callback: function(r) {
              if (r.message) {
                  $parent.find('#react-root').html("<h3>Bundle URL: " + r.message + "</h3><p>Loading Script...</p>");

                  frappe.require(r.message).then(() => {
                      if (frappe.ui.AavattoTest) {
                          frappe.aavatto_test = new frappe.ui.AavattoTest({
                            wrapper: $parent.find('#react-root'),
                            page: wrapper.page,
                          });
                      } else {
                          $parent.find('#react-root').html("<h3>Error: frappe.ui.AavattoTest not found up on load.</h3>").css("background", "red");
                      }
                  }).catch(err => {
                      $parent.find('#react-root').html("<h3>Failed to load bundle</h3><p>" + r.message + "</p>").css("background", "red");
                  });
              } else {
                  $parent.find('#react-root').html("<h3>Error: No bundle file found in dist</h3>").css("background", "red");
              }
          }
      });
  }
};
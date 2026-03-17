// frappe.pages["aavatto-test"].on_page_load = function (wrapper) {
//   frappe.ui.make_app_page({
//     parent: wrapper,
//     title: __("Aavatto Test"),
//     single_column: true,
//   });
// };

// frappe.pages["aavatto-test"].on_page_show = function (wrapper) {
//   let $parent = $(wrapper).find(".layout-main-section");
//   $parent.empty();

//   frappe.require("aavatto_test.bundle.jsx").then(() => {
//     frappe.aavatto_test = new frappe.ui.AavattoTest({
//       wrapper: $parent,
//       page: wrapper.page,
//     });
//   });
// };

frappe.pages["aavatto-test"].on_page_load = function (wrapper) {
  $(wrapper).html(`<div id="react-root"></div>`);
};
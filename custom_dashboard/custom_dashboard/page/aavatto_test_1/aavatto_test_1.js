frappe.pages["aavatto-test-1"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("aavatto-test"),
		single_column: true,
	});
};

frappe.pages["aavatto-test-1"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("aavatto_test_1.bundle.jsx").then(() => {
		frappe.aavatto_test_1 = new frappe.ui.AavattoTest1({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}
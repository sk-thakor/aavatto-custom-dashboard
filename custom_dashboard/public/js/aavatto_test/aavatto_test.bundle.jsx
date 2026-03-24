import React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

if (typeof $ !== "undefined" && $("#react-root").length) {
    $("#react-root").append("<p style='color: green;'>Bundle JS self-execution started!</p>");
}
console.log("AavattoTest Bundle script executing...");

class AavattoTest {
	constructor({ page, wrapper }) {
		this.$wrapper = $(wrapper);
		this.page = page;

		this.init();
	}

	init() {
		this.setup_page_actions();
		this.setup_app();
	}

	setup_page_actions() {

		this.primary_btn = this.page.set_primary_action(__("Print Message"), () =>
			frappe.msgprint("Hello My Page!")
		);
	}

	setup_app() {
		const root = createRoot(this.$wrapper.get(0));
		root.render(
			<App />
		);
		this.$aavatto_test = root;
	}
}

frappe.provide("frappe.ui");
frappe.ui.AavattoTest = AavattoTest;
export default AavattoTest;
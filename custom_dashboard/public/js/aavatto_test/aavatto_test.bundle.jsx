import React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

class AavattoTest {
	constructor({ page, wrapper }) {
		this.$wrapper = $(wrapper);
		this.page = page;

		this.init();
	}

	init() {
		this.setup_app();
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
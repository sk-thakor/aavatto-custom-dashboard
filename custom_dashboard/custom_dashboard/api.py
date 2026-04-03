import os
import frappe

@frappe.whitelist()
def get_latest_bundle():
    # Resolve path to public/dist
    path = frappe.get_app_path("custom_dashboard", "public", "dist")
    
    if not os.path.exists(path):
        return None
        
    files = os.listdir(path)
    bundles = []
    
    for f in files:
        if f.startswith("temple_dontation.bundle") and f.endswith(".js") and not f.endswith(".map"):
            full_path = os.path.join(path, f)
            bundles.append((f, os.path.getmtime(full_path)))
            
    if bundles:
        # Sort by modification time to get the latest
        bundles.sort(key=lambda x: x[1], reverse=True)
        return f"/assets/custom_dashboard/dist/{bundles[0][0]}"
        
    return None

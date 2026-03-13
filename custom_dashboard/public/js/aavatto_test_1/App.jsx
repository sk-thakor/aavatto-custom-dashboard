// whimport * as React from "react";

// export function App() {
//   const dynamicMessage = React.useState("Hello from App.jsx");
//   return (
//     <div className="m-4">
//       <h3>{dynamicMessage}</h3>
//       <h1>SK</h1>
//       <h4>Start editing at custom_dashboard/public/js/aavatto_test_1/App.jsx</h4>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export const App = () => {
  const DOCTYPE = "Customer";

  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingName, setEditingName] = useState(null);

  const loadData = () => {
    frappe.call({
      method: "frappe.client.get_list",
      args: {
        doctype: DOCTYPE,
        fields: ["name", "customer_name", "phone"],
        order_by: "creation desc",
      },
      callback: (r) => {
        if (r.message) setItems(r.message);
      },
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    frappe.call({
      method: "frappe.client.insert",
      args: {
        doc: {
          doctype: DOCTYPE,
          customer_name: customerName,
          phone: phone,
        },
      },
      callback: () => {
        setCustomerName("");
        setPhone("");
        loadData();
      },
    });
  };

  const handleUpdate = () => {
    frappe.call({
      method: "frappe.client.set_value",
      args: {
        doctype: DOCTYPE,
        name: editingName,
        fieldname: {
          customer_name: customerName,
          phone: phone,
        },
      },
      callback: () => {
        setEditingName(null);
        setCustomerName("");
        setPhone("");
        loadData();
      },
    });
  };

  const handleDelete = (name) => {
    frappe.call({
      method: "frappe.client.delete",
      args: {
        doctype: DOCTYPE,
        name: name,
      },
      callback: loadData,
    });
  };

  const handleEdit = (item) => {
    setEditingName(item.name);
    setCustomerName(item.customer_name);
    setPhone(item.phone);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Customer CRUD (Desk Page)</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        {editingName ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleCreate}>Create</button>
        )}
      </div>

      {items.map((item) => (
        <div key={item.name} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <strong>{item.customer_name}</strong>
          <p>{item.phone}</p>

          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.name)} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrders } from "../../../_services/orders";
import { getMenus } from "../../../_services/menus";

export default function OrderCreate() {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [orderItems, setOrderItems] = useState([{ menu_id: "", quantity: 1 }]);
  const [form, setForm] = useState({
    customer_name: "",
    table_number: "",
    order_type: "dine_in",
    note: "",
  });

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data);
    };
    fetchMenus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    setOrderItems(updatedItems);
  };

  const addItemRow = () => {
    setOrderItems([...orderItems, { menu_id: "", quantity: 1 }]);
  };

  const removeItemRow = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customer_name: form.customer_name,
      table_number: form.table_number,
      order_type: form.order_type,
      note: form.note,
      items: orderItems.map((item) => ({
        menu_id: Number(item.menu_id),
        quantity: Number(item.quantity),
      })),
    };

    try {
      await createOrders(payload);
      alert("Order created successfully!");
      navigate("/admin/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to create order!");
    }
  };

  return (
    <section className="p-5 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white">Create New Order</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CUSTOMER */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Customer Name</label>
            <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" required />
          </div>

          {/* TABLE */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Table Number</label>
            <input type="number" name="table_number" value={form.table_number} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          {/* ORDER TYPE */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Order Type</label>
            <select name="order_type" value={form.order_type} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700">
              <option value="dine_in">Dine In</option>
              <option value="take_away">Take Away</option>
            </select>
          </div>

          {/* NOTE */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Note</label>
            <textarea name="note" value={form.note} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          {/* ORDER ITEMS */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Order Items</h2>

            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <select value={item.menu_id} onChange={(e) => handleItemChange(index, "menu_id", e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700" required>
                  <option value="">Select Menu</option>
                  {menus.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input type="number" value={item.quantity} min="1" onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="w-20 p-2 border rounded dark:bg-gray-700" />

                {index > 0 && (
                  <button type="button" onClick={() => removeItemRow(index)} className="px-3 py-1 text-red-600 border border-red-500 rounded">
                    X
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addItemRow} className="px-4 py-2 mt-2 text-white bg-indigo-600 rounded">
              + Add Item
            </button>
          </div>

          <button type="submit" className="px-5 py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800">
            Create Order
          </button>
        </form>
      </div>
    </section>
  );
}

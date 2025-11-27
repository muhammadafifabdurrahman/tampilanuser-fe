import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showOrders, updateOrders } from "../../../_services/orders";
import { getMenus } from "../../../_services/menus";

export default function KasirEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    table_number: "",
    order_type: "dine_in",
    status: "pending",
    note: "",
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil order & menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusData, orderData] = await Promise.all([getMenus(), showOrders(id)]);
        setMenus(menusData);

        setFormData({
          customer_name: orderData.customer_name || "",
          table_number: orderData.table_number || "",
          order_type: orderData.order_type || "dine_in",
          status: orderData.status || "pending",
          note: orderData.note || "",
          items: (orderData.orderItems || []).map((item) => ({
            menu_id: item.menu?.id || 0, // null-safe
            quantity: item.quantity,
          })),
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === "quantity" ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    if (!menus.length) return;
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { menu_id: menus[0].id, quantity: 1 }],
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await updateOrders(id, formData);
      if (response.success) {
        alert("Order updated successfully");
        navigate("/kasir/orders"); // atau /admin/orders sesuai route kamu
      } else {
        setError(response.message || "Update failed");
      }
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-5 bg-gray-50 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Edit Order #{id}</h2>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white rounded-lg shadow dark:bg-gray-800">
        {/* Customer & Table */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-gray-600 dark:text-gray-300">Customer Name</label>
            <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 dark:text-gray-300">Table Number</label>
            <input type="text" name="table_number" value={formData.table_number} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>

        {/* Order Type & Status */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-gray-600 dark:text-gray-300">Order Type</label>
            <select name="order_type" value={formData.order_type} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="dine_in">Dine In</option>
              <option value="take_away">Take Away</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-600 dark:text-gray-300">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block mb-1 text-gray-600 dark:text-gray-300">Note</label>
          <textarea name="note" value={formData.note} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>

        {/* Order Items */}
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-300">Order Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mb-2 md:flex-row">
              <select value={item.menu_id} onChange={(e) => handleItemChange(index, "menu_id", e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name} (Rp{menu.price})
                  </option>
                ))}
              </select>
              <input type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <button type="button" onClick={() => removeItem(index)} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600">
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
}

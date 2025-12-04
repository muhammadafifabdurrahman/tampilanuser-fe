// OrderEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showOrders, updateOrders } from "../../../_services/orders";
import { getMenus } from "../../../_services/menus";

export default function OrderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    table_number: "",
    order_type: "dine_in",
    note: "",
    status: "pending",
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ============= GET MENUS FIX =============
        const menuRes = await getMenus();

        // AUTO DETECT STRUKTUR API
        const menuData =
          menuRes?.data?.data ?? // { data: { data: [] }}
          menuRes?.data ?? // { data: [] }
          menuRes ?? // langsung []
          [];

        console.log("MENU RESPONSE FIXED:", menuData);
        setMenus(menuData);

        // ============= GET ORDER =============
        const order = await showOrders(id);
        console.log("ORDER DATA:", order);

        if (!order) {
          alert("Order tidak ditemukan!");
          return;
        }

        // SET FORM
        setForm({
          customer_name: order.customer_name ?? "",
          table_number: order.table_number ?? "",
          order_type: order.order_type ?? "dine_in",
          note: order.note ?? "",
          status: order.status ?? "pending",
          _method: "PUT",
        });

        // MAPPING ITEMS BACKEND
        const items = order.order_items ?? order.orderItems ?? order.items ?? [];

        setOrderItems(
          Array.isArray(items)
            ? items.map((item) => ({
                menu_id: item.menu_id,
                quantity: item.quantity,
              }))
            : []
        );
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data!");
      }
    };

    fetchData();
  }, [id]);

  // ============ HANDLERS ============
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const clone = [...orderItems];
    clone[index][field] = value;
    setOrderItems(clone);
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
      ...form,
      items: orderItems.map((i) => ({
        menu_id: Number(i.menu_id),
        quantity: Number(i.quantity),
      })),
    };

    try {
      await updateOrders(id, payload);
      alert("Order berhasil diperbarui!");
      navigate("/admin/orders");
    } catch (error) {
      console.error(error);
      alert("Gagal update order!");
    }
  };

  const safeItems = Array.isArray(orderItems) ? orderItems : [];

  return (
    <section className="p-5">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow">
        <h1 className="mb-5 text-2xl font-semibold">Edit Order #{id}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FORM INPUTS */}
          <div>
            <label className="block mb-1">Customer Name</label>
            <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block mb-1">Table Number</label>
            <input type="number" name="table_number" value={form.table_number} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1">Order Type</label>
            <select name="order_type" value={form.order_type} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="dine_in">Dine In</option>
              <option value="take_away">Take Away</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Note</label>
            <textarea name="note" value={form.note} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* ================== ITEMS ====================== */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Order Items</h2>

            {safeItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <select value={item.menu_id} onChange={(e) => handleItemChange(index, "menu_id", e.target.value)} className="flex-1 p-2 border rounded">
                  <option value="">Select Menu</option>
                  {menus.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input type="number" value={item.quantity} min="1" onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="w-20 p-2 border rounded" />

                {index > 0 && (
                  <button type="button" onClick={() => removeItemRow(index)} className="px-3 py-1 text-red-600 border border-red-500 rounded">
                    X
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addItemRow} className="px-4 py-2 mt-2 text-white bg-yellow-500 rounded">
              + Add Item
            </button>
          </div>

          <button type="submit" className="px-5 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
            Update Order
          </button>
        </form>
      </div>
    </section>
  );
}

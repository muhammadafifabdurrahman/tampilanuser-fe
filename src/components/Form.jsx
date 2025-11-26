import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { createOrders } from "../_services/orders";
import toast from "react-hot-toast";

export default function OrderForm({ items = [], onClose, removeFromCart }) {
  const [orderItems, setOrderItems] = useState([]);
  const [successData, setSuccessData] = useState(null);

  // Prevent Toast Double (StrictMode Fix)
  const toastLock = useRef(false);
  const showToast = (fn) => {
    if (toastLock.current) return;
    toastLock.current = true;

    fn(); // jalankan toast

    setTimeout(() => {
      toastLock.current = false;
    }, 300);
  };

  // Gabungkan duplikasi item
  useEffect(() => {
    const merged = [];
    items.forEach((item) => {
      const found = merged.find((i) => i.id === item.id);
      if (found) {
        found.quantity += 1;
      } else {
        merged.push({ ...item, quantity: 1 });
      }
    });
    setOrderItems(merged);
  }, [items]);

  const [formData, setFormData] = useState({
    customer_name: "",
    order_type: "dine_in",
    note: "",
    total_amount: 0,
  });

  // Hitung total otomatis
  useEffect(() => {
    const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setFormData((prev) => ({ ...prev, total_amount: total }));
  }, [orderItems]);

  const handleQuantity = (id, delta) => {
    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const newQty = item.quantity + delta;

        if (newQty > item.stock) {
          showToast(() => toast.error(`Stok ${item.name} hanya tersedia ${item.stock}`));
          return item;
        }

        return { ...item, quantity: Math.max(1, newQty) };
      })
    );
  };

  const handleRemove = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id));
    removeFromCart(id);

    showToast(() => toast.success("Item dihapus dari keranjang"));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI
    for (const item of orderItems) {
      if (item.quantity > item.stock) {
        showToast(() => toast.error(`Jumlah pesanan ${item.name} melebihi stok (${item.stock})`));
        return;
      }
    }

    if (orderItems.length === 0) {
      showToast(() => toast.error("Keranjang masih kosong!"));
      return;
    }

    if (!formData.customer_name.trim()) {
      showToast(() => toast.error("Nama customer wajib diisi!"));
      return;
    }

    const payload = {
      customer_name: formData.customer_name,
      order_type: formData.order_type,
      note: formData.note,
      items: orderItems.map((i) => ({
        menu_id: i.id,
        quantity: i.quantity,
      })),
    };

    try {
      const res = await createOrders(payload);

      const order = res.data?.data || res.data?.order || res.data || null;

      if (!order) {
        showToast(() => toast.error("Format response backend tidak dikenali!"));
        return;
      }

      setSuccessData(order);

      showToast(() => toast.success("Pesanan berhasil dibuat!"));

      // Setelah berhasil → reset keranjang di navbar
      orderItems.forEach((i) => removeFromCart(i.id));
    } catch (err) {
      console.error("ERROR ORDER:", err);

      if (err.response?.status === 400) {
        showToast(() => toast.error(err.response.data.message || "Gagal membuat pesanan!"));
        return;
      }

      showToast(() => toast.error("Gagal membuat pesanan!"));
    }
  };

  // FEEDBACK SUKSES
  if (successData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl animate-fadeIn">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 text-4xl text-white bg-green-500 rounded-full shadow-md animate-pop">✓</div>
            <h2 className="mt-3 text-2xl font-bold text-center text-green-600">Pesanan Berhasil!</h2>
            <p className="text-sm text-gray-600">Berikut bukti pemesanannya</p>
          </div>

          <div className="p-4 border rounded-xl bg-gray-50">
            <p>
              <strong>No. Order:</strong> {successData.order_number}
            </p>
            <p>
              <strong>Nama:</strong> {successData.customer_name}
            </p>
            <p>
              <strong>Jenis:</strong> {successData.order_type}
            </p>
            <p>
              <strong>Catatan:</strong> {successData.note || "-"}
            </p>

            <h3 className="mt-4 font-bold">Detail Pesanan:</h3>
            <ul className="mt-2 space-y-2">
              {successData.order_items.map((item) => (
                <li key={item.menu_id} className="flex justify-between p-2 bg-white border rounded-lg">
                  <span>
                    {item.menu.name} x {item.quantity}
                  </span>
                  <span>Rp {item.subtotal.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-lg font-bold text-right">Total: Rp {successData.total_amount.toLocaleString()}</p>
          </div>

          <button onClick={onClose} className="w-full py-3 mt-5 text-white bg-primary rounded-xl">
            Tutup
          </button>
        </div>

        <style>{`
          .animate-fadeIn { animation: fadeIn 0.3s ease; }
          .animate-pop   { animation: pop 0.25s ease-out; }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes pop {
            0%   { transform: scale(0.5); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // FORM ORDER
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-lg p-6 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-4 text-2xl font-bold text-center">Order Form</h2>

        <ul className="mb-4 space-y-2 overflow-y-auto max-h-40">
          {orderItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
              <span>
                {item.name} — Rp {(item.price * item.quantity).toLocaleString()}
              </span>

              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantity(item.id, -1)} className="px-2 text-white bg-red-500 rounded">
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantity(item.id, 1)} className="px-2 text-white bg-green-500 rounded">
                  +
                </button>
                <button onClick={() => handleRemove(item.id)} className="text-red-600">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mb-4 text-lg font-bold text-right">Total: Rp {formData.total_amount.toLocaleString()}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" required placeholder="Nama Customer" value={formData.customer_name} onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })} className="w-full p-3 border rounded-xl" />

          <select value={formData.order_type} onChange={(e) => setFormData({ ...formData, order_type: e.target.value })} className="w-full p-3 border rounded-xl">
            <option value="dine_in">Dine In</option>
            <option value="take_away">Take Away</option>
          </select>

          <textarea placeholder="Catatan (opsional)" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full p-3 border rounded-xl"></textarea>

          <button type="submit" className="w-full py-3 text-white bg-primary rounded-xl">
            Buat Pesanan
          </button>
        </form>

        <button onClick={onClose} className="absolute text-2xl top-3 right-4">
          ×
        </button>
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  removeFromCart: PropTypes.func,
};

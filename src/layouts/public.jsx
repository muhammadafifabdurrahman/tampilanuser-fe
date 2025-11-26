import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import OrderForm from "../components/form";

export default function Publiclayout() {
  const [cart, setCart] = useState([]);
  const [orderModalItems, setOrderModalItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Tambah ke cart
  const addToCart = (item) => {
    const count = cart.filter((i) => i.id === item.id).length;

    if (count >= item.stock) {
      alert(`❌ Stok ${item.name} hanya tersisa ${item.stock}`);
      return;
    }

    setCart((prev) => [...prev, item]);
  };

  // Hapus dari cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const orderSingle = (item) => {
    setOrderModalItems([item]);
    setShowOrderModal(true);
  };

  const orderCart = () => {
    if (cart.length === 0) return;
    setOrderModalItems(cart);
    setShowOrderModal(true);
  };

  return (
    <>
      <Navbar cart={cart} orderCart={orderCart} />
      <Outlet context={{ addToCart, orderSingle, removeFromCart }} />

      <Footer />

      {showOrderModal && (
        <OrderForm
          items={orderModalItems}
          onClose={() => setShowOrderModal(false)}
          removeFromCart={removeFromCart} // ❗ dikirim ke form
        />
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { getMenus } from "../_services/menus";
import { getCategories } from "../_services/categories";
import { menuImageStorage } from "../_api";
import { FaCartShopping } from "react-icons/fa6";
import PropTypes from "prop-types";
import OrderForm from "./form";

export default function Menu({ addToCart, removeFromCart }) {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const [orderModalItems, setOrderModalItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuData = await getMenus();
        const categoryData = await getCategories();

        // pastikan price number
        const menuDataNumber = menuData.map((item) => ({
          ...item,
          price: parseFloat(item.price),
        }));

        setMenus(menuDataNumber);
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredMenus = activeCategory === "all" ? menus : menus.filter((item) => item.category_id === activeCategory);

  const menusToShow = showAll ? filteredMenus : filteredMenus.slice(0, 10);

  const handleOrderSingle = (item) => {
    setOrderModalItems([item]);
    setShowOrderModal(true);
  };

  const handleAddToCart = (item) => {
    // Hitung jumlah item yang sudah ada di cart
    const existCount = orderModalItems.filter((i) => i.id === item.id).length;

    if (existCount >= item.stock) {
      alert(`❌ Stok ${item.name} hanya tersisa ${item.stock}`);
      return;
    }

    addToCart(item); // panggil parent
  };

  return (
    <section id="menu" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 sm:text-4xl dark:text-white">Menu Pilihan Kami</h1>

        {/* TAB KATEGORI */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-5 py-2 rounded-full border transition ${activeCategory === "all" ? "bg-primary text-white" : "bg-white dark:bg-gray-800 dark:text-white border-gray-300"}`}
            onClick={() => {
              setActiveCategory("all");
              setShowAll(false);
            }}
          >
            Semua
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-5 py-2 rounded-full border transition ${activeCategory === cat.id ? "bg-primary text-white" : "bg-white dark:bg-gray-800 dark:text-white border-gray-300"}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* GRID MENU */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {menusToShow.map((item) => (
            <div key={item.id} className="p-5 transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl">
              <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                <img src={`${menuImageStorage}/menus/${item.photo}`} alt={item.name} className="object-cover w-full h-full" />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h2>

              <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{item.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-primary">Rp {parseFloat(item.price).toLocaleString()}</span>
                {item.stock > 0 ? <span className="text-sm font-medium text-green-500">Tersedia</span> : <span className="text-sm font-medium text-red-500">Habis</span>}
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => handleOrderSingle(item)} className="flex-1 py-1.5 text-sm font-medium text-white transition rounded-full shadow bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Pesan
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="group flex items-center justify-center gap-1 flex-1 py-1.5 text-sm font-medium text-primary transition rounded-full border border-primary hover:bg-primary hover:text-white"
                >
                  <FaCartShopping className="text-lg transition-colors drop-shadow-sm group-hover:text-white" />
                  Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Lainnya */}
        {filteredMenus.length > 10 && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setShowAll(!showAll)} className="px-6 py-3 text-white rounded-full shadow bg-primary hover:bg-primary/90">
              {showAll ? "Tutup" : "Lihat Lainnya"}
            </button>
          </div>
        )}

        {/* Modal OrderForm */}
        {showOrderModal && <OrderForm items={orderModalItems} onClose={() => setShowOrderModal(false)} removeFromCart={removeFromCart} />}
      </div>
    </section>
  );
}

// PropTypes untuk Menu
Menu.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import MenuList from "./pages/Menus/MenuList";
import MenuDetail from "./pages/Menus/MenuDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderStatus from "./pages/OrderStatus/OrderStatus";

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/menus" element={<MenuList />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-status" element={<OrderStatus />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Public";
import Publiclayout from "./layouts/public";
import AdminLayout from "./layouts/admin";
import AdminUsers from "./pages/admin/users";
import AdminCategories from "./pages/admin/categories";
import CategoriesCreate from "./pages/admin/categories/create";
import AdminMenus from "./pages/admin/menus";
import AdminOrders from "./pages/admin/orders";
import AdminOrdersItems from "./pages/admin/order_items";
import AdminPayments from "./pages/admin/payments";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import DashboardAdmin from "./pages/admin";
import KasirLayout from "./layouts/kasir";
import DashboardKasir from "./pages/kasir";
import KasirOrders from "./pages/kasir/orders";
import KasirPayments from "./pages/kasir/payments";
import KasirEdit from "./pages/kasir/orders/edit";

function App() {
  return (
    <>
      {/* TOAST GLOBAL */}
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* public layout */}
          <Route element={<Publiclayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* kasir */}
          <Route path="kasir" element={<KasirLayout />}>
            <Route index element={<DashboardKasir />} />
            <Route path="orders">
              <Route index element={<KasirOrders />} />
              <Route path="edit/:id" element={<KasirEdit />} />
            </Route>
            <Route path="order_items">
              <Route index element={<AdminOrdersItems />} />
            </Route>
            <Route path="payments">
              <Route index element={<KasirPayments />} />
            </Route>
          </Route>

          {/* Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="users">
              <Route index element={<AdminUsers />} />
            </Route>
            <Route path="categories">
              <Route index element={<AdminCategories />} />
              <Route path="create" element={<CategoriesCreate />} />
            </Route>
            <Route path="menus">
              <Route index element={<AdminMenus />} />
            </Route>
            <Route path="orders">
              <Route index element={<AdminOrders />} />
            </Route>
            <Route path="order_items">
              <Route index element={<AdminOrdersItems />} />
            </Route>
            <Route path="payments">
              <Route index element={<AdminPayments />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

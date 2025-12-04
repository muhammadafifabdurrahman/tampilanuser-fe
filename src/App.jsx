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
import DashboardAdmin from "./pages/admin";
import KasirLayout from "./layouts/kasir";
import DashboardKasir from "./pages/kasir";
import KasirOrders from "./pages/kasir/orders";
import KasirPayments from "./pages/kasir/payments";
import PaymentCreate from "./pages/admin/payments/create";
import KasirAdd from "./pages/admin/users/create";
import MenusCreate from "./pages/admin/menus/create";
import CategoriEdit from "./pages/admin/categories/edit";
import MenuEdit from "./pages/admin/menus/edit";
import PaymentEdit from "./pages/admin/payments/edit";
import OrderEdit from "./pages/admin/orders/edit";
import UserEdit from "./pages/admin/users/edit";
import KasirOrderEdit from "./pages/kasir/orders/edit";
import AdminOrderCreate from "./pages/admin/orders/create";
import KasirOrderCreate from "./pages/kasir/orders/create";
import KasirPaymentCreate from "./pages/kasir/payments/create";

function App() {
  return (
    <>
      {/* TOAST GLOBAL */}
      <Toaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="login" element={<Login />} />


          {/* public layout */}
          <Route element={<Publiclayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* kasir */}
          <Route path="kasir" element={<KasirLayout />}>
            <Route index element={<DashboardKasir />} />
            <Route path="orders">
              <Route index element={<KasirOrders />} />
              <Route path='create' element={<KasirOrderCreate />}/>
              <Route path="edit/:id" element={<KasirOrderEdit/>} />
            </Route>
            <Route path="order_items">
              <Route index element={<AdminOrdersItems />} />
            </Route>
            <Route path="payments">
              <Route index element={<KasirPayments />} />
              <Route path="create" element={<KasirPaymentCreate /> } />
              <Route path="edit/:id" element={<PaymentEdit/>} />
            </Route>
          </Route>

          {/* Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path="create" element={<KasirAdd />} />
              <Route path="edit/:id" element={<UserEdit/>} />
            </Route>
            <Route path="categories">
              <Route index element={<AdminCategories />} />
              <Route path="create" element={<CategoriesCreate />} />
              <Route path="edit/:id" element={<CategoriEdit/>} />
            </Route>
            <Route path="menus">
              <Route index element={<AdminMenus />} />
              <Route path='create' element={<MenusCreate />}/>
              <Route path="edit/:id" element={<MenuEdit/>} />
            </Route>
            <Route path="orders">
              <Route index element={<AdminOrders />} />
              <Route path='create' element={<AdminOrderCreate />}/>
              <Route path="edit/:id" element={<OrderEdit/>} />
            </Route>
            <Route path="order_items">
              <Route index element={<AdminOrdersItems />} />
            </Route>
            <Route path="payments">
              <Route index element={<AdminPayments />} />
              <Route path="create" element={<PaymentCreate /> } />
              <Route path="edit/:id" element={<PaymentEdit/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

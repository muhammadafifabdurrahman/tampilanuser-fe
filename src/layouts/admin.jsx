import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/food-logo.png";
import { LayoutDashboard, Users, Menu, ShoppingBag, CreditCard, LogOut, Layers, ClipboardList } from "lucide-react";
import { logout, useDecodeToken } from "../_services/auth";
import { useEffect } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil token & userInfo (dengan fallback aman)
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // Decode token
  const decodedData = useDecodeToken(token);

  useEffect(() => {
    // Jika tidak ada token → arahkan login
    if (!token) {
      navigate("/login");
      return;
    }

    // Jika token tidak valid → arahkan login
    if (!decodedData || !decodedData.success) {
      navigate("/login");
      return;
    }

    // Cek role user
    const role = userInfo?.role;

    // Jika userInfo tidak ada role → arahkan login
    if (!role) {
      navigate("/login");
      return;
    }

    // Jika role bukan admin → arahkan kasir
    if (role !== "admin") {
      navigate("/kasir");
    }
  }, [token, decodedData, navigate]);

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  // Sidebar active menu
  const isActive = (path) => location.pathname === path;
  const baseClass = "flex items-center p-2 rounded-lg group transition-colors duration-200";
  const activeClass = "bg-primary text-white dark:bg-primary";
  const inactiveClass = "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Mobile */}
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              {/* Logo */}
              <Link to="/admin" className="flex items-center gap-2 ms-2 md:me-24">
                <img src={Logo} className="h-8 me-3" alt="RasaLokal Logo" />
                <span className="text-xl font-semibold sm:text-2xl dark:text-white">RasaLokal</span>
              </Link>
            </div>

            {/* Right - Profile */}
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex items-center gap-3">
                  <span className="hidden text-sm font-medium text-gray-900 dark:text-gray-300 md:block">Admin User</span>
                  <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Admin+User&background=ffc001&color=fff" alt="user photo" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/admin" className={`${baseClass} ${isActive("/admin") ? activeClass : inactiveClass}`}>
                <LayoutDashboard className="w-5 h-5" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/users" className={`${baseClass} ${isActive("/admin/users") ? activeClass : inactiveClass}`}>
                <Users className="w-5 h-5" />
                <span className="ms-3">Users</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/categories" className={`${baseClass} ${isActive("/admin/categories") ? activeClass : inactiveClass}`}>
                <Layers className="w-5 h-5" />
                <span className="ms-3">Categories</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/menus" className={`${baseClass} ${isActive("/admin/menus") ? activeClass : inactiveClass}`}>
                <Menu className="w-5 h-5" />
                <span className="ms-3">Menus</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/order_items" className={`${baseClass} ${isActive("/admin/order_items") ? activeClass : inactiveClass}`}>
                <ClipboardList className="w-5 h-5" />
                <span className="ms-3">Order Items</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/orders" className={`${baseClass} ${isActive("/admin/orders") ? activeClass : inactiveClass}`}>
                <ShoppingBag className="w-5 h-5" />
                <span className="ms-3">Orders</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/payments" className={`${baseClass} ${isActive("/admin/payments") ? activeClass : inactiveClass}`}>
                <CreditCard className="w-5 h-5" />
                <span className="ms-3">Payments</span>
              </Link>
            </li>
          </ul>

          {/* Bottom Logout */}
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <button onClick={handleLogout} className="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-50 dark:text-red-500 dark:hover:bg-gray-700">
                <LogOut className="w-5 h-5" />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="p-4 pt-20 sm:ml-64">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

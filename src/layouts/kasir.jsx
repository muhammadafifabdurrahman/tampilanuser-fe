import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/food-logo.png";
import { LayoutDashboard, ShoppingBag, CreditCard, LogOut, ClipboardList } from "lucide-react";
import { logout, useDecodeToken } from "../_services/auth";
import { useEffect } from "react";

export default function KasirLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil token dan userInfo secara aman (fallback)
  const token = localStorage.getItem("accessToken") || null;
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const decodedData = useDecodeToken(token);

  useEffect(() => {
    // Jika tidak ada token → paksa login
    if (!token) {
      navigate("/login");
      return;
    }

    // Jika decode token belum valid → paksa login
    if (!decodedData || !decodedData.success) {
      navigate("/login");
      return;
    }

    // Ambil role secara aman
    const role = userInfo?.role;

    // Jika role tidak ada → redirect login
    if (!role) {
      navigate("/login");
      return;
    }

    // Jika role bukan kasir → redirect admin
    if (role !== "kasir") {
      navigate("/admin");
      return;
    }
  }, [token, decodedData, navigate]);

  const handleLogout = async () => {
    if (token) {
      await logout({ token });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  // Menu helper
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
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
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

              <Link to="/kasir" className="flex items-center gap-2 ms-2 md:me-24">
                <img src={Logo} className="h-8 me-3" alt="RasaLokal Logo" />
                <span className="text-xl font-semibold dark:text-white">RasaLokal</span>
              </Link>
            </div>

            {/* User Section */}
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium dark:text-gray-300 md:block">Kasir</span>
              <img className="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Kasir&background=ffc001&color=fff" alt="user" />
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/kasir" className={`${baseClass} ${isActive("/kasir") ? activeClass : inactiveClass}`}>
                <LayoutDashboard className="w-5 h-5" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/kasir/order_items" className={`${baseClass} ${isActive("/kasir/order_items") ? activeClass : inactiveClass}`}>
                <ClipboardList className="w-5 h-5" />
                <span className="ms-3">Order Items</span>
              </Link>
            </li>

            <li>
              <Link to="/kasir/orders" className={`${baseClass} ${isActive("/kasir/orders") ? activeClass : inactiveClass}`}>
                <ShoppingBag className="w-5 h-5" />
                <span className="ms-3">Orders</span>
              </Link>
            </li>

            <li>
              <Link to="/kasir/payments" className={`${baseClass} ${isActive("/kasir/payments") ? activeClass : inactiveClass}`}>
                <CreditCard className="w-5 h-5" />
                <span className="ms-3">Payments</span>
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <button onClick={handleLogout} className="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700">
                <LogOut className="w-5 h-5" />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="p-4 pt-20 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

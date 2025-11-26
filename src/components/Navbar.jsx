import Logo from "../assets/food-logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Link } from "react-scroll";
import PropTypes from "prop-types";

const MenuItems = [
  { id: 1, name: "Home", link: "hero" },
  { id: 2, name: "Menu", link: "menu" },
  { id: 3, name: "About", link: "about" },
];

const Navbar = ({ cart, orderCart }) => {
  return (
    <div className="sticky top-0 z-50 duration-200 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <a href="#" className="flex gap-2 text-2xl font-bold sm:text-3xl">
          <img src={Logo} alt="Logo" className="w-10" />
          RasaLokal
        </a>

        {/* Menu + DarkMode + Order */}
        <div className="flex items-center gap-4">
          <DarkMode />

          <ul className="items-center hidden gap-4 sm:flex">
            {MenuItems.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="inline-block px-4 py-4 cursor-pointer hover:text-yellow-500"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Tombol Order */}
          <button
            onClick={orderCart}
            className="flex items-center gap-2 px-4 py-1 text-white duration-200 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105"
          >
            Order {cart.length > 0 && `(${cart.length})`}
            <FaCartShopping className="text-xl text-white drop-shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ PropTypes untuk validasi props
Navbar.propTypes = {
  cart: PropTypes.array.isRequired,
  orderCart: PropTypes.func.isRequired,
};

export default Navbar;

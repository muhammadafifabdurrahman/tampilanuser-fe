import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import footerLogo from "../assets/food-logo.png";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 bg-gray-100 dark:bg-gray-950">
      <div className="px-6 mx-auto max-w-7xl">
        {/* GRID UTAMA */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* BRAND + DESCRIPTION */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={footerLogo} alt="Logo" className="w-12" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">RasaLokal</h2>
            </div>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">Menghadirkan cita rasa Nusantara dengan sentuhan modern — kualitas terbaik, rasa autentik, dan pengalaman kuliner yang nyaman untuk semua pelanggan.</p>

            {/* CONTACT */}
            <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Jakarta, Indonesia</p>
              </div>

              <div className="flex items-center gap-3">
                <FaMobileAlt />
                <p>+62 812-3456-7890</p>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-4 mt-6 text-gray-700 dark:text-gray-200">
              <a href="#" className="transition hover:text-primary">
                <FaInstagram size={26} />
              </a>
              <a href="#" className="transition hover:text-primary">
                <FaFacebook size={26} />
              </a>
              <a href="#" className="transition hover:text-primary">
                <FaLinkedin size={26} />
              </a>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-2">
            {/* MENU 1 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Navigasi</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="transition cursor-pointer hover:text-primary">
                  <ScrollLink to="hero" smooth duration={600} offset={-80}>
                    Home
                  </ScrollLink>
                </li>
                <li className="transition cursor-pointer hover:text-primary">
                  <ScrollLink to="about" smooth duration={600} offset={-80}>
                    Tentang Kami
                  </ScrollLink>
                </li>
                <li className="transition cursor-pointer hover:text-primary">
                  <ScrollLink to="menu" smooth duration={600} offset={-80}>
                    Menu
                  </ScrollLink>
                </li>
              </ul>
            </div>

            {/* MENU 2 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Layanan</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="transition cursor-pointer hover:text-primary">Dine In</li>
                <li className="transition cursor-pointer hover:text-primary">Take Away</li>
                <li className="transition cursor-pointer hover:text-primary">Delivery</li>
                <li className="transition cursor-pointer hover:text-primary">Reservasi</li>
              </ul>
            </div>

            {/* MENU 3 */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Bantuan</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="transition cursor-pointer hover:text-primary">FAQ</li>
                <li className="transition cursor-pointer hover:text-primary">Privacy Policy</li>
                <li className="transition cursor-pointer hover:text-primary">Terms</li>
                <li className="transition cursor-pointer hover:text-primary">Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-6 mt-12 text-center text-gray-600 border-t border-gray-300/40 dark:text-gray-400">© {new Date().getFullYear()} RasaLokal — All rights reserved.</div>
      </div>
    </footer>
  );
}

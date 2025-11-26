import About from "../../components/About";
import Hero from "../../components/Hero";
import Menu from "../../components/Menu";
import { useOutletContext } from "react-router";

export default function Home() {
  // Ambil fungsi dari layout
  const { addToCart, removeFromCart } = useOutletContext();

  return (
    <div>
      <Hero />
      {/* Menu pakai props */}
      <Menu addToCart={addToCart} removeFromCart={removeFromCart} />
      <About />
    </div>
  );
}

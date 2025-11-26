import { Link } from "react-scroll";

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Soft Glow Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-300 dark:bg-yellow-500 rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-400 dark:bg-orange-600 rounded-full blur-[160px] opacity-20"></div>
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">Tentang Kami</h2>

          <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            RasaLokal menghadirkan cita rasa Nusantara dengan sentuhan modern— menggabungkan resep otentik, pelayanan ramah, dan pengalaman makan yang nyaman serta berkualitas tinggi.
          </p>
        </div>

        {/* 3 INFORMATION CARDS */}
        <div className="grid max-w-6xl gap-10 mx-auto mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          <div className="p-8 transition-all bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-4 text-xl font-semibold text-primary">Visi Kami</h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">Menjadi restoran lokal modern terbaik yang menyajikan rasa autentik Indonesia dengan kualitas tinggi dan inovasi berkelanjutan.</p>
          </div>

          <div className="p-8 transition-all bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-4 text-xl font-semibold text-primary">Misi Kami</h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">Memberikan pengalaman kuliner nyaman melalui pelayanan ramah, kebersihan terjaga, dan menu yang selalu lezat.</p>
          </div>

          <div className="p-8 transition-all bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-4 text-xl font-semibold text-primary">Nilai Utama</h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">Kami menjunjung tinggi kualitas bahan, kejujuran, dan konsistensi dalam setiap hidangan yang kami sajikan.</p>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-16">
          <Link
            to="menu"
            smooth={true}
            duration={600}
            offset={-80}
            className="px-10 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer"
          >
            Lihat Menu Kami
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../_services/auth";

export default function KasirAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await register(formData);

      setMessage({
        type: "success",
        text: response.message || "User berhasil dibuat!",
      });

      setTimeout(() => navigate("/admin/users"), 1200);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 422) {
        setMessage({
          type: "error",
          text: Object.values(error.response.data)[0],
        });
      } else {
        setMessage({
          type: "error",
          text: "Gagal membuat user. Periksa input atau koneksi.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add New User
        </h2>

        {message.text && (
          <div
            className={`p-3 mb-4 text-sm rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="text-white bg-yellow-500 hover:bg-blue-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                {loading ? "Processing..." : "Create User"}
              </button>

              <button
                type="button"
                onClick={() => setFormData({ name: "", email: "", password: "" })}
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
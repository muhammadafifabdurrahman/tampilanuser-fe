import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../../_services/orders";
import { createPayments, getPayments } from "../../../_services/payments";

export default function PaymentCreate() {
  //   const[payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [formData, setFormData] = useState({
    order_id: 0,
    user_id: 0,
    payment_method: 0,
    total_amount: 0,
    amount_paid: "",
    change_amount: "",
    status: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [paymentsData, ordersData] = await Promise.all([getPayments(), getOrders()]);

      setOrders(ordersData);

      // Ambil payment_method unik saja
      const uniqueMethods = [...new Set(paymentsData.map((p) => p.payment_method))];
      setPaymentMethods(uniqueMethods);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await createPayments(payload);
      navigate("/admin/payments");
      alert("Payment berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      alert("Error creating payment");
    }
  };
  console.log(formData);

  return (
    <>
      <section className="w-full bg-white dark:bg-gray-900">
        <div className="px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create New Menu</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label htmlFor="order_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Order Number
                </label>
                <select
                  id="order_id"
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">---Select Order---</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.order_number}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="order_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer Name
                </label>
                <select
                  id="order_id"
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">---Select Order---</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.customer_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="order_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Total Amount
                </label>
                <select
                  id="order_id"
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">---Select Order---</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.total_amount}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="payment_method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Payment Method
                </label>
                <select
                  id="payment_method"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">---Select Payment Method---</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="amount_paid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Amount Paid
                </label>
                <input
                  type="number"
                  name="amount_paid"
                  id="amount_paid"
                  value={formData.amount_paid}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Rp. 0"
                  required
                />
              </div>

              {/* <div className="sm:col-span-2">
                <label
                  for="change_amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Change Amount
                </label>
                <input
                  type="number"
                  name="change_amount"
                  id="change_amount"
                  value={formData.change_amount}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Rp. 0"
                  required
                />
            </div> */}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="text-white !bg-blue-700 hover:bg-indigo-800 focus:ring-4  focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Create Payment
                </button>
                <button
                  type="button"
                  className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrders } from "../../../_services/orders";
import { getPayments, showPayments, updatePayments } from "../../../_services/payments";

export default function PaymentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [formData, setFormData] = useState({
    order_id: 0,
    user_id: 0,
    payment_method: "",
    total_amount: 0,
    amount_paid: 0,
    change_amount: 0,
    status: 0,
    _method: "PUT",
  });

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const [paymentsData, ordersData, paymentData] = await Promise.all([getPayments(), getOrders(), showPayments(id)]);

      setOrders(ordersData);

      const uniqueMethods = [...new Set(paymentsData.map((p) => p.payment_method))];
      setPaymentMethods(uniqueMethods);

      // Prefill form
      setFormData({
        order_id: paymentData.order_id,
        user_id: paymentData.user_id,
        payment_method: paymentData.payment_method,
        total_amount: paymentData.total_amount,
        amount_paid: paymentData.amount_paid,
        change_amount: paymentData.change_amount,
        status: paymentData.status,
        _method: "PUT",
      });
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ketika order dipilih → ambil total_amount dari order
    if (name === "order_id") {
      const selectedOrder = orders.find((o) => o.id == value);
      const newTotal = selectedOrder ? selectedOrder.total_amount : 0;

      setFormData({
        ...formData,
        order_id: value,
        total_amount: newTotal,
        change_amount: formData.amount_paid - newTotal,
      });

      return;
    }

    // Ketika amount_paid berubah → hitung change_amount
    if (name === "amount_paid") {
      const paid = Number(value);
      const newChange = paid - formData.total_amount;

      setFormData({
        ...formData,
        amount_paid: paid,
        change_amount: newChange,
      });

      return;
    }

    // default update
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

      await updatePayments(id, payload);

      alert("Payment berhasil diupdate!");
      navigate("/admin/payments");
    } catch (error) {
      console.log(error);
      alert("Error update payment");
    }
  };

  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Payment</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* Order */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order Number</label>
              <select name="order_id" value={formData.order_id} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white">
                <option value="">---Select Order---</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.order_number}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Name</label>
              <input type="text" readOnly value={orders.find((o) => o.id == formData.order_id)?.customer_name || ""} className="w-full p-2.5 bg-gray-200 rounded-lg" />
            </div>

            {/* Total Amount */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Amount</label>
              <input type="number" readOnly value={formData.total_amount} className="w-full p-2.5 bg-gray-200 rounded-lg" />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
              <select name="payment_method" value={formData.payment_method} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white">
                <option value="">---Select Payment Method---</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Paid */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Paid</label>
              <input type="number" name="amount_paid" value={formData.amount_paid} onChange={handleChange} className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:text-white" />
            </div>

            {/* Change Amount */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Amount</label>
              <input type="number" name="change_amount" value={formData.change_amount} readOnly className="w-full p-2.5 bg-gray-200 rounded-lg" />
            </div>
          </div>

          <button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-600 px-5 py-2.5 rounded-lg">
            Update Payment
          </button>
        </form>
      </div>
    </section>
  );
}

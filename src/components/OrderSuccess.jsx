import PropTypes from "prop-types";

export default function OrderSuccess({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">Pesanan Berhasil!</h2>

        <div className="space-y-2">
          <p>
            <strong>Nomor Order:</strong> {data.order_number}
          </p>
          <p>
            <strong>Nama:</strong> {data.customer_name}
          </p>
          <p>
            <strong>Jenis Order:</strong> {data.order_type}
          </p>
          <p>
            <strong>Catatan:</strong> {data.note || "-"}
          </p>
          <p>
            <strong>Total Harga:</strong> Rp {data.total_amount.toLocaleString()}
          </p>
        </div>

        <div className="mt-4">
          <strong>Rincian Pesanan:</strong>
          <ul className="mt-2 space-y-1">
            {data.items.map((item) => (
              <li key={item.menu_id} className="flex justify-between p-2 bg-gray-100 rounded-lg">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={onClose} className="w-full py-2 mt-5 font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600">
          Tutup
        </button>

        <button onClick={onClose} className="absolute text-xl font-bold text-gray-600 top-3 right-4 hover:text-black">
          ×
        </button>
      </div>
    </div>
  );
}

OrderSuccess.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPayments } from "../../../_services/payments";
import { getOrders } from "../../../_services/orders";
import { getUsers } from "../../../_services/users";
import { deleteMenus } from "../../../_services/menus";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);

  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [paymentsData, ordersData] = await Promise.all([getPayments(), getOrders(), getUsers()]);
      setPayments(paymentsData);
      setOrders(ordersData);
      // setUsers(usersData);
    };
    fetchData();
  }, []);

  // const getOrdersId = (id) => {
  //   const order = orders.find((order) => order.id === id);
  //   return order ? order.order_number : "Unknown Order";
  // };

  const getOrdersName = (id) => {
    const order = orders.find((order) => order.id === id);
    return order ? order.customer_name : "Unknown Order";
  };
  const getOrdersNumber = (id) => {
    const order = orders.find((order) => order.id === id);
    return order ? order.order_number : "Unknown Order Number";
  };
  const getOrdersTotal = (id) => {
    const order = orders.find((order) => order.id === id);
    return order ? order.total_amount : "Unknown Order Number";
  };

  const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure to delete this Payment?");
        if(confirmDelete){
            await deleteMenus(id);
            setPayments(payments.filter((payment) => payment.id !== id));
        }
    }

  const toggleOpenDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <>
      <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          {/* Search Header + Create Button */}
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <Link
                  to={'/admin/payments/create'}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-indigo-300 dark:bg-yellow-600 dark:hover:bg-yellow-600 focus:outline-none dark:focus:ring-yellow-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Payments
                </Link>
              </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Id</th>
                  <th className="px-4 py-3">Order Id</th>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">Kode Pembayaran</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Amount Paid</th>
                  <th className="px-4 py-3">Change Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{payment.id}</td>
                      <td className="px-4 py-3">{payment.order_id}</td>
                      <td className="px-4 py-3">{getOrdersName(payment.order_id)}</td> 
                      <td className="px-4 py-3">{getOrdersNumber(payment.order_id)}</td>
                      <td className="px-4 py-3">{payment.payment_method}</td>
                      <td className="px-4 py-3">{getOrdersTotal(payment.order_id)}</td>
                      <td className="px-4 py-3">{payment.amount_paid}</td>
                      <td className="px-4 py-3">{payment.change_amount}</td>
                      <td className="px-4 py-3">{payment.status}</td>
                      <td className="relative px-4 py-3 text-right">
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === payment.id ? null : payment.id)}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        {openDropdownId === payment.id && (
                          <div className="absolute right-0 z-10 mt-2 bg-white rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <Link to={`/admin/payments/edit/${payment.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button onClick={ ()=> handleDelete(payment.id)} className="block w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-4 text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white"> 1000 </span>
            </span>

            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white 
                rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 
                    10l3.293 3.293a1 1 0 
                    01-1.414 1.414l-4-4a1 1 0 
                    010-1.414l4-4a1 1 0 
                    011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>

              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight text-indigo-600 border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white 
                  rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                  dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 
                    10 7.293 6.707a1 1 0 
                    011.414-1.414l4 4a1 1 0 
                    010 1.414l-4 4a1 1 0 
                    01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
import {
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useChangeOrderStatusMutation, useGetAllOrderQuery } from '../../redux/api/api';
import { format } from "date-fns";
import Pagination from '../../components/pagination';
import { Button } from 'antd';
import Swal from 'sweetalert2';
import SeeItemsModal from '../../components/dashboard/SeeItemsModal';


const ManageOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setSelectedStatus] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: orderData } = useGetAllOrderQuery({ searchTerm, limit, page, status });
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const [isOpenModal, setIsOpenModal] = useState(false)

  // console.log(orderData);

  const totalPage = [...Array(orderData?.data?.meta?.totalPage).keys()].map(i => i + 1);

  const handleChangeOrderStatus = async (id, status) => {
    const options = { id, status }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {  // Marked as async
      if (result.isConfirmed) {
        try {
          const response = await changeOrderStatus(options).unwrap();
          if (response.success) {
            Swal.fire({
              title: "Updated!",
              text: "Your status has been changed!.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `Failed to change the status.${error}}`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Manage Orders</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-orange-600">Processing Orders</p>
            <p className="text-2xl font-semibold mt-2">{orderData?.data?.ProcessingOrderCount}</p>
            <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-blue-600">Shipped Orders</p>
            <p className="text-2xl font-semibold mt-2">{orderData?.data?.shippedOrderCount}</p>
            <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-green-600">Delivered Orders</p>
            <p className="text-2xl font-semibold mt-2">{orderData?.data?.deliveredOrderCount}</p>
            <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-red-600">Cancel Orders</p>
            <p className="text-2xl font-semibold mt-2">{orderData?.data?.cancelledOrderCount}</p>
            <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search Order ID..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderData?.data?.result.map((order) => {
                  const formattedDate = format(new Date(order.createdAt), "MMMM d 'at' hh:mm a");




                  return (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.userName}
                        </div>
                        <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <select
                            value={order.status || "default"}
                            onChange={(e) => handleChangeOrderStatus(order._id, e.target.value)}
                            className="appearance-none pl-4 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute left-28 top-1.5 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalProduct} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.totalPayment} BDT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.payment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button onClick={() => setIsOpenModal(true)}
                          variant="outline">See Items</Button>
                        <>
                          {
                            isOpenModal && <SeeItemsModal
                              onClose={() => setIsOpenModal(false)}
                              products={order.products}
                            />
                          }
                        </>
                      </td>

                    </tr>

                  );
                })}

              </tbody>
            </table>
          </div>


          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{orderData?.data?.result?.length}</span> of{' '}
                  <span className="font-medium">{orderData?.data?.meta?.total}</span> results
                </p>
              </div>
              <div>
                <Pagination setLimit={setLimit} setPage={setPage} page={page} totalPage={totalPage} limit={limit} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageOrders; 

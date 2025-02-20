import { Loader2, CheckCircle2, AlertCircle, Package, } from 'lucide-react';
import ProfileUpdateModal from '../../../components/dashboard/ProfileUpdateModal';
import useUserData from '../../../hooks/useUserData';
import { LiaEdit } from 'react-icons/lia';
import { useState } from 'react';
import useMyOrder from '../../../hooks/useMyOrder';
import Loading from '../../Loading';


const Profile = () => {
  const [userData] = useUserData();
  const [myOrder, isLoading] = useMyOrder()
  const [isOpen, setIsOpen] = useState(false);

  console.log(myOrder);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold text-gray-900">My Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-full shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-5 mb-6 relative px-3">
                  <div className="relative w-24 h-24">
                    <img
                      src={userData?.photoURL || "/profile.png"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover ring-4 ring-white shadow-sm"
                    />
                  </div>
                  <h1 className='text-xl font-medium text-gray-900 text-center'>{userData?.name || "Name"}</h1>
                  <LiaEdit onClick={() => setIsOpen(true)} size={22} className='absolute right-0 cursor-pointer' />
                </div>
              </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-2xl font-bold text-gray-600">Total Orders</p>
            <p className="text-2xl font-semibold mt-2">{myOrder?.length || 0}</p>
            <p className="text-sm text-yellow-600 mt-2">Your total order {myOrder?.length || 0} </p>
          </div>
        </div>


        {isOpen && (
          <ProfileUpdateModal onClose={() => setIsOpen(false)} />
        )}

        {/* Orders Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
          <div className="space-y-4">
            {!isLoading ? (
              <>
                {myOrder?.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 mx-auto mb-4"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900 text-lg">{order.orderNumber}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${order.status === 'Delivered'
                                  ? 'bg-green-50 text-green-700'
                                  : order.status === 'Shipped'
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'bg-amber-50 text-amber-700'
                                  }`}
                              >
                                {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                {order.status === 'Processing' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                                {order.status === 'Shipped' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>

                            <div className="mt-3">
                              <table className="min-w-full w-full bg-white border border-gray-200">
                                <thead>
                                  <tr className="bg-gray-100 text-gray-700">
                                    <th className="py-2 px-4 text-left text-sm font-semibold">Product</th>
                                    <th className="py-2 px-4 text-left text-sm font-semibold">Price</th>
                                    <th className="py-2 px-4 text-left text-sm font-semibold">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.products.map((item, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                      <td className="py-2 px-4 text-sm text-gray-600">{item.quantity}× {item.name}</td>
                                      <td className="py-2 px-4 text-sm text-gray-500">{item.price}৳</td>
                                      <td className="py-2 px-4 text-sm text-gray-500">{item.totalPrice}৳</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-gray-100">
                                    <td colSpan={2} className="py-2 px-4 text-sm font-semibold text-gray-900 text-right">
                                      Total Price:
                                    </td>
                                    <td className="py-2 px-4 text-sm font-semibold text-gray-900">{order.totalPayment?.toFixed(2)}৳</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

export default Profile;
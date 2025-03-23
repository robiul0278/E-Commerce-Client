// import { Loader2, CheckCircle2, AlertCircle, Package, } from 'lucide-react';
// import Loading from '../../Loading';

const MyOrder = () => {
    return (
        <div className='min-h-screen'>
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-xl font-semibold text-gray-900">My Order History</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className="space-y-4">
                    {!isLoading ? (
                        <>
                            {myOrders?.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-xl overflow-hidden   mx-auto mb-4"
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
            </div> */}
        </div>

    )
}

export default MyOrder;
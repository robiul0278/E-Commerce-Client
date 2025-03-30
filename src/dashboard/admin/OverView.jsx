import Countdown from "../../components/Countdown";
import { useGetAllOrderQuery, useGetFlashProductsQuery, useGetProductsQuery } from "../../redux/api/api";


const OverView = () => {
    const {data: Order} = useGetAllOrderQuery('');
    const {data: FlashProduct} =  useGetFlashProductsQuery('');
    const {data: Product} = useGetProductsQuery('');

    // console.log(FlashProduct?.data?.meta?.total);
    return (
        <div className="">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard Overview</h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-semibold mt-2">{Order?.data?.meta?.total}</p>
                        <p className="text-sm text-green-600 mt-2">↑ total order in store</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-semibold mt-2">
                        {Product?.data?.meta?.total}
                            </p>
                        <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Total Flash Sale</p>
                        <p className="text-2xl font-semibold mt-2">
                        {FlashProduct?.data?.meta?.total}</p>
                        <p className="text-sm text-green-600 mt-2">↑ active flash sale</p>
                    </div>
                    <div className="bg-white flex flex-col gap-2 rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600">Discount End</p>
                        <Countdown />
                        <p className="text-sm text-green-600 mt-2">↑ discount end time</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView;
import Countdown from "../../../components/dashboard/Countdown";

const OverView = () => {
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
                        <p className="text-2xl font-semibold mt-2">1,234</p>
                        <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Pending Orders</p>
                        <p className="text-2xl font-semibold mt-2">23</p>
                        <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-semibold mt-2">$45,678</p>
                        <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
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
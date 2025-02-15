/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useFlashSale from "../../../hooks/useFlashSale";
import { RiDeleteBinLine } from "react-icons/ri";
import { Search } from "lucide-react";
import { Button } from "antd";


const FlashSale = () => {
    const token = localStorage.getItem("access-token");
    const [loading, setLoading] = useState(false);
    const [flashSaleData, isLoading, error, refetch] = useFlashSale();
    console.log(error);

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
    
        const productData = {
            name: "exist",
            role: "admin",
            discount: parseFloat(data.discount),
            products: [],
            startTime: data.startTime,
            endTime: data.endTime,
            status: "pending",
        };
    
        try {
            const response = await axios.post("http://localhost:5000/flash-sale", productData, {
                headers: { authorization: `Bearer ${token}` },
            });
    
            if (response.status === 201) {
                toast.success("Flash Sale created successfully!");
                reset(); // Reset form only on success
            } else {
                toast.error("⚠️ Failed to add product. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="font-[sans-serif]">
         {/* Header */}
         <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Manage Flash Sale</h1>
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
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-sm text-gray-600">Average Order Value</p>
                        <p className="text-2xl font-semibold mt-2">$234</p>
                        <p className="text-sm text-red-600 mt-2">↓ 3% from last month</p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl justify-around shadow-lg p-8 relative bg-white rounded">
                <h2 className="text-xl text-gray-800 font-bold">Create Flash Sale</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-4 gap-6">
                    
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Discount</label>
                            <input
                                type='text'
                                placeholder='50'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("discount", { required: "Discount is required !" })}
                            />
                            {errors.discount && <span className='text-red-500 text-xs'>{errors.discount.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Start Time</label>
                            <input
                                type='datetime-local'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("startTime", { required: "Time is required !" })}
                            />
                            {errors.startTime && <span className='text-red-500 text-xs'>{errors.startTime.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">End Time</label>
                            <input
                                type='datetime-local'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("endTime", { required: "Time is required !" })}
                            />
                            {errors.endTime && <span className='text-red-500 text-xs'>{errors.endTime.message}</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Submit...
                                </>
                            ) : "Submit"}
                        </button>
                    </form>
                    <h2 className="text-xl text-gray-800 font-bold">Update Flash Sale</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-4 gap-6">
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Discount</label>
                            <input
                                type='text'
                                placeholder='50'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("discount", { required: "Discount is required !" })}
                            />
                            {errors.discount && <span className='text-red-500 text-xs'>{errors.discount.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Start Time</label>
                            <input
                                type='datetime-local'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("startTime", { required: "Time is required !" })}
                            />
                            {errors.startTime && <span className='text-red-500 text-xs'>{errors.startTime.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">End Time</label>
                            <input
                                type='datetime-local'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("endTime", { required: "Time is required !" })}
                            />
                            {errors.endTime && <span className='text-red-500 text-xs'>{errors.endTime.message}</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Update...
                                </>
                            ) : "Update"}
                        </button>
                    </form>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-4 top-2.5" />
                </div>
              </div>
              <div className="flex gap-5">
              <Button variant="secondary">Create Flash Sale</Button>
              <Button variant="outline">Update Flash Sale</Button>
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
                       Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="flex item-center  px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading ? <>
                    {flashSaleData.map((user) => {
                      return (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 whitespace-nowrap text-sm font-medium text-blue-600">
                            <img src={user?.photoURL} alt="profile" className="h-14 w-14 rounded-full object-cover bg-gray-300" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
               
                          <td className="flex item-center px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button  className="ml-3" title="Delete">
                              <RiDeleteBinLine className="w-5 fill-red-500 hover:fill-red-700 text-xl" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </> : <>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                  </>}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">1,234</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
    )
}

export default FlashSale;
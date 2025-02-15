/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast"
import useUserData from "../../../hooks/useUserData";
import useProduct from "../../../hooks/useProduct";
import {
  Search,
  ChevronDown,
  Trash2,
  PenLine,
} from 'lucide-react';
import { Switch } from "antd";

const ManageProducts = () => {
  const [userData] = useUserData()
  const [allProducts, isLoading, refetch] = useProduct();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  const handleEditProduct = (product) => {
    // setModalProduct(product)
    document.getElementById('my_modal_4').showModal()
  }

  // handle Remove To Product
  const handleDeleteProduct = async (productId) => {
    if (!userData?.email) {
      toast.error("Please log in to remove product");
      return;
    }

    try {
      const response = await axios.delete(`https://gadget-shop-server-bay.vercel.app/delete-product/${productId}`);

      if (response.data.message === "Product deleted successfully!") {
        toast.success("Product deleted successfully!");
        refetch()
      } else {
        toast.error(response.data.message || "Failed to delete the product!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the product!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Manage Products</h1>
        </div>
      </header>

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

              {/* Time Range Filter */}
              <div className="relative">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
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
                    Product Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Create
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flash Sale
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading ? <>
                  {allProducts?.products.map((product) => {
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 whitespace-nowrap text-sm font-medium text-blue-600">
                          <img src={product?.image} alt="table navigate ui" className="h-16 w-16 object-cover bg-gray-300" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.price.toFixed(2)}৳
                        </td>
                        <td className="px-6 py-4">
                        <Switch id="airplane-mode" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditProduct(product)} className="mr-4" title="Edit">
                            <PenLine size={22} className="text-blue-600" />
                          </button>
                          <button onClick={() => handleDeleteProduct(product._id)} className="mr-4" title="Delete">
                            <Trash2 size={22} className="text-rose-600" />
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

export default ManageProducts
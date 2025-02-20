/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useFlashSale from "../../../hooks/useFlashSale";
import { RiDeleteBinLine } from "react-icons/ri";
import { Search } from "lucide-react";
import { Button } from "antd";
import CreateFlashSaleModal from "../../../components/dashboard/CreateFlashSaleModal";
import UpdateFlashSaleModal from "../../../components/dashboard/UpdateFlashSaleModal";
import Countdown from "../../../components/dashboard/Countdown";


const FlashSale = () => {
  const token = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5; // Items per page

  const [flashSaleData, isLoading, refetch] = useFlashSale(searchTerm, page, limit);

  console.log(flashSaleData);

// Calculate totalPages from server response
const totalPages = flashSaleData?.pagination?.totalPages || 1;
const totalProducts = flashSaleData?.pagination?.totalProducts || 0;

// Calculate the range of items being shown
const startItem = (page - 1) * limit + 1;
const endItem = Math.min(page * limit, totalProducts);


  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    reset: reset2,
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const handleCreateFlashSale = async (data) => {
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
      const response = await axios.post("https://gadget-shop-server-bay.vercel.app/flash-sale", productData, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        toast.success("Flash Sale created successfully!");
        reset(); // Reset form only on success
        refetch();
      } else {
        toast.error("⚠️ Failed to add product. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFlashSale = async (data) => {
    setUpdateLoading(true);
    const updateData = {
      discount: parseFloat(data.discount),
      startTime: data.startTime,
      endTime: data.endTime,
    }

    if (!flashSaleData?._id) {
      return toast.error("Please Create a Flash Sale!!");
    }

    try {
      await axios.patch(`https://gadget-shop-server-bay.vercel.app/flash-sale/${flashSaleData._id}`, updateData, {
        headers: { authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Flash Sale Update successfully!");
            reset(); // Reset form only on success
            refetch()
            setUpdateLoading(false);
          } else {
            toast.error("⚠️ Failed to add product. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      setUpdateLoading(false);
    }
  }


  const handleRemoveProduct = async (productId) => {

    const removeData = {
      flashSaleId: flashSaleData?._id,
      productId
    }

    if (!flashSaleData?._id) {
      return toast.error("Please Create a Flash Sale!!");
    }

    try {
      await axios.patch(`https://gadget-shop-server-bay.vercel.app/remove-flash-sale-product`, removeData, {
        headers: { authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Product Removed!");
            reset(); // Reset form only on success
            refetch()
            setUpdateLoading(false);
          } else {
            toast.error("⚠️ Failed to remove product. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      setUpdateLoading(false);
    }

  }

  return (
    <div className="font-[sans-serif]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Manage Flash Sale</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600">Total Product</p>
            <p className="text-2xl font-semibold mt-2">{flashSaleData?.totalProducts || 0}</p>
            <p className="text-sm text-green-600 mt-2">↑ {flashSaleData?.totalProducts || 0} products from store</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600">Discount Now</p>
            <p className="text-2xl font-semibold mt-2">{flashSaleData?.discount || 0}%</p>
            <p className="text-sm text-yellow-600 mt-2">{flashSaleData?.discount || 0}% discount from store</p>
          </div>
          <div className="bg-white flex flex-col gap-2 rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600">Discount End</p>
            <Countdown />
            <p className="text-sm text-green-600 mt-2">↑ discount end time</p>
          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  defaultValue=""
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
            <div className="flex gap-5">

              <Button onClick={() => setCreateOpen(true)} variant="outline">Create Flash Sale</Button>
              <Button onClick={() => setUpdateOpen(true)} variant="outline">Update Flash Sale</Button>
              {/* Create Flash Sale Modal  */}
              {isCreateOpen && <CreateFlashSaleModal
                onClose={() => setCreateOpen(false)} register={register} errors={errors} handleSubmit={handleSubmit} handleCreateFlashSale={handleCreateFlashSale} loading={loading}
              />}
              {/* Update Flash Sale Modal  */}
              {isUpdateOpen && <UpdateFlashSaleModal
                onClose={() => setUpdateOpen(false)} register2={register2} errors2={errors2} handleSubmit2={handleSubmit2} handleUpdateFlashSale={handleUpdateFlashSale} updateLoading={updateLoading}
              />}
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
                    Original Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount Price
                  </th>
                  <th className="flex item-center  px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading ? <>
                  {flashSaleData?.products?.map((product) => {
                    return (

                      <tr key={product.id} className="hover:bg-gray-50">

                        <td className="px-6 whitespace-nowrap text-sm font-medium text-blue-600">
                          <img src={product.image} alt="profile" className="h-14 w-14 rounded-full object-cover bg-gray-300" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 items-center  whitespace-nowrap text-sm text-gray-500">
                          {product.originalPrice}
                        </td>
                        <td className="px-6 py-4  items-center whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>

                        <td className="flex item-center px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleRemoveProduct(product?._id)} className="ml-3" title="Delete">
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

          {flashSaleData?.discount ? "" :
            <div className="flex items-center justify-center py-10">
              <h1 className="text-orange-500 font-bold">{flashSaleData?.discount ? "" : <>{flashSaleData?.message}</>}</h1>
            </div>
          }

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
              {/* Pagination Info */}
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startItem}</span> to{' '}
                  <span className="font-medium">{endItem}</span> of{' '}
                  <span className="font-medium">{totalProducts}</span> results
                </p>
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Search } from "lucide-react";
import { Button } from "antd";
import CreateFlashSaleModal from "../../components/dashboard/CreateFlashSaleModal";
import UpdateFlashSaleModal from "../../components/dashboard/UpdateFlashSaleModal";
import Countdown from "../../components/Countdown";
import { useCreateFlashSaleMutation, useGetFlashProductsQuery, useRemoveFlashProductMutation, useUpdateFlashSaleMutation } from "../../redux/api/api";

const FlashSale = () => {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const {data: flashData} = useGetFlashProductsQuery();
  const [removeProduct] = useRemoveFlashProductMutation();
  const [createFlashSale, {isLoading}] = useCreateFlashSaleMutation();
  const [updateFlashSale] = useUpdateFlashSaleMutation();

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    const productData = {
      name: "exist",
      role: "admin",
      discount: parseFloat(data?.discount),
      products: [],
      startTime: data?.startTime,
      endTime: data?.endTime,
      status: "pending",
    };

    try {
      const response = await createFlashSale(productData).unwrap();

      if (response.success) {
        toast.success("Flash Sale created successfully!");
        reset();
      }
    } catch (error) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Please Update Flash sale.");
    }
  };

  const handleUpdateFlashSale = async (data) => {
    const updateData = {
      id: flashData?.data?._id,
      discount: parseFloat(data?.discount),
      startTime: data?.startTime,
      endTime: data?.endTime,
    }

    if (!flashData?.data?._id) {
      return toast.error("Please Create a Flash Sale!!");
    }

    try {
      const response = await updateFlashSale(updateData).unwrap();
      if (response.success) {
        toast.success("Flash Sale Update successfully!");
        reset2();
      }
    } catch (error) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message);
    }
  }

  const handleRemoveProduct = async (id) => {
    try {
      const response = await removeProduct(id).unwrap();

      if (response.success) {
        toast.success("Product deleted successfully!");
        reset();
      }
    } catch (error) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message);
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
            <p className="text-2xl font-semibold mt-2">{flashData?.data?.products?.length || 0}</p>
            <p className="text-sm text-green-600 mt-2">↑ {flashData?.data?.products?.length || 0} products from store</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600">Discount Now</p>
            <p className="text-2xl font-semibold mt-2">{flashData?.data?.discount || 0}%</p>
            <p className="text-sm text-yellow-600 mt-2">{flashData?.data?.discount || 0}% discount from store</p>
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
                onClose={() => setCreateOpen(false)} register={register} errors={errors} handleSubmit={handleSubmit} handleCreateFlashSale={handleCreateFlashSale} loading={isLoading}
              />}
              {/* Update Flash Sale Modal  */}
              {isUpdateOpen && <UpdateFlashSaleModal
                onClose={() => setUpdateOpen(false)} register2={register2} errors2={errors2} handleSubmit2={handleSubmit2} handleUpdateFlashSale={handleUpdateFlashSale} 
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
                {flashData?.data?.products?.length ? <>
                  {flashData?.data?.products?.map((product) => {
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
                </> :
                 <>
                </>
                }
              </tbody>
            </table>
          </div>

          {flashData?.data?.products.length ?
     ""
            :
            <div className="flex items-center justify-center py-10">
              <h1 className="text-orange-500 font-bold">
                Please Add products in flash sale!
              </h1>
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
                  Showing {' '}
                  <span className="font-medium">{flashData?.data?.products?.length}</span> results
                </p>
              </div>
              {/* Pagination */}
              {/* <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    disabled={page === 1}
                    className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FlashSale;
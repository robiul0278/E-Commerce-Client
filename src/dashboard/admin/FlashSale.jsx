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
import Pagination from "../../components/pagination";
import { format } from "date-fns";

const FlashSale = () => {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: flashData } = useGetFlashProductsQuery({ searchTerm });
  const [removeProduct] = useRemoveFlashProductMutation();
  const [createFlashSale] = useCreateFlashSaleMutation();
  const [updateFlashSale] = useUpdateFlashSaleMutation();


  const totalPage = [...Array(flashData?.data?.meta?.totalPage).keys()].map(i => i + 1);

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    control: controlB,
    reset: resetB,
    register: registerB,
    handleSubmit: handleSubmitB,
    formState: { errors: errorsB },
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
      id: flashData?.data.flashData._id,
      discount: parseFloat(data?.discount),
      startTime: data?.startTime,
      endTime: data?.endTime,
    }


    if (!flashData?.data.flashData._id) {
      return toast.error("Please Create a Flash Sale!!");
    }

    try {
      const response = await updateFlashSale(updateData).unwrap();
      if (response.success) {
        toast.success("Flash Sale Update successfully!");
        resetB();
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="bg-blue-100 text-blue-600 p-1 px-2 rounded-full">
              <p className="text-sm text-gray-600">Total Products</p>
              </div>
            <p className="text-2xl font-semibold mt-2">{flashData?.data?.flashData.productCount || 0}</p>
            <p className="text-sm text-green-600 mt-2">↑ {flashData?.data?.flashData.productCount || 0} products from store</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="bg-blue-100 text-blue-600 p-1 px-2 rounded-full">
              <p className="text-sm text-gray-600">Discount Now</p>
              </div>
            <p className="text-2xl font-semibold mt-2">{flashData?.data?.flashData.discount || 0}%</p>
            <p className="text-sm text-yellow-600 mt-2">{flashData?.data?.flashData.discount || 0}% discount from store</p>
          </div>
          <div className="bg-white flex flex-col gap-2 rounded-lg shadow-sm p-6">
          <div className="bg-blue-100 text-blue-600 p-1 px-2 rounded-full">
              <p className="text-sm text-gray-600">Discount End</p>
              </div>
            <Countdown />
            <p className="text-sm text-green-600 mt-2">↑ discount end time</p>
          </div>
          <div className="bg-white flex flex-col gap-2 rounded-lg shadow-sm p-6">
            <div className="flex flex-col gap-2">
              <div className="bg-blue-100 text-blue-600 p-1 px-2 rounded-full">
              <p className="text-sm text-gray-600">Current Time</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {flashData?.data.flashData.startTime
                    ? format(new Date(flashData.data.flashData.startTime), "PPPp")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {flashData?.data.flashData.endTime
                    ? format(new Date(flashData.data.flashData.endTime), "PPPp")
                    : "N/A"}
                </p>
              </div>

            </div>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                onClose={() => setCreateOpen(false)} register={register} errors={errors} handleSubmit={handleSubmit} handleCreateFlashSale={handleCreateFlashSale} control={control}
              />}
              {/* Update Flash Sale Modal  */}
              {isUpdateOpen && <UpdateFlashSaleModal
                onClose={() => setUpdateOpen(false)} register={registerB} errors={errorsB} handleSubmit={handleSubmitB} handleUpdateFlashSale={handleUpdateFlashSale} control={controlB}
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
                {flashData?.data?.result?.length ? <>
                  {flashData?.data?.result.map((product) => {
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

          {flashData?.data?.result?.length ?
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
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{flashData?.data?.result?.length}</span> of{' '}
                  <span className="font-medium">{flashData?.data?.meta?.total}</span> results
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
  )
}

export default FlashSale;
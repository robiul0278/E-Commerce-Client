/* eslint-disable react/prop-types */
import { PenLine, Trash2 } from "lucide-react";
import useUserData from "../../hooks/useUserData";
import toast from "react-hot-toast";
import axios from "axios";
import useFlashSale from "../../hooks/useFlashSale";
import { Button } from "antd";

const ManageProductTable = ({ product }) => {
    const [flashSaleData,,refetch] = useFlashSale();
    const [userData] = useUserData()
    const token = localStorage.getItem("access-token");


    // Check if flashSaleData is an array or if it has products as an array
    const isInFlashSale = Array.isArray(flashSaleData?.products)
        ? flashSaleData.products.some((item) => item._id === product._id)
        : false;

    console.log(isInFlashSale);


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
    // handle Remove To Product
    const handleAddToFlashSale = async (productId) => {
        const flashData = {
            productId,
            userRole: userData?.role
        }
        try {
            await axios.patch(`https://gadget-shop-server-bay.vercel.app/add-flash-sale`, flashData)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Added to FLash Sale!");
                    refetch()
                } else {
                    toast.error(response.data.message);
                }
            })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    const handleRemoveFromFlashSale =async (productId) => {
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
                  toast.error("Product Removed!");
                  refetch()
                } else {
                  toast.error("⚠️ Failed to remove product. Please try again.");
                }
              })
              .catch((error) => {
                console.log(error);
              })
      
          } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
          }
    }


    return (
        <tr key={product?._id} className="hover:bg-gray-50">
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
            <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.price.toFixed(2)}৳
            </td>

            <td className="">
                {isInFlashSale ? (
                    <Button
                        onClick={() => handleRemoveFromFlashSale(product._id)}
                        className="bg-slate-200 text-red-700"
                    >
                        Remove
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleAddToFlashSale(product._id)}
                        className="bg-blue-400 text-white"
                    >
                        Add to
                    </Button>
                )}
            </td>
            <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="mr-4" title="Edit">
                    <PenLine size={22} className="text-blue-600" />
                </button>
                <button onClick={() => handleDeleteProduct(product._id)} className="mr-4" title="Delete">
                    <Trash2 size={22} className="text-rose-600" />
                </button>
            </td>
        </tr>
    )
}

export default ManageProductTable;
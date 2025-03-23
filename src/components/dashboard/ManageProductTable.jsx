/* eslint-disable react/prop-types */
import { PenLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "antd";
import { useDeleteProductMutation, useGetFlashProductsQuery, useGetMyUserDataQuery, useRemoveFlashProductMutation } from "../../redux/api/api";
import Swal from "sweetalert2";
import UpdateProductModal from "./UpdateProductModal";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ManageProductTable = ({ product }) => {
    const { data, refetch } = useGetFlashProductsQuery();
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();
    const [removeProduct] = useRemoveFlashProductMutation();
     const [isUpdateOpen, setUpdateOpen] = useState(false);
     const {user} = useAuth();
     const {data: userData} = useGetMyUserDataQuery(user?.email);

    // Check if data is an array or if it has products as an array
    const isInFlashSale = Array.isArray(data?.data?.products)
        ? data?.data?.products.some((item) => item?._id === product?._id)
        : false;

    // handle Remove To Product
    const handleDeleteProduct = async (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {  // Marked as async
            if (result.isConfirmed) {
                try {
                    const response = await deleteProduct(productId).unwrap();
                    if (response.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to delete the product.${error}}`,
                        icon: "error",
                    });
                }
            }
        });
    };

    // handle Remove To Product
    const handleAddToFlashSale = async (productId) => {
        const flashData = {
            productId,
            userRole: userData?.data?.role
        }
        try {
            await axios.patch(`http://localhost:5000/api/v1/flash-sale/add-product`, flashData)
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


    const handleRemoveFromFlashSale = async (productId) => {
        removeProduct(productId);
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
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.stock}
            </td>
            <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.price.toFixed(2)}৳
            </td>

            <td className="">
                {isInFlashSale ? (
                    <Button
                        onClick={() => handleRemoveFromFlashSale(product?._id)}
                        className="bg-slate-200 text-red-700"
                    >
                        Remove Item
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleAddToFlashSale(product?._id)}
                        className="bg-blue-400 text-white px-7"
                    >
                        Add Item
                    </Button>
                )}
            </td>
            <td className="whitespace-nowrap text-right text-sm font-medium">
                <Button 
                 onClick={() => setUpdateOpen(true)}
                className="mr-4" title="Edit">
                    <PenLine size={22} className="text-blue-600" />
                </Button>
                  {/* Update Flash Sale Modal  */}
              {isUpdateOpen && <UpdateProductModal
                onClose={() => setUpdateOpen(false)} product={product}
              />}
                <Button
                    onClick={() => handleDeleteProduct(product?._id)}
                    disabled={isLoading}
                    className="mr-4" title="Delete">
                    <Trash2 size={22} className="text-rose-600" />
                </Button>
            </td>
        </tr>
    )
}

export default ManageProductTable;
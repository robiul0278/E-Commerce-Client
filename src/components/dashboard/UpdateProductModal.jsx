/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProductMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProductModal = ({ onClose, product }) => {
    const modalRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(product?.image || "https://via.placeholder.com/100");
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Open the modal on mount
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            name: product?.name || "",
            price: product?.price || "",
            brand: product?.brand || "",
            category: product?.category || "",
            subCategory: product?.subCategory || "",
            stock: product?.stock || "",
            description: product?.description || "",
        },
    });

    // Watch image URL
    const imageUrl = watch("image");


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "GadgetShop");
        data.append("cloud_name", "dhnkviblq");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dhnkviblq/image/upload", data);
            setValue("image", res.data.secure_url);  // ✅
            setImagePreview(res.data.secure_url); // Update preview
            setUploading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload image. Try again.");
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            const updatedProduct = await updateProduct({ ...data, _id: product._id }).unwrap();
            toast.success("Product updated successfully!");

            // Reset the form with the new updated values
            // setImagePreview(updatedProduct.image || "https://via.placeholder.com/100");
            reset(updatedProduct);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product. Try again.");
        }
    };


    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box w-full max-w-7xl"> {/* Set max width */}
                <div className="flex">
                    <h2 className="text-xl text-gray-800 font-bold">Update Product</h2>
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                >


                    {/* Product Name */}
                    <div>
                        <label className="text-gray-800 text-sm block mb-2 text-start">Product Name</label>
                        <input
                            type="text"
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("name", { required: "Product name is required!" })}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="text-gray-800 text-sm block mb-2 text-start">Product Price</label>
                        <input
                            type="number"
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("price", { required: "Product price is required!" })}
                        />
                        {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                    </div>

                    {/* Brand Selection */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-sm block mb-2 text-start">Product Brand</label>
                        <select
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("brand", { required: "Product brand is required!" })}
                        >
                            <option value="">Select a Brand</option>
                            <option value="apple">Apple</option>
                            <option value="samsung">Samsung</option>
                            <option value="onePlus">OnePlus</option>
                            <option value="iqoo">IQOO</option>
                            <option value="sony">Sony</option>
                            <option value="pixel">Pixel</option>
                            <option value="poco">Poco</option>
                            <option value="motorola">Motorola</option>
                            <option value="goPro">Go Pro</option>
                            <option value="walton">Walton</option>
                            <option value="realme">Realme</option>
                            <option value="oppo">Oppo</option>
                            <option value="xiaomi">Xiaomi</option>
                            <option value="jbl">JBL</option>
                            <option value="huawei">Huawei</option>
                            <option value="anker">Anker</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.brand && <span className="text-red-500 text-xs">{errors.brand.message}</span>}
                    </div>

                    {/* Category Selection */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-sm block mb-2 text-start">Category</label>
                        <select
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("category", { required: "Product category is required!" })}
                        >
                            <option disabled value="">Select Category</option>
                            <option value="phones-tablets">Phones & Tablets</option>
                            <option value="laptop-desktop">Laptop & Desktop</option>
                            <option value="speaker-headphone">Speaker & Headphone</option>
                            <option value="power-accessories">Power & Accessories</option>
                            <option value="fitness-wearable">Fitness & Wearable</option>
                            <option value="smart-electronics">Smart Electronics</option>
                            <option value="peripherals">Peripherals</option>
                        </select>
                        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                    </div>

                    {/* Sub-category Selection */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-sm block mb-2 text-start">Sub-category</label>
                        <select
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("subCategory", { required: "Product sub-category is required!" })}
                        >
                            <option value="">Select sub-category</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="watch">Watch</option>
                            <option value="headphone">Headphone</option>
                            <option value="camera">Camera</option>
                            <option value="tablets">Tablets</option>
                            <option value="speaker">Speaker</option>
                            <option value="laptop">Laptop</option>
                            <option value="router">Router</option>
                            <option value="desktop">Desktop</option>
                            <option value="fan">Fan</option>
                            <option value="calculator">Calculator</option>
                            <option value="adapter">Adapter</option>
                            <option value="powerBank">Power Bank</option>
                            <option value="tws">TWS</option>
                            <option value="mouse">Mouse</option>
                            <option value="coverAndGlass">Cover & Glass</option>
                            <option value="smartTv">Smart TV</option>
                        </select>
                        {errors.subCategory && <span className="text-red-500 text-xs">{errors.subCategory.message}</span>}
                    </div>

                    {/* Stock Quantity */}
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-sm block mb-2 text-start">Stock Quantity</label>
                        <input
                            type="number"
                            className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                            {...register("stock", { required: "Stock quantity is required!" })}
                        />
                        {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
                    </div>
                    <div className="flex gap-5">
                        <div>
                            <label className="text-gray-800 text-sm block mb-2 text-start">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                            />
                            {uploading && <p className="text-xs text-[#49B2FF]">Uploading image...</p>}
                        </div>

                        {/* ✅ Show default image if no uploaded image is available */}
                        <img src={imageUrl || imagePreview} width="100" className="border" alt="Product Preview" />
                    </div>


                    {/* Product Description */}
                    <div className="col-span-full">
                        <label className="text-gray-800 text-sm block mb-2 text-start">Product Description</label>
                        <textarea
                            rows="6"
                            className="w-full rounded px-4 border border-gray-300 text-sm pt-3"
                            {...register("description", { required: "Product description is required!" })}
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-xs">Product description is required!</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                Updating...
                            </>
                        ) : "Update Product"}
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateProductModal;

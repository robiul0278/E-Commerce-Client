import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const {
        reset,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    // Watch image URL
    const imageUrl = watch("image");


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "GadgetShop");
        data.append("cloud_name", "dhnkviblq");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dhnkviblq/image/upload", data);
            setValue("image", res.data.secure_url);  // ✅
            setLoading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload image. Try again.");
            setUploading(false);
        }
    };


    const onSubmit = async (data) => {
        // Ensure image is a string URL before sending
        if (!data.image || typeof data.image !== "string") {
            toast.error("Please upload an image first.");
            return;
        }
        // console.log("Form Data:", data);
        // console.log("Image Type:", typeof data.image, "Value:", data.image);

        setUploading(true);
        const productData = {
            name: data.name,
            price: parseFloat(data.price),
            brand: data.brand,
            category: data.category,
            subCategory: data.subCategory,
            stock: parseFloat(data.stock),
            image: data?.image,
            description: data.description,
        };

        try {
            const response = await axios.post(
                "https://e-commerce-server-azure.vercel.app/api/v1/products/create",
                productData);
            if (response.data.success === true) {
                toast.success("Product added successfully!");
                setUploading(false);
                reset();
                // console.log("Product Response:", response);
            } else {
                toast.error("⚠️ Failed to add product. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }

    }
    return (
        <div className="font-[sans-serif]">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-xl font-semibold text-gray-900">Create Product</h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded">
                    <h2 className="text-xl text-gray-800 font-bold">Add New Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Product Name</label>
                            <input
                                type='text'
                                placeholder='Product Name'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("name", { required: "Product name is required !" })}
                            />
                            {errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Product Price</label>
                            <input
                                type='number'
                                placeholder='BDT'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("price", { required: "Product price is required !" })}
                            />
                            {errors.price && <span className='text-red-500 text-xs'>{errors.price.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Product Brand</label>
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
                            {errors.brand && <span className='text-red-500 text-xs'>{errors.brand.message}</span>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Category</label>
                            <select
                                defaultValue=""
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
                            {errors.category && <span className='text-red-500 text-xs'>{errors.category.message}</span>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Sub-category</label>
                            <select
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("subCategory", { required: "Product sub-category is required!" })}
                            >
                                <option value="">Select Sub Category</option>
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
                            {errors.subCategory && <span className='text-red-500 text-xs'>{errors.subCategory.message}</span>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm block mb-2">Stock Quantity</label>
                            <input
                                type='number'
                                placeholder='Product quantity'
                                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                                {...register("stock", { required: "Stock quantity is required!" })}
                            />
                            {errors.stock && <span className='text-red-500 text-xs'>{errors.stock.message}</span>}

                        </div>

                        <div className="flex gap-5">
                            <div>
                                <label className="text-gray-800 text-sm block mb-2">Upload Image</label>
                                <input
                                    type="file" accept="image/*" onChange={handleFileUpload}
                                    className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                                />
                                {loading && <p className="text-xs text-[#49B2FF]">Uploading image...</p>}
                                {/* Image Preview */}
                            </div>
                            {imageUrl ? <img src={imageUrl} width="100" className="border" /> : <></>}

                        </div>
                        <div className="col-span-full">
                            <label className="text-gray-800 text-sm block mb-2">Product Description</label>
                            <textarea
                                placeholder='description.....'
                                rows="6"
                                className="w-full rounded px-4 border border-gray-300 text-sm pt-3"
                                {...register("description", { required: true })}
                            ></textarea>
                            {errors.description && <span className='text-red-500 text-xs'>Product description is required !</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Uploading...
                                </>
                            ) : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
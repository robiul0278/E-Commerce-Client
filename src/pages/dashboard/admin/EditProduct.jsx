/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditProduct = ({ modalProduct, latestData, setLatestData }) => {
  const { _id, title, brand, category, description, image, price, stock } = modalProduct;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("", data);

    const title = data.title;
    const brand = data.brand;
    const price = parseFloat(data.price);
    const image = data.image;
    const stock = parseFloat(data.stock);
    const category = data.category;
    const description = data.description;

    const productData = { title, description, price, image, category, stock, brand };

    // Add product to database
    const token = localStorage.getItem("access-token");

    axios.put(`http://localhost:5000/update-product/${_id}`, productData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.message === "Product updated successfully!") {
          toast.success('Product updated successfully!');
          setLatestData(!latestData); // Refresh data or trigger a re-render
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to update product.');
      });
  }

  const handleModalCancel = () => {
    setLatestData(!latestData);
  }

  return (
    <div>
      <div className="font-[sans-serif] m-6 max-w-4xl mx-auto">
        <div className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 shadow-sm rounded-md">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
                Edit Product
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Fill in the details to add a new product to your store.
              </p>
            </div>
            {/* Optional Action Buttons */}
            <div className="mt-4 sm:mt-0 flex space-x-3">
            </div>
          </div>
        </div>
        {/* ok */}
      </div>
      <div className="p-6">
        <form form onSubmit={handleSubmit(onSubmit)} className="font-[sans-serif] m-6 max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Title</label>
                <input type="text" placeholder="Enter title"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={title}  {...register("title", { required: true })}
                />
                {errors.title && <span className='text-red-500'>Title is required !</span>}
              </div>
            </div>

            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Brand</label>
                <input type="text" placeholder="Enter brand name"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={brand}   {...register("brand", { required: true })}
                />
                {errors.brand && <span className='text-red-500'>Brand is required !</span>}
              </div>
            </div>

            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Price</label>
                <input type="number" placeholder="Enter product price"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={price}   {...register("price", { required: true })}
                />
                {errors.price && <span className='text-red-500'>Price is required !</span>}
              </div>
            </div>
            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Image</label>
                <input type="url" placeholder="Enter image URL"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={image}   {...register("image", { required: true })}
                />
                {errors.image && <span className='text-red-500'>Image is required !</span>}
              </div>
            </div>

            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Stock</label>
                <input type="number" placeholder="Enter product quantity"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={stock}  {...register("stock", { required: true })}
                />
                {errors.stock && <span className='text-red-500'>Stock is required !</span>}
              </div>
            </div>
            <div className="relative flex items-center">
              <div>
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Category</label>
                <input type="text" placeholder="Enter product category"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={category}   {...register("category", { required: true })}
                />
                {errors.category && <span className='text-red-500'>Category is required !</span>}
              </div>
            </div>
            <div className="relative flex items-center sm:col-span-2">
              <div className="w-full">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Description</label>
                <textarea placeholder='Type product description' rows="4"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none" defaultValue={description} {...register("description", { required: true })}
                />
                {errors.description && <span className='text-red-500'>Description is required !</span>}
              </div>
            </div>
          </div>

          <button type="submit"
            className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">Update Product</button>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={handleModalCancel} className="btn">Close</button>
            </form>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default EditProduct;
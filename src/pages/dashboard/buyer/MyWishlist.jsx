import axios from "axios";
import { useEffect, useState } from "react";
import useUserData from './../../../hooks/useUserData';
import Loading from "../../Loading";
import toast, { Toaster } from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";

const MyWishlist = () => {
  const userData = useUserData()
  const [wishlist, setWishlist] = useState();
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(true);
  const token = localStorage.getItem("access-token")

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      await axios.get(`https://gadget-shop-server-bay.vercel.app/wishlist/${userData?._id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        setWishlist(res.data)
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching wishlist:", error)
      })
    }
    // Fix the condition to check both userData and token
    if (userData?._id && token) {
      fetchWishlist()
    }
  }, [userData, token, latestData])

  // handle Remove To Wishlist
  const handleRemoveToWishlist = async (productId) => {
    // console.log("Product Id", productId)
    if (!userData?.email) {
      toast.error('Please log in to add to wishlist');
      return;
    }
    await axios.patch('https://gadget-shop-server-bay.vercel.app/remove-wishlist',
      {
        userEmail: userData?.email,
        productId: productId,
      }
    )
      .then(res => {
        if (res.data.modifiedCount) {
          toast.success('Remove to wishlist successfully!');
          setLatestData(!latestData);
        }
      })
      .catch(error => {
        toast.error('Failed to add to wishlist');
        console.error(error);
      });
  };

  return (
    <>
      {
        loading ?
          (<Loading />
          ) : (
            <div className="overflow-x-auto container mx-auto">
              <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                <thead>
                  <tr className="bg-[#0095FF] text-white">
                    <th className="py-4 px-6 text-left border-b">Product Image</th>
                    <th className="py-4 px-6 text-left border-b">Product Name</th>
                    <th className="py-4 px-6 text-left border-b">Price</th>
                    <th className="py-4 px-6 border-b text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    wishlist?.length > 0 ? (
                      wishlist?.map((product) => {
                        return (
                          <tr key={product?._id} className="hover:bg-gray-50 border-b transition duration-300">
                            <td className="py-4 px-4 flex justify-start">
                              <img src={product?.image} alt="table navigate ui" className="h-16 w-16 object-cover bg-gray-300" />
                            </td>
                            <td className="py-4 px-6 border-b text-sm font-medium">{product?.title}</td>
                            <td className="py-4 px-6 border-b text-sm font-medium">{product?.price}</td>
                            <td className="py-4 px-6 border-b text-end">
                              <button onClick={() => handleRemoveToWishlist(product._id)} className="hover:scale-110 scale-100 text-orange-700 text-2xl font-bold transition-all duration-100 py-2 px-4 rounded-md"><CiCircleRemove /></button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr className="flex justify-center items-center w-full h-64">
                        <td>Empty!</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <Toaster />
            </div>
          )
      }
    </>

  )
}

export default MyWishlist;

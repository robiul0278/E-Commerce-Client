import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access-token");

  const email = user?.email;

  const { data: wishlist = [], isLoading, refetch } = useQuery({
    queryKey: 'wishlist', email,
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${email}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    }
  })

  return [wishlist, isLoading, refetch];
}

export default useWishlist;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

const useCart = () => {
    const userData = useUserData();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem("access-token");

    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart', userData?._id],
        enabled: !!userData?._id,
        queryFn: async () => {
            console.log("Fetching Cart Data...");
            const res = await axiosSecure.get(`/cart/${userData._id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        }
    });

    return [cart, isLoading, refetch];
};
export default useCart;

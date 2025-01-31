import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem("access-token");

    const email = user?.email;

    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${email}`, {
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

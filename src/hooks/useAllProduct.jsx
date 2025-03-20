import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProduct = (searchTerm, sort,limit, page, brand) => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products", searchTerm, sort, limit, page, brand], // Include dependencies
        queryFn: async () => {
            const res = await axiosSecure.get("/products", {
                params: {searchTerm, sort, limit, page, brand}
            });
            return res.data;
        },
        keepPreviousData: true, // Optional: Prevents UI flickering during refetch
    });

    return [products, isLoading, refetch];
};

export default useAllProduct;

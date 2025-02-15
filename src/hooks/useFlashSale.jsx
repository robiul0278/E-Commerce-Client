import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFlashSale = () => {
    const axiosSecure = useAxiosSecure();

    const { data: flashSaleData = [], isLoading, error, refetch } = useQuery({
        queryKey: ["flash-sale"],
        queryFn: async () => {
                const res = await axiosSecure.get("/flash-sale");
                return res.data;
        },
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    return [ flashSaleData, isLoading, error, refetch ];
};

export default useFlashSale;

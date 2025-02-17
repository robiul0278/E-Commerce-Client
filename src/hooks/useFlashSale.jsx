import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFlashSale = (search, page , limit ) => {
    const axiosSecure = useAxiosSecure();

    const { data: flashSaleData = {}, isLoading, refetch } = useQuery({
        queryKey: ["flash-sale", search, page, limit], // Ensure re-fetching on change
        queryFn: async () => {
            const res = await axiosSecure.get("/flash-sale", {
                params: { search, page, limit },
            });
            return res.data;
        },
    });

    return [ flashSaleData, isLoading, refetch ];
};

export default useFlashSale;

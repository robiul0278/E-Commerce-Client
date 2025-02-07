import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProduct = () => {
    const axiosSecure = useAxiosSecure();
const {data: products=[], isLoading, refetch} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
        const res = await axiosSecure.get("/all-product");
        return res.data;
    }
})
return [products, isLoading, refetch];
}

export default useProduct;
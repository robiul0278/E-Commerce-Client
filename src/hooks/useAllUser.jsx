import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem("access-token");


    const { data: allUser = [], isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        }
    });

    return [allUser, isLoading, refetch];
};
export default useAllUser;

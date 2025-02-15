import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

const useMyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access-token");
  const [userData] = useUserData();
  const id = userData?._id;

  const { data: myOrder = {}, isLoading, refetch } = useQuery({
    queryKey: ["my-order", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-order/${id}`,{
        headers: {
          authorization: `Bearer ${token}`,
      },
      });
      return res.data;
    },
  });

  return [myOrder, isLoading, refetch];
};

export default useMyOrder;
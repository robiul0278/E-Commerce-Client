import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access-token");
  const { user } = useAuth();
  const email = user?.email;

  const { data: userData = {}, isLoading, refetch } = useQuery({
    queryKey: ["user", email],
    enabled: !!email,
    refetchInterval: 3000, // Fetch data every 2 seconds
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`,{
        headers: {
          authorization: `Bearer ${token}`,
      },
      });
      return res.data;
    },
  });
  return [userData, isLoading, refetch];
};

export default useUserData;
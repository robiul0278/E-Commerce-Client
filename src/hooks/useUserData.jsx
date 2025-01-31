import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const { data: userData = {}, isLoading, refetch } = useQuery({
    queryKey: ['user', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`, {
        headers: {
          "Cache-Control": "no-cache" 
        }
      });
      return res.data;
    }
  })
  return [userData, isLoading, refetch];
}

export default useUserData;
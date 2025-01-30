import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: `https://gadget-shop-server-bay.vercel.app` ,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

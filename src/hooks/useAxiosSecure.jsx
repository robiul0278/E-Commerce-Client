import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000/api/v1` ,
  // baseURL: `https://gadget-shop-server-bay.vercel.app` ,
});

const useAxiosSecure = () => {
  const token = localStorage.getItem("access-token");

  // Adding the token to the headers
  axiosSecure.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;

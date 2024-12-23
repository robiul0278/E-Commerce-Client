import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useUserData = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`https://gadget-shop-server-bay.vercel.app/user/${user.email}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (user?.email && !loading) {
      fetchUserData();
    }
  }, [user, loading]);

  return userData;
};

export default useUserData;

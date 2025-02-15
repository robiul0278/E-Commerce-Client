import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";


const GoogleLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { GoogleLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        setLoading(true);
        GoogleLogin()
            .then((result) => {
                const user = result.user; // Get the logged-in user data
                const authData = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user",
                    createdAt: new Date(),
                };

                // Send user data to backend
                axios.post("https://gadget-shop-server-bay.vercel.app/user", authData)
                    .then((res) => {
                        if (res.data.insertedId) {
                            const from = location.state?.from || '/';
                            navigate(from);
                            window.scrollTo({ top: 0, behavior: "smooth" })
                            toast.success('Login successful!');
                        }
                    })
                    .catch((err) => {
                        if (err.response && err.response.status === 409) {
                            // User already exists, just login
                            const from = location.state?.from || '/';
                            navigate(from);
                            window.scrollTo({ top: 0, behavior: "smooth" })
                            toast.success("Welcome back!");
                        } else {
                            console.error("Axios Error:", err);
                            toast.error("Failed to save user data!");
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            })
            .catch((error) => {
                console.error("Google Login Error:", error);
                toast.error(error.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
            </div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none">
                {loading ? (
                    <>
                        <span className="loading loading-spinner"></span> Logging in...
                    </>
                ) : (
                    <>
                        <FcGoogle /> Login with Google
                    </>
                )}
            </button>
        </div>

    )
}

export default GoogleLogin;
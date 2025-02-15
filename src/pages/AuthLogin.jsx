/* eslint-disable no-unused-vars */
import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import GoogleLogin from "../components/GoogleAuth/GoogleLogin";

const AuthLogin = () => {
    const { LoginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        setLoading(true);
        const email = data.email;
        const password = data.password;

        try {
            LoginUser(email, password)
                .then(() => {
                    toast.success('Login Successful!')
                    setLoading(false);
                    const from = location.state?.from || '/';
                    navigate(from);
                })
                .catch((firebaseError) => {
                    // console.error("Firebase Error:", firebaseError);
                    toast.error(firebaseError.message); // Display Firebase error message
                    setLoading(false);
                });
        } catch (error) {
            // console.error('Firebase login error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="font-[sans-serif] bg-gray-50">
            <div className="flex items-center lg:gap-10 py-16">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 max-w-md w-full p-6 mx-auto space-y-5">
                    <div className="mb-12">
                        <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                        <Link to="/register" className="text-gray-800 text-sm mt-6">Dont have an account <a href="javascript:void(0);" className="text-[#297cb8] font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></Link>
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Email</label>
                        <div className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                {...register("email", { required: true })}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 p-2 z-50">
                            <CiMail className="w-5 h-5"/>
                            </span>
                        </div>
                        {errors.email && <span className='text-red-500 font-mono text-sm'>Email is required !</span>}
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Password</label>
                        <div className="relative flex items-center">
                            <input
                                // type="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: { value: 8, message: "Password must be at least 8 characters!" },
                                    validate: {
                                        hasUpperCase: (value) =>
                                            /[A-Z]/.test(value) || "Password must include at least one uppercase letter!",
                                        hasLowerCase: (value) =>
                                            /[a-z]/.test(value) || "Password must include at least one lowercase letter!",
                                        hasNumber: (value) =>
                                            /[0-9]/.test(value) || "Password must include at least one number!",
                                        hasSpecialChar: (value) =>
                                            /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must include at least one special character!",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 p-2 z-50"
                                onClick={togglePassword}
                            >
                                {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                            </button>

                        </div>
                        {errors.password && (
                            <span className="text-red-500 font-mono text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div></div>
                        <div>
                            <a href="jajvascript:void(0);" className="text-[#297cb8] font-semibold hover:underline text-xs text-end">
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-5 text-sm tracking-wide rounded-md text-white bg-[#49B2FF] hover:bg-[#297cb8] transition duration-300 focus:outline-none"
                        >
                            {!loading ? "Sign in" : "Wait..."}
                        </button>
                    </div>



                    <GoogleLogin />
                </form>
            </div>
        </div>
    )
}

export default AuthLogin;
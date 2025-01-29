/* eslint-disable no-unused-vars */
import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

const AuthLogin = () => {
    const { LoginUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


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
                    navigate('/');
                })
        } catch (error) {
            console.error('Firebase login error:', error);
        }
    };

    return (
        <div className="font-[sans-serif] bg-gray-50">
            <div className="flex items-center lg:gap-10 py-16">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 max-w-md w-full p-6 mx-auto space-y-5">
                    <div className="mb-12">
                        <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
                        <Link to="/register" className="text-gray-800 text-sm mt-6">Dont have an account <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></Link>
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
                            <CiMail className="w-[18px] h-[18px] text-gray-800 absolute right-2 cursor-pointer" />
                        </div>
                        {errors.email && <span className='text-red-500 font-mono text-sm'>Email is required !</span>}
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type="password"
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
                            <IoEyeOutline className="w-[18px] h-[18px] text-gray-800 absolute right-2 cursor-pointer" />
                        </div>
                        {errors.password && (
                            <span className="text-red-500 font-mono text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label className="text-gray-800 ml-3 block text-sm">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a href="jajvascript:void(0);" className="text-blue-600 text-sm font-semibold hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2.5 px-5 text-sm tracking-wide rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none"
                        >
                            {!loading ? "Sign in" : "Wait..."}
                        </button>
                    </div>


                    <div className="my-4 flex items-center gap-4">
                        <hr className="w-full border-gray-300" />
                        <p className="text-sm text-gray-800 text-center">or</p>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button type="button" className="w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none">
                        <FcGoogle size={22} />
                        Continue with google
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthLogin;
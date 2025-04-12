import { CiMail } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const AuthRegister = () => {
    const { RegisterUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // State to store error message
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);

        const email = data.email;
        const password = data.password;

        const userData = {
            name: data.name,
            email: data.email,
        }

        RegisterUser(email, password)
            .then(() => {
                axios.post("https://e-commerce-server-azure.vercel.app/api/v1/user/create-user", userData)
                    .then((res) => {
                        console.log(res);
                        if (res.data.success === true) {
                            toast.success('Login successful!');
                            setLoading(false);
                            navigate('/');
                        }
                    })
                    .catch((err) => {
                        console.error("Axios Error:", err);
                        toast.error("Failed to save user data!");
                        setLoading(false);
                    });
            })
            .catch((firebaseError) => {
                // console.error("Firebase Error:", firebaseError);
                toast.error(firebaseError.message); // Display Firebase error message
                setLoading(false);
            });


    };
    return (
        <div className="font-[sans-serif] bg-gray-50">
            <div className="flex items-center lg:gap-10 py-16">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 max-w-md w-full p-6 space-y-5 mx-auto">
                    <div className="mb-12">
                        <h3 className="text-gray-800 text-4xl font-extrabold">Register</h3>
                        <Link to="/login" className="text-gray-800 text-sm mt-6">You have an account <a href="javascript:void(0);" className="text-[#49B2FF] font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a></Link>
                    </div>
                    {/* Name  */}
                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Full Name</label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                {...register("name", { required: true })}
                            />
                        </div>
                        {errors.name && <span className='text-red-500 font-mono text-sm'>Name is required !</span>}
                    </div>
                    {/* Email  */}
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
                                <CiMail className="w-5 h-5" />
                            </span>
                        </div>
                        {errors.email && <span className='text-red-500 font-mono text-sm'>Email is required !</span>}
                    </div>
                    {/* Password  */}
                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: { value: 8, message: "Password must be at least 8 characters!" },
                                    validate: (value) => {
                                        if (!/[A-Z]/.test(value)) {
                                            return "Password must include at least one uppercase letter!";
                                        }
                                        if (!/[a-z]/.test(value)) {
                                            return "Password must include at least one lowercase letter!";
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return "Password must include at least one number!";
                                        }
                                        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                                            return "Password must include at least one special character!";
                                        }
                                        return true;
                                    }
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
                    {/* Confirm Password  */}
                    <div>
                        <label className="text-gray-800 text-sm block mb-2">Confirm Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required!",
                                    validate: (value) => {
                                        if (watch("password") && watch("password") !== value) {
                                            return "Passwords do not match!";
                                        }
                                        return true;
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 p-2 z-50"
                                onClick={toggleConfirmPassword}
                            >
                                {showConfirmPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <span className="text-red-500 font-mono text-sm">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="w-full py-2.5 px-5 text-sm tracking-wide rounded-md text-white bg-[#49B2FF] hover:bg-[#297cb8] transition duration-300 focus:outline-none"
                        >
                            {!loading ? "Register" : "Wait..."}
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

export default AuthRegister;
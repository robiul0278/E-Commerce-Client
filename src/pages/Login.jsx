/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogin from "../components/GoogleAuth/GoogleLogin";
const Login = () => {
    const { LoginUser } = useAuth();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;

        try {
            LoginUser(email, password)
                .then(() => {
                    toast.success('Login Successful!')
                    navigate('/');
                })
        } catch (error) {
            console.error('Firebase login error:', error);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row justify-between px-36">
                    <div className="w-2/4">
                        <div className="pb-5">
                            <h1 className="font-bold text-3xl">Please Login</h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body -mb-8">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-sm input-bordered"  {...register("email", { required: true })}
                                    />
                                    {errors.email && <span className='text-red-500 font-mono'>Email is required !</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-sm input-bordered"
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

                                    {errors.password && (
                                        <span className="text-red-500 font-mono">{errors.password.message}</span>
                                    )}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>




                                <div className="form-control pb-5">
                                    <button type="submit" className="btn btn-primary btn-sm">Login</button>
                                </div>
                            </form>
                            <GoogleLogin />
                        </div>
                    </div>
                    <div className="text-center px-10 w-2/4">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">
                            Registering for this site allows you to access your order status and history. Just fill in the fields below, and well get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.
                        </p>
                        <Link to="/register">
                            <button className="btn btn-outline">
                                Register
                            </button>
                        </Link>
                        <Toaster />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
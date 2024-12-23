import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import GoogleLogin from '../components/GoogleAuth/GoogleLogin';
import axios from 'axios';

const Register = () => {
    const { RegisterUser } = useAuth();
    const navigate = useNavigate();
    // State to store error message


    // console.log(auth);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        const role = data.role;
        const status = role === "buyer" ? "approved" : "pending";
        const wishlist = []
        const cart = []

        const userData = { email, password, role, status, wishlist, cart };

        try {
            RegisterUser(email, password)
                .then(() => {
                    axios.post("https://gadget-shop-server-bay.vercel.app/user", userData)
                        .then((res) => {
                            console.log(res)
                            if (res.data.insertedId) {
                                toast.success('Register successful!');
                                navigate('/');
                            }
                        })
                });
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content grid md:grid-cols-2 justify-between px-36">
                <div>
                    <div className="pb-5">
                        <h1 className="font-semibold text-3xl">Please Register</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm">
                        <form form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Email" className="input input-sm  input-bordered"
                                    {...register("email", { required: true })}
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
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="Confirm Password" className="input input-sm input-bordered"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => {
                                            if (watch('password') != value) {
                                                return 'Passwords do not match';
                                            }
                                        }
                                    })}
                                />
                                {errors.confirmPassword && (<span className='text-red-500 font-mono'>Both password must match!</span>)}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Role</span>
                                </label>
                                <select type="select" className="input input-bordered select-sm"
                                    {...register("role", { required: true })}

                                >
                                    <option value="buyer" selected>Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                                {errors.role && <span className='text-red-500'>Role is required !</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <button type="submit" className="btn btn-primary btn-sm">Register</button>
                            </div>
                        </form>

                        <GoogleLogin />
                    </div>
                </div>
                <div className="text-center px-10">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6">
                        Registering for this site allows you to access your order status and history. Just fill in the fields below, and well get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.
                    </p>
                    <Link to="/login">
                        <button className="btn btn-outline">
                            Login
                        </button>
                    </Link>
                    <Toaster />
                </div>
            </div>
        </div>
    )
}

export default Register;
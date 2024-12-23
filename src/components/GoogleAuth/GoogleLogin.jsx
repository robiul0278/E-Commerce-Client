import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc";


const GoogleLogin = () => {
    const navigate = useNavigate();
    const {GoogleLogin}= useAuth();

    const handleGoogleLogin = () => {
        GoogleLogin().then(() => {
            navigate("/");
        });
        
    }
  return (
<div className="card-body -mt-5">
<div>
<div className="divider -my-5">OR</div>
</div>
    <div className="flex justify-center">
        <button className="btn btn-outline btn-sm w-full" onClick={handleGoogleLogin}>
        <FcGoogle /> Login with Google
        </button>
    </div>
</div>
  )
}

export default GoogleLogin;
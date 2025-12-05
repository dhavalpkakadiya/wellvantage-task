import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo02 from "../../assets/svg/logo02.svg"
import logo from "../../assets/svg/logo.svg"
import { GoogleLogin } from '@react-oauth/google';
import { apiService } from "../../services/axios";
import { setAccessToken } from "../../common";
import Spinner from "../../component/common/loader";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentialResponse) => {
    try {
      setLoading(true); 
      setError(null);

      const token = credentialResponse.credential;
      const response = await apiService.post('/auth/google', { token });
      if (response.data?.data?.accessToken) {
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        setAccessToken(response.data?.data?.accessToken);
      }
      if (response.data.data) {
        localStorage.setItem('userData', JSON.stringify(response.data.data));
      }

      toast.success(response.data.message);

      if (response.data.data?.hasGym) {
        navigate('/dashboard');
      } else {
        navigate('/Details');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="relative h-[4rem]  md:h-full md:w-[45%] w-full bg-[#28A745] flex flex-col justify-center items-center px-3 md:px-10 lg:py-12">
        <button
          className="absolute top-4 left-6 text-2xl lg:top-6 lg:left-6 lg:text-3xl hover:text-gray-200"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <div className="flex justify-center">
          <img src={logo}
            alt="logo"
            className="block md:hidden object-contain w-[12rem] h-[12rem]" />
          <img src={logo02}
            alt="logo"
            className="hidden md:block object-contain md:w-[272px] md:h-[272px] md:mt-10" />
        </div>
      </div>

      <div className="flex flex-col p-3 w-full mt-[5rem] md:mt-[2rem] items-center justify-center md:w-[55%] md:p-6">
        <div className="text-[31px] font-semibold">Sign Up</div>
        <div className="mt-[25px] text-[25px] text-center font-semibold">Welcome! Manage, Track and Grow your Gym with Wellvantage.</div>
        <div className="flex flex-col items-center gap-4 md:mt-[10rem] mt-[5rem]">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
          {loading ? (
            <Spinner size={48} />
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={handleLoginError}
              theme="outline"
              size="large"
              width="300"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;

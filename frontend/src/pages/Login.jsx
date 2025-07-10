import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import { TodoContext } from "../context/TodoContext";

const Login = (props) => {
  const { setUserName } = props;
  const { setIsAuthen } = useContext(TodoContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Sign Up");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotPassword) {
      setIsLoading(true);

      try {
        const res = await axios.post(`${backendUrl}/api/auth/forgot-password`, {
          email,
        });
        toast.success("Password reset email sent successfully!");

        const resetToken = res.data.token;

        navigate(`/reset-password/${resetToken}`);

        setForgotPassword(false);
      } catch (error) {
        toast.error("Failed to send password reset email");
      } finally {
        setIsLoading(false);
      }
    } else {
      const url =
        currentState === "Login"
          ? `${backendUrl}/api/auth/login`
          : `${backendUrl}/api/auth/register`;

      const data =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      try {
        const res = await axios.post(url, data);

        if (currentState === "Login") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", res.data.name);

          setUserName(res.data.name);
          setIsAuthen(true);
          navigate("/active");

          toast.success("Logged in successfully");
        } else {
          toast.success("Registered successfully!");
          setCurrentState("Login");
        }
      } catch (error) {
        if (error.message && error.response.status === 400) {
          if (error.response.data === "Email already exists") {
            toast.warn("This email already exists");
          } else {
            toast.error("Wrong Password or Email");
          }
        } else {
          toast.error("Wrong Password or Email");
        }
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {forgotPassword ? "Forgot Password" : currentState}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Shown when Forgot Password */}
          {forgotPassword && (
            <div className="mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
              <input
                type="email"
                value={email}
                placeholder="your@.com"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                required
              />
            </div>
          )}

          {/* Show Login/ Sign Up */}
          {!forgotPassword && (
            <>
              {currentState === "Sign Up" && (
                <div className="mb-3 min-w-72">
                  <p className="text-sm font-medium text-gray-700 mb-2">Name</p>
                  <input
                    type="text"
                    value={name}
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                    required
                  />
                </div>
              )}
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  required
                />
              </div>

              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </p>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  required
                />
              </div>
            </>
          )}

          <div className="w-full flex justify-between text-sm mt-4">
            {!forgotPassword ? (
              <>
                <p
                  className="cursor-pointer hover:text-yellow-700"
                  onClick={() => setForgotPassword(true)}
                >
                  Forgot your password?
                </p>

                {currentState === "Login" ? (
                  <p
                    className="cursor-pointer hover:text-yellow-700"
                    onClick={() => setCurrentState("Sign Up")}
                  >
                    Create Account
                  </p>
                ) : (
                  <p
                    className="cursor-pointer hover:text-yellow-700"
                    onClick={() => setCurrentState("Login")}
                  >
                    Login Here
                  </p>
                )}
              </>
            ) : (
              <p
                onClick={() => setForgotPassword(false)}
                className="cursor-pointer hover:text-yellow-700"
              >
                Back to Login
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 w-full py-2 px-4 rounded-md text-white cursor-pointer ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
          >
            {forgotPassword
              ? isLoading
                ? "Sending"
                : "Reset Password"
              : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { backendUrl } from "../App";

const ResetPassword = () => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function resetPassword(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    const resetToken = token;

    try {
      const res = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        token: resetToken,
        newPassword: newPassword,
      });

      toast.success(res.data);
      navigate("/Login");
      
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warn("Invalid or expired token. Please request a new one.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>

      <form
        onSubmit={resetPassword}
        className="w-full max-w-md bg-gray-100 p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

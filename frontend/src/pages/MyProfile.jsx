import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

import TodoBlock from "../components/TodoBlock";

const MyProfile = (props) => {
  const { setUserName } = props;

  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({ _id: "", name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  async function fetchUserInfo() {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);

    } catch (error) {
      toast.error("Cannot fetch info");
    }
  }

  async function fetchTodosByUser() {
    try {
      const res = await axios.get(`${backendUrl}/api/todos/todobyuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(res.data);
      
    } catch (error) {
      toast.error("Error fetching list todos");
    }
  }

  async function profileUpdate() {
    try {
      const res = await axios.put(
        `${backendUrl}/api/auth/updateuser/${user._id}`,
        {
          name: user.name,
          email: user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data);
      localStorage.setItem("userName", res.data.name);
      setUserName(res.data.name);

      toast.success("Update successfully");
    } catch (error) {
      toast.error("Failed to update");
    }
  }

  async function changePassword() {
    try {
      await axios.put(
        `${backendUrl}/api/auth/changepassword/${user._id}`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` }, }
      );

      toast.success("Change password successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const message = error.response?.data;

      if (message === "Old Password not correct") {
        toast.error("Old password is incorrect");
      } else if (message === "Confirm password not match") {
        toast.error("New password and confirm password do not match");
      } else {
        toast.error("Failed to change password");
      }
    }
  }

  const now = new Date();

  const overdueTasks = todos.filter((todo) => {
    const taskTime = new Date(`${todo.date}T${todo.time}`);
    return taskTime < now && todo.active;
  });

  const activeTasks = todos.filter((todo) => todo.active);
  const completedTasks = todos.filter((todo) => !todo.active);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user._id) {
      fetchTodosByUser();
    }
  }, [user._id]);

  return (
    <div className="max-w-3xl my-0 mx-auto">
      {/* Show User Todo List */}
      <section className="my-10">
        <h1 className="font-extrabold text-2xl text-gray-900 mb-6 text-center gap-2">
          📋 Todo Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 overflow-y-auto">
          <TodoBlock title="All Tasks" list={todos} />
          <TodoBlock title="🟢 Active" list={activeTasks} />
          <TodoBlock title="✅ Completed" list={completedTasks} />
          <TodoBlock title="⏰ Overdue" list={overdueTasks} />
        </div>
      </section>

      {/* Update Profile */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">
          Update Profile
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={profileUpdate}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-200 cursor-pointer"
          >
            Save
          </button>
        </div>
      </section>

      {/* Change Password */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4">Change Password</h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-semibold">
              Old Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              required
              className="border rounded-md p-1"
            />
          </div>

          <div>
            <label className="block font-semibold">
              New Password <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              required
              className="border rounded-md p-1"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              required
              className="border rounded-md p-1"
            />
          </div>
        </div>

        <button
          onClick={changePassword}
          disabled={
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
          }
          className={`px-6 py-2 mt-3 text-white font-semibold rounded-md ${
            !passwordData.oldPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 hover:bg-gray-700 cursor-pointer"
          }`}
        >
          Change Password
        </button>
      </section>
    </div>
  );
};

export default MyProfile;

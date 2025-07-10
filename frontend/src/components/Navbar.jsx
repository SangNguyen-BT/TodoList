import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TodoContext } from "../context/TodoContext";
import reactLogo from "../assets/react.svg"

const Navbar = (props) => {
  const { userName, setUserName } = props;
  const { setIsAuthen } = useContext(TodoContext);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");

    setIsAuthen(false)
    setUserName(null);
    navigate("/all");
  }

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || null);
  }, [setUserName]);

  return (
    <nav className="max-w-7xl my-0 mx-auto p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to={"/all"} className="flex items-center gap-2">
          <img src={reactLogo} alt="logo" className="h-8 w-8" />
          <div className="flex flex-col leading-none font-semibold text-sm md:text-lg text-black">
            <span>My</span>
            <span>Tasks</span>
          </div>
        </Link>

        {/* Login section */}
        {userName ? (
          <div>
            <button
              className="text-white font-bold rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm transition-all focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none ml-4 cursor-pointer"
              onClick={() => setIsDropdownVisible(prev => !prev)}
            >
              Welcome {userName}
            </button>

            {isDropdownVisible && (
              <div className="absolute mt-2 ml-11 w-30 bg-white text-black rounded-md shadow-md">
                <Link
                  to={"/profile"}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  My Profile
                </Link>
                <p
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to={"/Login"}
            className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-full font-semibold cursor-pointer"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

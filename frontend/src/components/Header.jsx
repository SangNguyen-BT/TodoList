import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";

const Header = () => {
  const { input, handleChange, handleSubmitForm, date, time } = useContext(TodoContext);

  return (
    <div className="text-center font-semibold pt-8">
      <h1 className="text-3xl mb-3">Keep Track Of Your Work</h1>

      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col sm:flex-row items-center gap-3 shadow-md rounded-lg p-4 bg-gray-100 max-w-xl mx-auto w-full"
      >
        <input
          type="text"
          placeholder="Add New Task"
          name="input"
          value={input}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          type="date"
          name="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none"
        />
        <input
          type="time"
          name="time"
          value={time}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none"
        />

        <button className="py-2.5 px-3.5 bg-[#61d18c] rounded-lg font-extrabold cursor-pointer">
          Add
        </button>
      </form>

      <ul className="flex justify-around items-center gap-5 my-8 mx-0 text-gray-900 font-extrabold">
        <NavLink to={"/all"} className="flex flex-col items-center gap-1">
          <p>All Tasks</p>
          <hr className="bg-blue-700 w-[50%] h-1 hidden" />
        </NavLink>
        <NavLink to={"/active"} className="flex flex-col items-center gap-1">
          <p>Active Tasks</p>
          <hr className="bg-blue-700 w-[50%] h-1 hidden" />
        </NavLink>
        <NavLink to={"/completed"} className="flex flex-col items-center gap-1">
          <p>Completed</p>
          <hr className="bg-blue-700 w-[50%] h-1 hidden" />
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;

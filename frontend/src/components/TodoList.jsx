import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useState, useContext } from "react";

import { TodoContext } from "../context/TodoContext";

const TodoList = (props) => {
  const { todos = [], toggleTodo, deleteTodo, updateTodo, allowEdit = true, disableToggle} = props;
  const {isAuthen, isToday} = useContext(TodoContext)
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  
  return (
    <div className="w-full max-w-3xl mx-auto my-4">
      {todos.length > 0 ? (
        todos.map((todo, index) => {

          const id = isAuthen ? todo._id : index

          return (
            <div
              key={id}
              className="flex items-center justify-between bg-white shadow-sm p-3 rounded-lg hover:shadow-md transition duration-200 mb-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!todo.active}
                  onChange={() => toggleTodo(id)}
                  disabled={disableToggle}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
                <div
                  className={`text-lg ${
                    todo.active ? "text-gray-800" : "line-through text-gray-600"
                  }`}
                >
                  <div className="flex gap-4 justify-around text-gray-800 font-mono">
                    <span className="flex items-center gap-1 text-blue-600">
                      <FaCalendarAlt />
                      {isToday(todo.date) ? "Today" : todo.date}
                    </span>

                    <span className="flex items-center gap-1 text-green-600">
                      <MdOutlineTimer />
                      {todo.time}
                    </span>
                  </div>
                  <p className="text-xl font-medium text-red-500">
                    {todo.text}
                  </p>
                </div>
              </div>

              {/* Edit Todo Button*/}
              <div className="flex gap-4">
                {allowEdit && editingIndex === id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Edit task..."
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border px-2 py-2 rounded"
                    />
                    <input
                      type="date"
                      value={editDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      type="time"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />

                    <div className="flex justify-between ">
                      <button
                        onClick={() => {
                          updateTodo(id, {
                            text: editText,
                            date: editDate,
                            time: editTime,
                          });
                          setEditingIndex(null);
                        }}
                        className="text-green-500 hover:text-green-700 font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-gray-500 hover:text-gray-700 font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {allowEdit && todo.active && (
                      <button
                        className="text-green-500 cursor-pointer hover:text-green-700 transition"
                        onClick={() => {
                          setEditingIndex(id);
                          setEditText(todo.text);
                          setEditDate(todo.date);
                          setEditTime(todo.time);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                    )}
                  </>
                )}
                
                <button
                  className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  onClick={() => deleteTodo(id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg font-semibold text-red-500 py-4">
          No Tasks Found
        </p>
      )}
    </div>
  );
};

export default TodoList;

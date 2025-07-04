import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";

const TodoBlock = (props) => {
  const { title, list } = props;
  const { isToday, isOverdue } = useContext(TodoContext);

  return (
    <div className="flex-1 min-w-[280px] bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
        {title === "All Tasks" && <span>📋</span>}
        {title === "🟢 Active" && <span></span>}
        {title === "✅ Completed" && <span></span>}
        {title === "⏰ Overdue" && <span></span>}
        {title} <span className="text-gray-500">({list.length})</span>
      </h2>

      <ul className="max-h-30 overflow-y-auto">
        {list.map((todo) => {
          return (
            <li
              key={todo._id}
              className="p-1 rounded-md text-gray-700 text-sm flex justify-between items-center"
            >
              <span
                className={`${
                  isToday(todo.date)
                    ? "text-green-600"
                    : isOverdue(todo.date) && "text-red-600"
                }`}
              >
                {todo.text}
              </span>
              <span
                className={`text-xs ${
                  isToday(todo.date)
                    ? "text-green-600 font-medium"
                    : isOverdue(todo.date)
                    ? "text-red-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {isToday(todo.date) ? "Today" : todo.date} "" {todo.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoBlock;

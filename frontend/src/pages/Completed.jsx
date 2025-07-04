import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { backendUrl } from "../App";
import { TodoContext } from "../context/TodoContext";
import TodoList from "../components/TodoList";

const Completed = () => {
  const { todos, deleteTodo, isAuthen, setTodos } = useContext(TodoContext);

  const completedTodos = todos.filter((todo) => !todo.active);

  function getRealIndex(todo) {
    return todos.findIndex((t) => t === todo);
  }

  async function deleteAllCompleted() {
    if (window.confirm("Are you sure to delete all?")) {
      if (isAuthen) {
        try {
          const token = localStorage.getItem("token");
          
          await axios.delete(`${backendUrl}/api/todos/deleteallcompleted`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setTodos(todos.filter((todo) => todo.active));
          
          toast.success("All completed tasks deleted");
        } catch (error) {
          toast.error("Failed to delete tasks");
        }
      } else {
        const newTodos = todos.filter((todo) => todo.active);
        setTodos(newTodos);

        toast.success("All completed tasks deleted!");
      }
    }
  }

  return (
    <>
      <TodoList
        todos={completedTodos}
        deleteTodo={(i) =>
          isAuthen ? deleteTodo(i) : deleteTodo(getRealIndex(completedTodos[i]))
        }
        allowEdit={false}
        disableToggle={true}
      />

      {completedTodos.length > 0 && (
        <div className="max-w-3xl mx-auto my-4 text-end">
          <button
            className="py-2.5 px-3.5 bg-[#61d18c] rounded-lg font-extrabold cursor-pointer"
            onClick={deleteAllCompleted}
          >
            Delete All
          </button>
        </div>
      )}
    </>
  );
};

export default Completed;

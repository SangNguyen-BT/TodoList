import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import TodoList from "../components/TodoList";

const ActiveList = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo, isAuthen } = useContext(TodoContext);

  const activeTodos = todos.filter((todo) => todo.active);

  function getRealIndex(todo) {
    return todos.findIndex((t) => t === todo);
  }

  return (
    <TodoList
      todos={activeTodos}
      toggleTodo={(i) =>
        isAuthen
          ? toggleTodo(i)
          : toggleTodo(getRealIndex(activeTodos[i]))
      }
      deleteTodo={(i) =>
        isAuthen
          ? deleteTodo(i)
          : deleteTodo(getRealIndex(activeTodos[i]))
      }
      updateTodo={(i, updatedTodo) =>
        isAuthen
          ? updateTodo(i, updatedTodo)
          : updateTodo(getRealIndex(activeTodos[i]), updatedTodo)
      }
    />
  );
};

export default ActiveList;

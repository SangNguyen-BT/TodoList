import { useContext } from "react";

import TodoList from "../components/TodoList";
import { TodoContext } from "../context/TodoContext";

const AllList = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);

  return (
    <>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </>
  );
};

export default AllList;

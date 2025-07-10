import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { backendUrl } from "../App";

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAuthen, setIsAuthen] = useState(false);

  const token = localStorage.getItem("token")

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "input") setInput(value);
    if (name === "date") setDate(value);
    if (name === "time") setTime(value);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    handleAddTodo();
  }

  const handleAddTodo = async () => {
    if (input !== "") {
      if (isAuthen) {
        // Login
        try {
          const newTodo = { text: input, date, time };

          const res = await axios.post(
            `${backendUrl}/api/todos/createtodo`,
            newTodo,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setTodos([...todos, res.data]);

          toast.success("Task added successfully");
        } catch (error) {
          toast.error("Failed to add task");
        }
      } else {
        // Not Login
        setTodos([...todos, { text: input, active: true, date, time }]);
        toast.success("Task added successfully");
      }
      setInput("");
      setDate("");
      setTime("");
    }
  }

  const deleteTodo = async (id) => {
    if (isAuthen) {
      // Login
      try {
        await axios.delete(`${backendUrl}/api/todos/deletetodo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTodos(todos.filter((todo) => todo._id !== id));

        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    } else {
      // Not Login
      const newTodos = todos.filter((_, i) => i !== id);
      setTodos(newTodos);
      toast.success("Task deleted successfully");
    }
  }

  const toggleTodo = async (id) => {
    if (isAuthen) {
      try {
        const todo = todos.find((todo) => todo._id === id);

        const updatedTodo = { ...todo, active: !todo.active };

        const res = await axios.put(
          `${backendUrl}/api/todos/updatetodo/${id}`,
          updatedTodo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTodos(todos.map((t) => (t._id === id ? res.data : t)));

      } catch (error) {
        toast.error("Failed to update task");
      }
    } else {
      const newTodos = [...todos];
      newTodos[id].active = !newTodos[id].active;
      setTodos(newTodos);
    }
  }

  const updateTodo = async (id, updatedTodo) => {
    if (isAuthen) {
      try {
        const res = await axios.put(
          `${backendUrl}/api/todos/updatetodo/${id}`,
          updatedTodo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTodos(todos.map((t) => (t._id === id ? res.data : t)));

        toast.success("Task updated successfully");
      } catch (error) {
        toast.error("Failed to update task");
      }
    } else {
      const newTodos = [...todos];
      newTodos[id] = {
        ...newTodos[id],
        ...updatedTodo,
      };
      setTodos(newTodos);
      toast.success("Task updated successfully!");
    }
  }

  const isToday = (dateString) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  }

  const isOverdue = (dateString) => {
    const today = new Date()
    const dueDate = new Date(dateString)

    today.setHours(0, 0, 0, 0)
    dueDate.setHours(0, 0, 0, 0)

    return dueDate < today
  }

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/todos/alltodos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(res.data);

    } catch (error) {
      console.error("Failed to fetch todos:", error);
      setTodos([]);
      toast.error("Failed to fetch tasks")
    }
  }

  useEffect(() => {
    
    // setIsAuthen(!!token);

    if (token) {
      setIsAuthen(true)
      fetchTodos();

    } else {
      setIsAuthen(false)

      const saved = localStorage.getItem("todos");
      setTodos(saved ? JSON.parse(saved) : []);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthen) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isAuthen]);

  const value = {
    handleChange,
    handleSubmitForm,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setTodos,
    setIsAuthen,
    isToday,
    isOverdue,
    todos,
    input,
    date,
    time,
    isAuthen,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
}

export default TodoContextProvider;

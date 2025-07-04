import TodoModel from "../models/Todo.js";

export async function getTodos(req, res) {
  try {
    const todos = await TodoModel.find({ userId: req.userId });

    res.json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTodosByUser(req, res) {
  try {
    const todos = await TodoModel.find({ userId: req.userId });

    res.json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTodo(req, res) {
  try {
    const { text, date, time } = req.body;

    const newTodo = new TodoModel({
      userId: req.userId,
      text,
      active: true,
      date,
      time,
    });
    await newTodo.save();

    res.status(201).json(newTodo);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { text, active, date, time } = req.body;

    const todo = await TodoModel.findOne({ _id: id, userId: req.userId });
    if (!todo) return res.status(404).json("Todo not found");

    if (text) todo.text = text;
    if (typeof active === "boolean") todo.active = active;
    if (date) todo.date = date;
    if (time) todo.time = time;

    const updatedTodo = await todo.save();

    res.json(updatedTodo);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const todo = await TodoModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!todo) return res.status(404).json("Todo not found");

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteAllCompleted(req, res) {
  try {
    await TodoModel.deleteMany({ userId: req.userId, active: false });

    res.json("All completed todos deleted!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

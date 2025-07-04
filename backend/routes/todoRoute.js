import express from "express"

import authToken from "../middleware/AuthToken.js"
import { createTodo, deleteAllCompleted, deleteTodo, getTodos, getTodosByUser, updateTodo } from "../controllers/todoController.js"

const Router = express.Router()

Router.route('/alltodos').get(authToken, getTodos)
Router.route("/todobyuser").get(authToken, getTodosByUser)

Router.route('/createtodo').post(authToken, createTodo)
Router.route('/updatetodo/:id').put(authToken, updateTodo)

Router.route('/deletetodo/:id').delete(authToken, deleteTodo)
Router.route('/deleteallcompleted').delete(authToken, deleteAllCompleted)

export default Router
import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();
// Create a new todo
router.post('/create', createTodo);

// Get all todos
router.get('/todos', getTodo);

// Update a todo by ID
router.put('/update/:id', updateTodo);

// Delete a todo by ID
router.delete('/delete/:id', deleteTodo);

export default router;
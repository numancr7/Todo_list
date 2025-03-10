import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed || false,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo Created Successfully", todo: newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all todos
export const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = {
            text: req.body.text,
            completed: req.body.completed
        };
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );
        
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


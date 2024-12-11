const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL TODOS
router.get("/", async (req, res) => {});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error saving the new Todo",
    });
  }
});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error saving the new Todos",
    });
  }
});

// Put TODO
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error updating the Todo",
    });
  }
});

// DELETE TODO
router.delete("/", async (req, res) => {});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const userSchema = require("../schema/userSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");

// GET ALL TODOS
router.get("/", checkLogin, async (req, res) => {
  try {
    const todos = await Todo.find({})
      .populate("user", "username name -_id")
      .select({
        _id: 0,
        _v: 0,
        date: 0,
      })
      .limit(2); // Use string notation for excluding fields
    res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error",
    });
  }
});

//using custom instance method
router.get("/active", async (req, res) => {
  /* `const todo = new Todo();` is creating a new instance of the `Todo` model using Mongoose. This
  instance can then be used to access custom instance methods defined on the `Todo` model. In this
  case, it is used to call the `findActive()` method to retrieve active todos. */
  const todo = new Todo();
  /* `const data = await todo.findActive();` is calling a custom instance method `findActive()` on the
  `todo` instance of the `Todo` model. This custom instance method is defined within the `Todo`
  model and is used to retrieve active todos. By calling this method on the `todo` instance, it
  fetches and returns the active todos based on the custom logic implemented in the `findActive()`
  method. */
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
});

// using static methods
router.get("/js", async (req, res) => {
  const data = await Todo.findByJs();
  res.status(200).json({
    data,
  });
});

// using query helper functions for getting data
router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("react");
  res.status(200).json({
    data,
  });
});

// GET A TODO BY ID
router.get("/:id", async (req, res) => {
  try {
    const todos = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      message: "Todo fetched successfully",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error",
    });
  }
});

// POST A TODO
router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.userId,
  });

  try {
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
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
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.id });
    if (!todo.deletedCount) {
      return res.status(404).json({
        error: "Todo not found",
      });
    } else {
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error deleting the Todo",
    });
  }
});

module.exports = router;

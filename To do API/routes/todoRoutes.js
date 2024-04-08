const express = require("express");

// import router from express router

const router = express.Router();

// import controller from controller

const { createTodo } = require("../controllers/createTodoController");
const { getTodos, getTodoByid } = require("../controllers/getTodo");
const { updateTodos } = require("../controllers/updateTodos");
const { deleteTodos } = require("../controllers/deleteTodos");

// define api routes

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodos/:id", getTodoByid);
router.put("/updateTodos/:id", updateTodos);
router.delete("/deleteTodos/:id", deleteTodos);

module.exports = router;

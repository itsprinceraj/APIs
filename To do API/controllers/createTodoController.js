// controller needs schema so import it

const Todo = require("../model/TodoApp");

// Create route handler and interact with database using async network call , so that it cannot affect the rest of the code ;

exports.createTodo = async (req, res) => {
  try {
    // extract title and description from model and put it into req.body

    const { title, description } = req.body;

    // create todo app

    const response = await Todo.create({ title, description });

    // send json response with success flag

    res.status(200).json({
      success: true,
      data: response,
      message: "entry created succesfully",
    });

    // error handled
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal Server Error",
      message: err.message,
    });
  }
};

// module.exports = createTodo;

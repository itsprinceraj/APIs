const Todo = require("../model/TodoApp");

exports.updateTodos = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );

    res.status(200).json({
      success: true,
      data: response,
      message: "entry updated successfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "id not found",
    });
  }
};

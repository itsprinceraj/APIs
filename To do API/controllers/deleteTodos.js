const Todo = require("../model/TodoApp");

exports.deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "entry deleted successfully",
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

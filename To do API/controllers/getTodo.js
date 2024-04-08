// import model and then implement the logic
const Todo = require("../model/TodoApp");

// create route handler for fetching all todos ;

exports.getTodos = async (req, res) => {
  try {
    // mongodb command to fetch or find api calls . to get all apis thats why we put it empty;

    const response = await Todo.find({});

    // Send response with success flag

    res.status(200).json({
      success: true,
      data: response,
      message: "todo api fetched succesfully",
    });
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "Data can't fetched",
      message: err.message,
    });
  }
};

// get a single todo item by id

exports.getTodoByid = async (req, res) => {
  try {
    //get id from req.parameters

    const id = req.params.id;

    // find data by id and fetch them

    const TodoById = await Todo.findById({ _id: id });

    // if data fetched by id then send a response with success flag

    res.status(200).json({
      success: true,
      data: TodoById,
      message: "data found",
    });

    // if data not found then send data not found message >>> 404 status

    if (!TodoById) {
      res.status(404).json({
        success: false,
        messsge: "Data not found",
      });
    }
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "data not found: server error",
      message: err.message,
    });
  }
};

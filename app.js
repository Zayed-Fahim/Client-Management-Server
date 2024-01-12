const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const incompleteTaskRouter = require("./routes/incompleteTask.route");
const toDoTaskRouter = require("./routes/toDoTask.route");
const doingTaskRouter = require("./routes/doingTask.route");
const underReviewTaskRouter = require("./routes/underReviewTask.route");
const completedTaskRouter = require("./routes/completedTask.route");
const overDateTaskRouter = require("./routes/overDateTask.route");

app.use("/incomplete-tasks", incompleteTaskRouter);
app.use("/todo-tasks", toDoTaskRouter);
app.use("/doing-tasks", doingTaskRouter);
app.use("/under-review-tasks", underReviewTaskRouter);
app.use("/completed-tasks", completedTaskRouter);
app.use("/over-date-tasks", overDateTaskRouter);

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

module.exports = app;

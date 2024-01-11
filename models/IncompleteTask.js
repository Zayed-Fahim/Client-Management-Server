const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const incompleteTaskSchema = new mongoose.Schema(
  {
    task_id: {
      type: String,
      required: true,
      unique: true,
    },
    assigned_for: {
      type: String,
      required: true,
      trim: true,
    },
    myInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    clientInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    details: {
      text: {
        type: String,
        required: true,
        trim: true,
      },
      total_task: {
        type: Number,
        required: true,
        min: 1,
      },
      task_remaining: {
        type: Number,
        required: true,
        min: 1,
      },
    },
    contributors: [contributorSchema],
    notifications: {
      type: Number,
      required: true,
      min: 0,
    },
    messages: {
      type: Number,
      required: true,
      min: 0,
    },
    attachments: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const IncompleteTask = mongoose.model("IncompleteTask", incompleteTaskSchema);
module.exports = IncompleteTask;

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
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Number,
    required: true,
  },
  lastModifiedDate: {
    type: Date,
    required: true,
  },
  webkitRelativePath: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const doingTaskSchema = new mongoose.Schema(
  {
    task_id: {
      type: Number,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
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
    attachments: [fileSchema],
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DoingTask = mongoose.model("DoingTask", doingTaskSchema);
module.exports = DoingTask;

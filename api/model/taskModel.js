const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  // _id: mongoose.Types.ObjectId(),
  title: { type: String },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  important: {
    type: Boolean,
    default: false,
  },
  userReferId: String,
});

module.exports = mongoose.model("Task", taskSchema);

// server/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false }, // Track if the task is completed
});

module.exports = mongoose.model('Task', TaskSchema);

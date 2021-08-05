

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todolistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Todolist = mongoose.model('todolist', todolistSchema, 'todolist');

module.exports = Todolist;

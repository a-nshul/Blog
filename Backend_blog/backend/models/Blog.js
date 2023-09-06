// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  video: String,
  url: String,
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: String,
      author: String,
    },
  ],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

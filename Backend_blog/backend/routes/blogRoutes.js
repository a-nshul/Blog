const express = require('express');
const Blog = require('../models/Blog');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, image, video, url } = req.body;
    const author = req.user.username;

    // Create a new blog
    const blog = new Blog({
      title,
      content,
      image,
      video,
      url,
      author,
      likes: 0,
      comments: [],
    });

    // Save the blog to the database
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, image, video, url } = req.body;
    const author = req.user.username;

    // Find the blog by ID and check if it exists
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the authenticated user is the author of the blog
    if (blog.author !== author) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the blog
    blog.title = title;
    blog.content = content;
    blog.image = image;
    blog.video = video;
    blog.url = url;

    // Save the updated blog
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const author = req.user.username;

    // Find the blog by ID and check if it exists
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the authenticated user is the author of the blog
    if (blog.author !== author) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Remove the blog from the database
    await blog.remove();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
});

module.exports = router;

// src/components/BlogForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateBlog = async () => {
    try {
      await axios.post('https://blog-fmpk-a-nshul.vercel.app/auth/blogs', formData);
      console.log('Blog created successfully');
    } catch (error) {
      console.error('Blog creation failed:', error);
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
      <textarea name="content" placeholder="Content" onChange={handleInputChange}></textarea>
      <button onClick={handleCreateBlog}>Create</button>
    </div>
  );
};

export default BlogForm;

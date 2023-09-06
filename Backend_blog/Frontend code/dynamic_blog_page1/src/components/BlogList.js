import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3003/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      {/* {blogs.map((blog) => ( */}
        <div key={blogs._id}>
          <h3>{blogs.title}</h3>
          <p>{blogs.content}</p>
          <button className="like-button">Like</button>
          <button className="comment-button">Comment</button>
          <button className="share-button">Share</button>
        </div>
      {/* ))} */}
    </div>
  );
};

export default BlogList;

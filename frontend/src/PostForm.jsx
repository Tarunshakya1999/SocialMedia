import React, { useState } from 'react';
import axios from 'axios';

export default function PostForm({ setRefresh }) {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      post_title: postTitle,
      post: postContent,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };

    try {
      await Promise.all([
        axios.post('http://localhost:8000/api/facebook/', data, { headers }),
        axios.post('http://localhost:8000/api/twitter/', data, { headers }),
      ]);

      setMsg('✅ Post submitted to Facebook and Twitter!');
      setPostTitle('');
      setPostContent('');
      setRefresh((prev) => !prev); // 👈 trigger re-fetch
    } catch (err) {
      console.error(err);
      setMsg('❌ Failed to post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Post Title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control mb-2"
        rows="3"
        placeholder="Post Content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        required
      ></textarea>
      <button className="btn btn-primary" type="submit">
        📤 Post
      </button>
      {msg && <p className="mt-2">{msg}</p>}
    </form>
  );
}

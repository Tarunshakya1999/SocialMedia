import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentSection({ post, type }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/comments/?${type === 'facebook' ? 'fb' : 'tw'}=${post.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [post.id, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/comments/', {
        comment: text,
        [type === 'facebook' ? 'fb' : 'tw']: post.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setText("");
      // 👇 Re-fetch comments after posting
      const res = await axios.get(
        `http://localhost:8000/api/comments/?${type === 'facebook' ? 'fb' : 'tw'}=${post.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data);
    } catch (err) {
      console.error("❌ Error posting comment:", err);
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button className="btn btn-sm btn-success" type="submit">
            💬 Post
          </button>
        </div>
      </form>

      {comments.length > 0 && (
        <ul className="list-group list-group-flush mt-2">
          {comments.map((c) => (
            <li key={c.id} className="list-group-item small">
              <strong>{c.user}</strong>: {c.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentSection from "./CommentSection";

export default function PostList({ refresh }) {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("access_token");

  const fetchPosts = async () => {
    try {
      const fbRes = await axios.get("http://localhost:8000/api/facebook/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const twRes = await axios.get("http://localhost:8000/api/twitter/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const combined = [
        ...fbRes.data.map((post) => ({ ...post, platform: "facebook" })),
        ...twRes.data.map((post) => ({ ...post, platform: "twitter" })),
      ];

      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(combined);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const deletePost = async (id, platform) => {
    try {
      await axios.delete(`http://localhost:8000/api/${platform}/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) =>
        prev.filter((post) => !(post.id === id && post.platform === platform))
      );
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleReaction = async (id, platform, reaction) => {
    try {
      await axios.post(
        "http://localhost:8000/api/reactions/",
        {
          [`${platform === "facebook" ? "fb" : "tw"}_post`]: id,
          reaction,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPosts();
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  return (
    <div className="row">
      {posts.map((post) => (
        <div className="col-md-6 mb-4" key={`${post.platform}-${post.id}`}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.post_title}</h5>
              <p className="card-text">{post.post}</p>
              <p className="text-muted small">
                📌 Platform:{" "}
                <span
                  className={`badge ${
                    post.platform === "facebook" ? "bg-primary" : "bg-info text-dark"
                  }`}
                >
                  {post.platform === "facebook" ? "Facebook" : "Twitter"}
                </span>
              </p>

              {/* 🔢 Reaction Counts */}
              <p className="mb-1 text-muted">
                👍 Likes: {post.likes || 0} | 👎 Dislikes: {post.dislikes || 0}
              </p>

              <div className="d-flex gap-2 mb-2">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deletePost(post.id, post.platform)}
                >
                  🗑 Delete
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    handleReaction(post.id, post.platform, "like")
                  }
                >
                  👍 Like
                </button>
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() =>
                    handleReaction(post.id, post.platform, "dislike")
                  }
                >
                  👎 Dislike
                </button>
              </div>

              {/* 🗨️ Comments */}
              <CommentSection post={post} type={post.platform} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

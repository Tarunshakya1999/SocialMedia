import React from "react";
import Nav from "./Nav";
import { FaUsers, FaComments, FaHeart, FaHashtag } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Nav />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 text-center">
            <h1 className="mb-4 text-primary fw-bold display-5">
              <FaUsers className="me-2" />
              About <span className="text-dark">SocialSphere</span>
            </h1>

            <p className="lead text-muted mb-4">
              Welcome to <strong>SocialSphere</strong> – your all-in-one platform to connect, share, and
              interact with people across the globe. Whether you're here to post updates, follow friends, or explore
              trending content — we’ve got everything for you!
            </p>

            <div className="my-4">
              <img
                src="https://img.freepik.com/free-vector/social-media-concept-illustration_114360-3043.jpg"
                alt="About us"
                className="img-fluid rounded-4 shadow"
                style={{ maxHeight: "320px", objectFit: "cover" }}
              />
            </div>

            <p className="text-secondary fs-5 mt-4">
              Launched in <strong>2025</strong>, our mission is to bring people closer through a simple,
              clean, and powerful interface that makes social networking enjoyable.
            </p>

            <p className="text-info fs-5 fw-semibold">
              <FaComments className="me-2" />
              Post your thoughts, <FaHeart className="mx-1 text-danger" /> your favorite content, and
              join meaningful conversations.
            </p>

            <p className="text-muted mt-3 small">
              <FaHashtag className="me-2" />
              Stay connected. Stay updated. Only on <strong>SocialSphere</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

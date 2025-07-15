import React from "react";
import Nav from "./Nav";

export default function Contact() {
  return (
    <>
      <Nav />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4 text-primary fw-bold">📞 Contact Us</h2>
            <p className="text-center text-muted mb-4">
              We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <div className="card shadow-sm border-0 p-4 rounded-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill">
                  📬 Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

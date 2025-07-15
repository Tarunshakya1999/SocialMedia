import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";

const Registeration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null); // null: no msg, true: success, false: error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsSuccess(null);

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
        password2,
      });

      setMsg(response.data.message || "Registration Successful");
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 1300);
    } catch (err) {
      const error = err.response?.data?.errors;

      const message =
        typeof error === "object"
          ? Object.values(error).flat().join(" ")
          : error || "Registration Failed";

      setMsg(message);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <Nav />
      <div
        style={{
          maxWidth: "400px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 className="text-center mb-3">Register</h2>

        {msg && (
          <p
            style={{
              color: isSuccess ? "green" : "red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "15px", padding: "8px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit Now
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Registeration;

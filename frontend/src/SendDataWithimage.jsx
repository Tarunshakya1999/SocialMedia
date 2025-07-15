import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import MyProfile from "./MyProfile";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [facebook_user_name, setFacebook] = useState("");
  const [twitter_user_name, setTwitter] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("age", age);
    formData.append("facebook_user_name", facebook_user_name);
    formData.append("twitter_user_name", twitter_user_name);
    formData.append("image", image);

    axios
      .post("http://localhost:8000/api/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setMsg("✅ Profile Created Successfully!");
        console.log(res.data);
      }).catch((err) => {
        if (err.response) {
          console.log("🚨 Error Response:", err.response.data); // 👈 ye line add kar
        }
        setMsg("❌ Error occurred while creating profile.");
      });
        };

  return (
    <>
      <Nav />
      <div style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fafafa"
      }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
          Create Your Profile
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Phone Number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required style={inputStyle} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Facebook Username" value={facebook_user_name} onChange={(e) => setFacebook(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Twitter Username" value={twitter_user_name} onChange={(e) => setTwitter(e.target.value)} style={inputStyle} />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required style={inputStyle} />
          <button type="submit" style={buttonStyle}>🚀 Create Profile</button>
        </form>
        {msg && <p style={{
          textAlign: "center",
          color: msg.includes("Success") ? "green" : "red",
          marginTop: "15px",
          fontWeight: "bold"
        }}>{msg}</p>}
      </div>
        
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
};

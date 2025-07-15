import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import {
  FaFacebook, FaTwitter, FaPhone, FaEnvelope,
  FaUser, FaTrash, FaEdit
} from "react-icons/fa";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    axios.get("http://localhost:8000/api/my-profile/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.length > 0) {
        setProfile(res.data[0]);
      }
    })
    .catch((err) => console.error("Profile fetch error:", err));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      axios.delete(`http://localhost:8000/api/my-profile/${profile.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProfile(null);
        setMsg("🗑️ Profile deleted successfully.");
      })
      .catch(() => setMsg("❌ Error deleting profile."));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in profile) {
      if (key !== "image" && profile[key] !== null && profile[key] !== undefined) {
        formData.append(key, profile[key]);
      }
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios.patch(`http://localhost:8000/api/my-profile/${profile.id}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setMsg("✅ Profile updated successfully.");
      setEditMode(false);
      setProfile({
        ...res.data,
        image: res.data.image + `?t=${Date.now()}`
      });
    })
    .catch(() => setMsg("❌ Error updating profile."));
  };

  if (!profile)
    return <p className="text-center mt-5 fs-4 text-secondary">Loading Profile...</p>;

  return (
    <>
      <Nav />
      <div className="container my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">👤 Your Profile</h2>
          <p className="text-muted">View and manage your personal information</p>
        </div>

        {msg && (
          <div className={`alert ${msg.includes("✅") ? "alert-success" : "alert-danger"} text-center`}>
            {msg}
          </div>
        )}

        <div className="card mx-auto shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", backgroundColor: "#f9f9f9" }}>
          <div className="text-center">
            <img
              key={profile.image} // force refresh
              src={profile.image}
              alt={profile.name}
              className="img-fluid shadow"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #007bff",
              }}
            />
            <h4 className="mt-3 fw-semibold text-dark">{profile.name}</h4>
            <span className="badge bg-success mt-1">Active</span>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-outline-primary" onClick={() => setEditMode(!editMode)}>
              <FaEdit className="me-1" /> {editMode ? "Cancel" : "Edit"}
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              <FaTrash className="me-1" /> Delete
            </button>
          </div>

          <hr className="my-4" />

          {!editMode ? (
            <div className="fs-5">
              <p><FaEnvelope className="me-2 text-primary" /><strong>Email:</strong> {profile.email}</p>
              <p><FaPhone className="me-2 text-success" /><strong>Phone:</strong> {profile.phone_number}</p>
              <p><FaUser className="me-2 text-warning" /><strong>Age:</strong> {profile.age}</p>
              <p><FaFacebook className="me-2 text-info" /><strong>Facebook:</strong> @{profile.facebook_user_name}</p>
              <p><FaTwitter className="me-2 text-primary" /><strong>Twitter:</strong> @{profile.twitter_user_name}</p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              <input name="name" value={profile.name} onChange={handleChange} required className="form-control mb-2" placeholder="Name" />
              <input name="email" value={profile.email} onChange={handleChange} required className="form-control mb-2" placeholder="Email" />
              <input name="phone_number" value={profile.phone_number} onChange={handleChange} required className="form-control mb-2" placeholder="Phone" />
              <input name="age" value={profile.age} onChange={handleChange} required className="form-control mb-2" placeholder="Age" />
              <input name="facebook_user_name" value={profile.facebook_user_name} onChange={handleChange} className="form-control mb-2" placeholder="Facebook Username" />
              <input name="twitter_user_name" value={profile.twitter_user_name} onChange={handleChange} className="form-control mb-2" placeholder="Twitter Username" />
              <input
                type="file"
                name="image"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="form-control mb-3"
              />
              <button type="submit" className="btn btn-success w-100 mt-2">💾 Save Changes</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

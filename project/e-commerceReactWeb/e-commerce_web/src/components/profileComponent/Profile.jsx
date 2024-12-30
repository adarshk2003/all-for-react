import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A short bio about John Doe",
    image: "/userimage.jpg", // Add a path to your image
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prevUser) => ({
        ...prevUser,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can also add the logic to save the updated user details to your database
  };

  return (
    <div className="user-profile">
      <div className="user-image-container">
        <img src={user.image} alt="User" className="user-image" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />
        )}
      </div>
      <h1>User Profile</h1>
      <div className="user-info">
        <label>Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div className="user-info">
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <div className="user-info">
        <label>Bio:</label>
        {isEditing ? (
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.bio}</span>
        )}
      </div>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}

export default UserProfile;

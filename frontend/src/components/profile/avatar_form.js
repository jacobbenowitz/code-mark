import React from "react";

const AvatarForm = ({ color, username }) => (
  <div className="avatar-wrapper form"
    style={{ backgroundColor: color }}>
    <div className="avatar-container-sm">
      <span>{username?.slice(0, 2).toUpperCase()}</span>
    </div>
  </div>
)

export default AvatarForm;
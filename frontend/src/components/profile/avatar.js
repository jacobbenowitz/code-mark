import React from "react";


const Avatar = ({ handleClick, color = '#0D4649', username = 'USER' }) => (
  <div className="avatar-wrapper" onClick={handleClick}
    style={{ backgroundColor: color }}>
    <div className="avatar-container-sm">
      <span>{username.slice(0, 2).toUpperCase()}</span>
    </div>
  </div>
)

export default Avatar;
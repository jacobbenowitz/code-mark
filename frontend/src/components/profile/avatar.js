import React from "react";

const Avatar = ({currentUser, handleClick, color}) => (
    <div className="avatar-wrapper" onClick={handleClick} style={{backgroundColor: color}}>
      <div className="avatar-container-sm">
        <span>{currentUser?.username?.slice(0, 2).toUpperCase()}</span>
      </div>
    </div>
)

export default Avatar;
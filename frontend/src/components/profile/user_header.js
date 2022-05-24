import React from "react";
import FollowButton from '../profile/follow_button';

const UserHeader = ({ user, userId, changeUserFollowers, currentUser }) => {
  if (currentUser.id !== user._id) {
    return (
      <div className="user-header-wrapper">
        <h1>{user.username}'s Notes</h1>
        <div className="user-header-stats">
          <div className="user-stats">
            <div className="user-notes-stat"></div>
            <div className="user-notes-stat"></div>
            <div className="user-notes-stat"></div>
          </div>
          <FollowButton
            changeUserFollowers={changeUserFollowers}
            userId={userId}
            currentUser={currentUser}
          />
        </div>
      </div>
    )
  } else return (
    <div className="user-header-wrapper">
      <h1>{user.username}'s Notes</h1>
      <div className="user-header-stats">
        <div className="user-stats">
          <div className="user-notes-stat"></div>
          <div className="user-notes-stat"></div>
          <div className="user-notes-stat"></div>
        </div>
      </div>
    </div>
  )
}
export default UserHeader;
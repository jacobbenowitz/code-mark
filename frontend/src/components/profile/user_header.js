import React from "react";
import FollowButton from '../profile/follow_button';

const UserHeader = ({ currentUser, user, userId, changeUserFollowers }) => {

  if (currentUser &&
    currentUser.id !== user._id) {
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
    <h3>Loading...</h3>
  )
}

export default UserHeader;
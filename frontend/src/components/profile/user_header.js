import React from "react";
import FollowButton from '../profile/follow_button';
import { selectCommentsCount } from "../../util/selectors";

const UserHeader = ({
  currentUser, user, userId, changeUserFollowers, userNotes }) => {
  let followButton;

  if (currentUser.id !== user._id) {
    followButton = (
      <FollowButton
        changeUserFollowers={changeUserFollowers}
        userId={userId}
        currentUser={currentUser}
      />
    )
  }
  return (
    <div className="user-header-wrapper">
      <h3>Notes by {user.username}</h3>
      <div className="user-header-stats">
        <div className="user-stats">

          <div className="user-notes-stat notes">
            <div className="icon-wrapper">
              <img className="codemark-icon" src="https://code-mark.s3.amazonaws.com/CodeMark_Icon.svg" alt="CodeMark Notes" />
            </div>
            <span>{user.notes.length}</span>
          </div>

          <div className="user-notes-stat comments">
            <div className="icon-wrapper">
              <i className="fa-solid fa-comments fa-lg"></i>
            </div>
            <span>{selectCommentsCount(userNotes)}</span>
          </div>

          <div className="user-notes-stat followers">
            <div className="icon-wrapper">
              <i className="fa-solid fa-users fa-lg"></i>
            </div>
            <div className="flex-wrapper margin-right">
              <span>{user.followers.length}</span>
              <span className="text-light">Followers</span>
            </div>
            <div className="flex-wrapper">
              <span>{user.following.length}</span>
              <span className="text-light">Following</span>
            </div>
          </div>
        </div>
        {followButton}
      </div>
    </div>
  )
}

export default UserHeader;
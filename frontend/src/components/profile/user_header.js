import React from "react";
import FollowButton from '../profile/follow_button';
import { selectCommentsCount } from "../../util/selectors";

const UserHeader = ({
  currentUser, user, userId, changeUserFollowers, userNotes }) => {

  if (currentUser &&
    currentUser.id !== user._id) {
    return (
      <div className="user-header-wrapper">
        <h1>{user.username}'s Notes</h1>
        <div className="user-header-stats">
          <div className="user-stats">

            <div className="user-notes-stat">
              <div className="icon-wrapper">
                <img className="codemark-icon" src="https://code-mark.s3.amazonaws.com/CodeMark_Icon.svg" alt="CodeMark Notes" />
              </div>
              <span>{user.notes.length}</span>
            </div>

            <div className="user-notes-stat">
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
import React from "react";
import FollowButton from '../profile/follow_button';
import { selectCommentsCount } from "../../util/selectors";

// toggleEditModal() {
//   // debugger
//   const editNoteModal = document.getElementById('edit-note-container');
//   const commentHighlightModal = document.getElementById('comment-highlight-text');

//   if (editNoteModal.className === "modal-off" || editNoteModal.className === "modal-out") {
//     editNoteModal.className = "modal-on"
//     commentHighlightModal.className = "modal-compact hidden"
//   } else {
//     editNoteModal.className = "modal-out"
//   }
// }

const UserHeader = ({
  currentUser, user, userId, changeUserFollowers, userNotes, isCurrentUser=false, noteCount}) => {
  let followButton;

  if (currentUser.id !== userId) {
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
      {isCurrentUser ? (
        ""
      ): <h1>{user.username}'s Notes</h1>
    }
      <div className="user-header-stats">
        <div className="user-stats">

          <div className="user-notes-stat notes">
            <div className="icon-wrapper">
              <img className="codemark-icon" src="https://code-mark.s3.amazonaws.com/CodeMark_Icon.svg" alt="CodeMark Notes" />
            </div>
            <span>{isCurrentUser ? noteCount : user.notes?.length}</span>
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
              <span onClick={() => this.toggleEditModal()}>{user.followers?.length }</span>
              <span className="text-light">Followers</span>
            </div>
            <div className="flex-wrapper">
              <span>{user.following?.length}</span>
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
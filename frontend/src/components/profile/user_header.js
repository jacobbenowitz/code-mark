import React from "react";
import FollowButton from '../profile/follow_button';
import { selectCommentsCount, filterUsersById } from "../../util/selectors";
import Followers from "./follower_modal";


export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyHeight: 0,
      followers: []
    }
    this.toggleFollowerModal = this.toggleFollowerModal.bind(this)
}

componentDidUpdate() {
  const body = document.getElementsByTagName('body');
  const bodyHeight = body[0].clientHeight;
  debugger
  if (Object.values(this.props.allUsers).length && !this.state.followers.length && this.props.currentUser) {
    debugger
    
    const followers = filterUsersById(this.props.allUsers, this.props.followers)
    this.setState({ 
      followers: followers,
      bodyHeight: bodyHeight
    })
  }

}

componentDidMount() {
  if (!Object.values(this.props.allUsers).length) {
    this.props.fetchUsers()
  }
}

toggleFollowerModal() {
  // debugger
  const FollowerHeaderModal = document.getElementById('follower-header-container');
  // const commentHighlightModal = document.getElementById('comment-highlight-text');

  if (FollowerHeaderModal.className === "modal-off" || FollowerHeaderModal.className === "modal-out") {
    FollowerHeaderModal.className = "modal-on"
    // commentHighlightModal.className = "modal-compact hidden"
  } else {
    FollowerHeaderModal.className = "modal-out"
  }
}

  
 

render () { 
  const {currentUser, user, userId, changeUserFollowers, userNotes, isCurrentUser = false, noteCount} = this.props

  let followButton, followModal;
  if (currentUser.id !== userId) {
    followButton = (
      <FollowButton
        changeUserFollowers={changeUserFollowers}
        userId={userId}
        currentUser={currentUser}
      />
    )
  }
  
  if (this.state.followers) {
    followModal = (
     <div id='follower-header-container' 
          className="modal-off" 
          style={{ height: this.state.bodyHeight }} 
      >
        <div className='modal-wrapper'>
        <Followers 
            toggleFollowerModal={this.toggleFollowerModal}
            followers={this.state.followers}
        />
        </div>
      </div>
    )
    
  }

  return (
    <>
   { followModal }
    <div className="user-header-wrapper">
      <h3>Notes by {user.username}</h3>
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
            <div className="flex-wrapper margin-right"
              onClick={() => this.toggleFollowerModal()}
            >
              <span>{user.followers?.length }</span>
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
    </>
  )
  }
}



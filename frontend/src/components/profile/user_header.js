import React from "react";
import FollowButton from '../profile/follow_button';
import { selectCommentsCount, filterUsersById } from "../../util/selectors";
import Followers from "./follower_modal";


export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      following: [],
      status: 'IDLE'
    }
    this.toggleFollowerModal = this.toggleFollowerModal.bind(this)
}

  componentDidUpdate() {
    debugger
  

    if (this.props.userStatus === 'DONE' && this.state.status === 'BUSY' && this.props.user ) {
      const followers = filterUsersById(this.props.allUsers, this.props.user.followers)
      const following = filterUsersById(this.props.allUsers, this.props.user.following)

      this.setState({
        followers: followers,
        following: following,
        status: 'DONE'
      })
    }

  }

  componentDidMount() {
   this.props.fetchUsers()
   this.setState({
     status: 'BUSY'
   }) 
  }

toggleFollowerModal() {
  const FollowerHeaderModal = document.getElementById('following-modal');
  // const commentHighlightModal = document.getElementById('comment-highlight-text');

  if (FollowerHeaderModal.className === "modal-off" || FollowerHeaderModal.className === "modal-out") {
    FollowerHeaderModal.className = "modal-in"
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
  
  if (this.state.followers || this.state.following) {
    followModal = (
    <div id='following-modal' 
      className="modal-off"  
    >
        <Followers 
            toggleFollowerModal={this.toggleFollowerModal}
            followers={this.state.followers}
            following={this.state.following}
        />

    </div>
    )
    
  }

  debugger
  return (
    <>
    <div className="user-header-wrapper">
    { followModal }
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
              <span>{user?.followers.length || 0 }</span>
              <span className="text-light">Followers</span>
            </div>
            <div className="flex-wrapper">
              <span>{user?.following.length || 0}</span>
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



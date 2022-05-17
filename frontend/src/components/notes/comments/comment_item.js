import React from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

class CommentItem extends React.Component {

  constructor(props) {
    super(props)
  }


  toggleDeleteModal() {
    const deleteModal = document.getElementById('comment-delete-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }

  deleteComment() {
    this.props.removeComment(this.props.comment._id);
    this.toggleDeleteModal();
    this.hideComment();
  }

  hideComment() {
    let commentWrapper = document.getElementById(`${this.props.comment._id}`)
    debugger
    commentWrapper.className = "hidden"
  }


  render() {
    return (
      <div>
        {/* modal div */}
        <div id='comment-delete-modal-container' className='modal-off' >
          <div className='modal-wrapper-2'>
            <div className='cancel-modal'>
              <span>Are you sure you want to delete this comment?</span>
              <div className='modal-buttons-2'>
                <div className='delete-note icon-button'
                  onClick={() => this.deleteComment()}>
                  <i className="fa-solid fa-trash fa-lg"></i>
                  <span>Delete </span>
                </div>
                <div className='cancel icon-button'
                  onClick={() => this.toggleDeleteModal()}>
                  <i className="fa-solid fa-ban fa-lg"></i>
                  <span>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id={this.props.comment._id} className="comment-wrapper">
          <div className="comment-top-wrapper">
            <div className="user-info-wrapper">
              <div className="user-details">
                <div className="avatar-wrapper">
                  <div className="avatar-container-sm">
                    <span>{this.props?.user.username.slice(0, 2).toUpperCase()}</span>
                  </div>
                </div>
                <Link to={`/users/${this.props.user.userId}`}
                  className="username-comment">{this.props.user?.username}</Link>
              </div>
              {this.props.isCurrentUser ? (
                <div className='delete-note icon-button'
                  onClick={() => this.toggleDeleteModal()}>
                  <i className="fa-solid fa-trash fa-lg"></i>
                  <span>Delete</span>
                </div>
              ) : ""
              }
            </div>
            <span className="comment-time-ago">{moment(this.props.comment.createdAt).fromNow()}</span>
          </div>

          <div className="code-snippet-comment">
            <textarea className="code code-textarea"
              value={this.props.comment.codeSnippet}
            />

          </div>
          <div className="comment-body-wrapper">
            <span className="comment-body">
              {this.props.comment.textbody}
            </span>
          </div>
        </div>
      </div >
    )
  }
}

export default CommentItem;
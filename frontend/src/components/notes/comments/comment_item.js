import React from "react";

const CommentItem = props => {
   

  // deleteNote() {
  //   this.props.removeNote(this.props.noteId).then(() => {
  //     this.props.history.push('/home')
  //   })
  // }

  return props.comment ? (
    <div className="comment-wrapper">
      <div className="user-info-wrapper">
        <div className="avatar-wrapper">
          <div className="avatar-container-sm">
            {/* need to access users to splice username letters */}
            {/* {props.comment.username} */}
            <span>CM</span>
          </div>
        </div>
        <div className="user-details">
          <span className="username-comment">{props.comment.username}</span>
          <span className="comment-time">{props.comment.created_at}</span>
        </div>
      </div>
      <div className="code-snippet-comment">
        <textarea className="code code-textarea"
          defaultValue={"Code from note "} />
      </div>
      <div className="comment-body-wrapper">
        <span className="comment-body">{props.comment.textbody}</span>
      </div>
      <div className='delete-note icon-button'
        onClick={() => this.deleteNote()}>
        <i className="fa-solid fa-trash fa-lg"></i>
        <span>
          Delete Comment
        </span>
      </div>
    </div>
  ) : (<h4>Loading Comments</h4>)
}

export default CommentItem;
import React from "react";

const CommentItem = props => {
  debugger
  props.comment ? ( 
    <div className="comment-wrapper">
      <div className="user-info-wrapper">
        <div className="avatar-wrapper">
          <div className="avatar-container-sm">
            {/* sm username */}
            {/* <span>{props.comment.username}</span> */}
          </div>
        </div>
        <div className="user-details">
          <span className="username-comment">{props.comment.username}</span>
          {/* <span className="comment-time">{props.comment.created_at}</span> */}
        </div>
      </div>
      {/* <div className="code-snippet-comment">
        <textarea className="code code-textarea" rows={4}
          defaultValue={"Code from note = highlighted => {" + "\n" + "  by user" + "\n" + "}"} />
      </div> */}
      <div className="comment-body-wrapper">
        <span className="comment-body">{props.comment.textbody}</span>
      </div>
    </div>
    ) : ( <h4>Loading Comments</h4> )
}

export default CommentItem;
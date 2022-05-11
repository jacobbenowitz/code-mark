import React from "react";

class CommentItem extends React.Component {

  // resize() {
  //   const text = document.getElementById('code-textarea');
  //   text.style.height = 'auto';
  //   text.style.height = text.scrollHeight + 'px';
  // }
  // componentDidMount() {
  //   this.resize();
  // }

  render() {
    return this.props.comment ? ( 
        <div className="comment-wrapper">
          <div className="user-info-wrapper">
            <div className="avatar-wrapper">
              <div className="avatar-container-sm">
                {/* sm username */}
                {/* <span>{this.props.comment.username}</span> */}
              </div>
            </div>
            <div className="user-details">
              {/* <span className="username-comment">{this.props.comment.username}</span> */}
              {/* <span className="comment-time">{this.props.comment.created_at}</span> */}
            </div>
          </div>
          {/* <div className="code-snippet-comment">
            <textarea className="code code-textarea" rows={4}
              defaultValue={"Code from note = highlighted => {" + "\n" + "  by user" + "\n" + "}"} />
          </div> */}
          <div className="comment-body-wrapper">
            <span className="comment-body">{this.props.comment.textbody}</span>
          </div>
        </div>
    ) : (
      <h4>Loading</h4>
    )
  }
}

export default CommentItem;
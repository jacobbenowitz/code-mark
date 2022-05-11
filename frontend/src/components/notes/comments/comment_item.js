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
    return (
      <div className="comment-wrapper">
        <div className="user-info-wrapper">
          <div className="avatar-wrapper">
            <div className="avatar-container-sm">
              <span>US</span>
            </div>
          </div>
          <div className="user-details">
            <span className="username-comment">Username</span>
            <span className="comment-time">about 5 mins ago</span>
          </div>
        </div>
        <div className="code-snippet-comment">
          <textarea className="code code-textarea" rows={4}
            defaultValue={"Code from note = highlighted => {" + "\n" + "  by user" + "\n" + "}"} />
        </div>
        <div className="comment-body-wrapper">
          <span className="comment-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus eget nibh aliquet facilisis blandit volutpat ultricies.</span>
        </div>
      </div>
    )
  }
}

export default CommentItem;
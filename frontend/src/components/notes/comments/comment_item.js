import React from "react";

const CommentItem = props => {
   
  // add thunk action to note container?

  // Only show comment delete button if the note's user is the current user 
  // session.user.id === notes.all[0].id


  // deleteComment() {
  //   this.props.removeComment(this.props.noteId).then(() => {
  //     this.props.history.push('/home')
  //   })

  // deleteTag() {
  //   let newTags = this.props.tags.filter(tag =>
  //     tag !== this.props.title);
  //   const { title, codebody, textdetails, resources, _id } = this.props.note;

  //   let nextNote = {
  //     title: title,
  //     codebody: codebody,
  //     textdetails: textdetails,
  //     resources: resources,
  //     tags: newTags
  //   }
  //  
  //   this.props.updateNote(nextNote, _id)
  // }
  // }

  return props.comment ? (
    <div className="comment-wrapper">
      <div className="user-info-wrapper">
        <div className="avatar-wrapper">
          <div className="avatar-container-sm">
            {/* match comment user to user to get username*/}
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
        <textarea className="code code-textarea" rows={4}
          defaultValue={"Code from note = highlighted => {" + "\n" + "  by user" + "\n" + "}"} />
      </div>
      <div className="comment-body-wrapper">
        <span className="comment-body">{props.comment.textbody}</span>
      </div>
      <div className='delete-note icon-button'
        onClick={() => this.deleteComment()}>
        <i className="fa-solid fa-trash fa-lg"></i>
        <span>
          Delete Comment
        </span>
      </div>
    </div>
  ) : (<h4>Loading Comments</h4>)
}

export default CommentItem;
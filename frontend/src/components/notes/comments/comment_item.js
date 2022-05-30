import React from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import CodeCommentReadOnly from "../../code_editor/code_comment_readonly";
import LikeCommentIcon from "../like_comment_icon";
import Avatar from "../../profile/avatar";

class CommentItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      codeSnippet: "",
      textbody: "",
      editActive: false
    }
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.setState({
      codeSnippet: this.props.comment.codeSnippet,
      textbody: this.props.comment.textbody
    })
  }

  toggleDeleteModal(e) {
    // mouseX = e.clientX;
    // mouseY = e.clientY;
    // console.log(mouseX, mouseY)
    const deleteModal = document.getElementById('comment-delete-modal-container');
    if (deleteModal.className === "modal-off") {
      deleteModal.className = "modal-on";
    } else {
      deleteModal.className = "modal-off";
    }
  }

  handleEdit(e) {
    e.preventDefault();
    let { codeSnippet, textbody } = this.state;
    const comment = {
      codeSnippet: codeSnippet,
      textbody: textbody,
      note: this.props.noteId
    }

    this.props.updateComment(comment, this.props.comment._id);
    // this.props.toggleModal();
    this.setState({
      editActive: false
    })
  }

  toggleEdit() {
    if (this.state.editActive) {
      this.setState({ editActive: false })
    } else {
      this.setState({ editActive: true })
    }
  }

  deleteComment() {
    this.props.removeComment(this.props.comment._id)
    this.props.toggleModal();
    // setTimeout(this.props.fetchNoteComments(this.props.noteId), 100)
    this.toggleDeleteModal();
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }


  render() {
    // debugger;
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
                  onClick={(e) => this.toggleDeleteModal(e)}>
                  <i className="fa-solid fa-ban fa-lg"></i>
                  <span>
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id={this.props.comment?._id || 'newComment'} className="comment-outer-wrapper">
          <div className="comment-top-wrapper">
            <div className="user-info-wrapper">
              <div className="user-details">
                <Avatar
                  handleClick={() => this.props.history.push(`/users/${this.props?.user.username}`)}
                  username={this.props?.user.username}
                  color={this.props?.user.color}
                />
                <Link to={`/users/${this.props.user.userId}`}
                  className="username-comment">{this.props.user?.username}</Link>
              </div>
              <div className="comment-icons">
                {this.props.isCurrentUser || this.props.currentUser.id === this.props.comment.user.userId ? (
                  <div className='delete-comments comment-icon-button'
                    aria-label="delete comment" title="delete"
                    onClick={() => this.toggleDeleteModal()}>
                    <i className="fa-solid fa-trash fa-lg"></i>
                  </div>
                ) : ""}
                {this.props.currentUser.id === this.props.comment.user.userId ? (
                  <div className='edit-comments comment-icon-button'
                    aria-label="edit comment" title="edit"
                    onClick={() => this.toggleEdit()}>
                    <i className="fa-solid fa-pencil fa-lg"></i>
                  </div>
                ) : ""}
                <div className='like-comments comment-icon-button'
                  aria-label="delete comments" title="like">
                  <LikeCommentIcon
                    addCommentLike={this.props.addCommentLike}
                    removeCommentLike={this.props.removeCommentLike}
                    currentUserId={this.props.currentUser.id}
                    commentId={this.props.comment._id}
                    likes={this.props.comment.likes}
                  />
                </div>
              </div>
            </div>
            <div className="comment-stats">
              <span className="comment-time-ago">{moment(this.props.comment.createdAt).fromNow()}</span>
              <div className='note-stat likes'>
                <i className="fa-solid fa-heart"></i>
                <span>{this.props.comment.likes.length}</span>
              </div>
            </div>
          </div>
          {this.state.editActive ? (
            <div className="comment-wrapper">
              <form onSubmit={this.handleEdit} className='comment-form'>
                <span className='comment-form-title'>Edit comment</span>
                <div className='add-code-snippet-wrapper'>
                  <div className="code-snippet-comment">
                    <div className="code-snippet-comment">
                      <CodeCommentReadOnly
                        codeSnippet={this.props.comment.codeSnippet} />
                    </div>
                  </div>
                </div>
                <textarea
                  onChange={this.update('textbody')}
                  id='comment-textarea'
                  className='comment-body-input'
                  placeholder={'Have a question about this CodeMark? Let the author know!'}
                  value={this.state.textbody}
                  required
                />
                <button id="comment-submit" type='submit'>Update</button>
              </form>
            </div>
          ) : (
            <div className="comment-wrapper">
              {this.props.comment.codeSnippet.length ? (
                <div className="code-snippet-comment">
                  <CodeCommentReadOnly
                    codeSnippet={this.props.comment.codeSnippet} />
                </div>
              ) : ""}
              <div className="comment-body-wrapper">
                <span className="comment-body">
                  {this.props.comment.textbody}
                </span>
              </div>
            </div>
          )}
        </div>
      </div >
    )
  }
}

export default CommentItem;
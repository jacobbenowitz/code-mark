import React from 'react';
import { orderNoteComments } from "../../../util/selectors";
import CommentItem from '../comments/comment_item';
import CommentFormContainer from './comment_form_container';
import CommentForm from './comment_form';
import { filterUsersByComment } from "../../../util/selectors";

export default class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { note, comments, isCurrentUser, removeComment, noteId, updateComment,
      composeComment, selectedText, newComment, currentUser, fetchNoteComments } = this.props;
    return (
      <div className='comments-list'>
        <CommentForm
          noteId={noteId}
          composeComment={composeComment}
          selectedText={selectedText}
          newComment={newComment}
          currentUser={currentUser}
          fetchNoteComments={fetchNoteComments}
        />
        {comments ? (
          <div className='comment-items-list'>
            {comments.map(comment => {
              return <CommentItem
                updateComment={updateComment}
                isCurrentUser={isCurrentUser}
                currentUser={currentUser}
                key={comment._id}
                id={comment._id}
                comment={comment}
                user={comment.user}
                removeComment={removeComment}
                fetchNote={this.props.fetchNote}
                fetchNoteComments={fetchNoteComments}
                noteId={this.props.noteId}
              />
            })}
          </div>) : ''}
      </div>
    )
  }
}

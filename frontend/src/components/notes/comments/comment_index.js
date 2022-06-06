import React from 'react';
import { orderNoteComments } from "../../../util/selectors";
import CommentItem from '../comments/comment_item';
import CommentFormContainer from './comment_form_container';
import CommentForm from './comment_form';
import { filterUsersByComment } from "../../../util/selectors";

const CommentIndex = ({ note, comments, isCurrentUser, removeComment, noteId, updateComment, removeCommentLike, composeComment, selectedText, newComment, currentUser, fetchNoteComments, addCommentLike, fetchNote }) => {
  
  let commentsList;

  if (comments) {
    commentsList = (
      <div className='comment-items-list'>
        {
          comments.map(comment => 
            <CommentItem
              addCommentLike={addCommentLike}
              removeCommentLike={removeCommentLike}
              updateComment={updateComment}
              isCurrentUser={isCurrentUser}
              currentUser={currentUser}
              key={comment._id}
              id={comment._id}
              comment={comment}
              user={comment.user}
              removeComment={removeComment}
              fetchNote={fetchNote}
              fetchNoteComments={fetchNoteComments}
              noteId={noteId}
            />)
        }
      </div>
    )
  }


  return (
    <div className='comments-list'>
      {commentsList}
    </div>
  )

}

export default CommentIndex;
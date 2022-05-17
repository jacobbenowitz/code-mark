import React from 'react';
import { orderNoteComments } from "../../../util/selectors";
import CommentItem from '../comments/comment_item';
import CommentFormContainer from './comment_form_container';
import { filterUsersByComment } from "../../../util/selectors";

export default class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    debugger
    const { note, comments, isCurrentUser, removeComment } = this.props;
    return (

      <div className='comments-list'>
        <CommentFormContainer />
        {comments ? (
          <div>
            {comments.map(comment => {
              return <CommentItem
                isCurrentUser={isCurrentUser}
                key={comment._id}
                id={comment._id}
                comment={comment}
                user={comment.user}
                removeComment={removeComment}
              />
            })}
          </div>) : ''}
      </div>
    )
  }
}

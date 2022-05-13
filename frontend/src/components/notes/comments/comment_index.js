import React from 'react';
import { orderNoteComments } from "../../../util/selectors";
import CommentItem from '../comments/comment_item';
import CommentFormContainer from './comment_form_container';
import { filterUsersByComment } from "../../../util/selectors";

export default class CommentIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   newComment: undefined,
    // }
  }

  // componentDidCatch() {
  // this.props.comments ? 
  // }

  render() {

    const { comments, note } = this.props;
    debugger;
    return (

      <div className='comments-list'>

        <CommentFormContainer />

        {this.props.comments && this.props.users ? (
          <div>
            {comments.map(comment => {
              let user = filterUsersByComment(this.props.users , comment);
              return <CommentItem
                key={comment._id}
                id={comment._id}
                comment={comment}
                user={user}
                // username={comment.username}
              // deleteThisComment={this.deleteThisComment}
              />
            })}
          </div>) : ''}
      </div>
    )
  }
}

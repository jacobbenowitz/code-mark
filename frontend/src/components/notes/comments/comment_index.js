import React from 'react';
import { orderNoteComments } from "../../../util/selectors";
import CommentItem from '../comments/comment_item';
import CommentFormContainer from './comment_form_container';

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

    return (

      <div className='comments-list'>

        <CommentFormContainer />

        {this.props.comments ? (
          <div>
            {comments.map(comment => {
              debugger
              return <CommentItem
                key={comment._id}
                id={comment._id}
                comment={comment}
              // deleteThisComment={this.deleteThisComment}
              />
            })}
          </div>) : ''}
      </div>
    )
  }
}

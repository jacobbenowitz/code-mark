import { connect } from 'react-redux';
import { composeComment, updateComment, removeComment } from '../../../actions/comment_actions';
import CommentForm from './comment_form';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { match }) => {
    return {
        currentUser: state.session.user,
        noteId: match.params.noteId,
        newComment: state.comments.new
    }
};

const mapDispatchToProps = dispatch => {
    return {
        composeComment: (data) => dispatch(composeComment(data)),
        updateComment: (data, commentId) => dispatch(updateComment(data, commentId)),
        removeComment: (commentId) => dispatch(removeComment(commentId))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
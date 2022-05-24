import {
    RECEIVE_NEW_COMMENT,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    RECEIVE_USER_COMMENTS,
    RECEIVE_DELETE_COMMENT,
    RECEIVE_UPDATED_COMMENT,
    RECEIVE_NOTE_COMMENTS,
    RECEIVE_COMMENT_LIKE,
    RECEIVE_COMMENT_UNLIKE
} from '../actions/comment_actions';

const initialState = {
    all: [],
    user: [],
    note: [],
    new: undefined
};

const commentsReducer = (prevState = initialState, action) => {
    Object.freeze(prevState);
    let nextState = Object.assign({}, prevState)
    switch (action.type) {
        case RECEIVE_NEW_COMMENT:
            let newComments = [...nextState.note, action.comment];
            nextState.note = newComments;
            return nextState;
        case RECEIVE_USER_COMMENTS:
            nextState.user = Object.values(action.comments)
            return nextState;
        case RECEIVE_COMMENTS:
            nextState.all = action.comments
            return nextState;
        case RECEIVE_COMMENT:
            nextState.all.push(action.comment);
            return nextState;
        case RECEIVE_DELETE_COMMENT:
            nextState.note = nextState.note.filter(comment =>
                comment._id !== action.commentId.data);
            return nextState;
        case RECEIVE_UPDATED_COMMENT:
            let updated = nextState.note.map(comment => {
                if (comment._id === action.comment._id) {
                    return action.comment
                }
                else return comment
            });
            nextState.note = updated;
            return nextState;
        case RECEIVE_NOTE_COMMENTS:
            nextState.note = action.comments;
            return nextState;
        case RECEIVE_COMMENT_LIKE:
            let nextComments = nextState.note.map(comment => {
                if (comment._id = action.comment.data._id) {
                    return action.comment.data
                } else return comment
            })
            nextState.note = nextComments;
            return nextState;
        case RECEIVE_COMMENT_UNLIKE:
            let unlikedComments = nextState.note.map(comment => {
                if (comment._id = action.comment.data._id) {
                    return action.comment.data
                } else return comment
            })
            nextState.note = unlikedComments;
            return nextState;
        default:
            return prevState;
    }
}

export default commentsReducer;
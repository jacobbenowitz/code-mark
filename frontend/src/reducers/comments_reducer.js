import {
    RECEIVE_NEW_COMMENT,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    RECEIVE_USER_COMMENTS,
    RECEIVE_DELETE_COMMENT,
    RECEIVE_UPDATED_COMMENT,
    RECEIVE_NOTE_COMMENTS
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
            nextState.new = action.comment;
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
            return nextState.all.filter(comment =>
                comment._id !== action.commentId
            )
        case RECEIVE_UPDATED_COMMENT:
            //  
            nextState.all.map(comment => {
                if (comment._id === action.comment._id) {
                    return action.comment
                }
                else return comment
            });
            return nextState;
        case RECEIVE_NOTE_COMMENTS:
            //  
            nextState.note = action.comments;
            return nextState;
        default:
            return prevState;
    }
}

export default commentsReducer;
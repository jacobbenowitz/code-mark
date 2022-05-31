import {
    RECEIVE_COMMENT_ERRORS,
    RECEIVE_DELETE_COMMENT,
    RECEIVE_NEW_COMMENT,
    RECEIVE_UPDATED_COMMENT
} from "../actions/comment_actions";

const _nullErrors = [];

const commentsErrorReducer = (prevState = _nullErrors, action) => {
    Object.freeze(prevState);
    // debugger;
    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_NEW_COMMENT:
            return _nullErrors;
        case RECEIVE_UPDATED_COMMENT:
            debugger;
            return action.comment[1];
        case RECEIVE_DELETE_COMMENT:
            return action.commentId[1];
        default:
            return prevState;
    }
};

export default commentsErrorReducer;
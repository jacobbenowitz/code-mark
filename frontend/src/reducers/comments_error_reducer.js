import {
    RECEIVE_COMMENT_ERRORS,
    RECEIVE_NEW_COMMENT
} from "../actions/comment_actions";

const _nullErrors = [];

const commentsErrorReducer = (prevState = _nullErrors, action) => {
    Object.freeze(prevState);

    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_NEW_COMMENT:
            return _nullErrors;
        default:
            return prevState;
    }
};

export default commentsErrorReducer;
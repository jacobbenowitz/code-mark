import {
    getComments,
    getComment,
    getUserComments,
    writeComment,
    patchComment,
    deleteComment
} from '../util/comment_api_util';


export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_USER_COMMENTS = "RECEIVE_USER_COMMENTS";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const RECEIVE_UPDATED_COMMENT = "RECEIVE_UPDATED_COMMENT";
export const RECEIVE_DELETE_COMMENT = "RECEIVE_DELETE_COMMENT";

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const receiveUserComments = comments => ({
    type: RECEIVE_USER_COMMENTS,
    comments
});

export const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
})

export const receiveCommentErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
})

export const receiveUpdateComment = comment => ({
    type: RECEIVE_UPDATED_COMMENT,
    comment
})

export const receiveDeleteComment = commentId => ({
    type: RECEIVE_DELETE_COMMENT,
    commentId
})

export const fetchComments = () => dispatch => (
    getComments()
        .then(comments => dispatch(receiveComments(comments)))
        .catch(err => dispatch(receiveCommentErrors(err)))
);

export const fetchComment = commentId => dispatch => (
    getComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
        .catch(err => dispatch(receiveCommentErrors(err)))

);

export const fetchUserComments = id => dispatch => (
    getUserComments(id)
        .then(comments => dispatch(receiveUserComments(comments)))
        .catch(err => dispatch(receiveCommentErrors(err)))
);

export const composeComment = data => dispatch => {
    return writeComment(data)
        .then(comment => dispatch(receiveNewComment(comment)))
        .catch(err => dispatch(receiveCommentErrors(err)))
};

export const updateComment = (data, commentId) => dispatch => {
    return patchComment(data, commentId)
        .then(comment => dispatch(receiveUpdateComment(comment)))
        .catch(err => dispatch(receiveCommentErrors(err)))
};

export const removeComment = commentId => dispatch => (
    deleteComment(commentId)
        .then(comment => dispatch(receiveDeleteComment(comment.id)))
        .catch(err => dispatch(receiveCommentErrors(err)))
);
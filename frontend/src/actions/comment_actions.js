import {
    getComments,
    getComment,
    getUserComments,
    writeComment,
    patchComment,
    deleteComment,
    getNoteComments,
    patchCommentLikes
} from '../util/comment_api_util';

export const RECEIVE_NOTE_COMMENTS = "RECEIVE_NOTE_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_USER_COMMENTS = "RECEIVE_USER_COMMENTS";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const RECEIVE_UPDATED_COMMENT = "RECEIVE_UPDATED_COMMENT";
export const RECEIVE_DELETE_COMMENT = "RECEIVE_DELETE_COMMENT";
export const RECEIVE_COMMENT_LIKE = "RECEIVE_COMMENT_LIKE";
export const RECEIVE_COMMENT_UNLIKE = "RECEIVE_COMMENT_UNLIKE";

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const receiveNoteComments = comments => ({
    type: RECEIVE_NOTE_COMMENTS,
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

export const receiveCommentLike = comment => ({
    type: RECEIVE_COMMENT_LIKE,
    comment
})

export const receiveCommentUnlike = comment => ({
    type: RECEIVE_COMMENT_UNLIKE,
    comment
})

export const fetchComments = () => dispatch => (
    getComments()
        .then(comments => dispatch(receiveComments(comments.data)))
        // .catch(err => dispatch(receiveCommentErrors(err)))
);

export const fetchNoteComments = noteId => dispatch => {
    return getNoteComments(noteId)
        .then(comments => dispatch(receiveNoteComments(comments.data)))
        // .catch(err => dispatch(receiveCommentErrors(err)))
};

export const fetchComment = commentId => dispatch => (
    getComment(commentId)
        .then(comment => dispatch(receiveComment(comment.data)))
        // .catch(err => dispatch(receiveCommentErrors(err)))

);

export const fetchUserComments = id => dispatch => (
    getUserComments(id)
        .then(comments => dispatch(receiveUserComments(comments.data)))
        // .catch(err => dispatch(receiveCommentErrors(err)))
);

export const composeComment = data => dispatch => {
    return writeComment(data)
        .then(comment => dispatch(receiveNewComment(comment.data)))
        .catch(err => dispatch(receiveCommentErrors(err)))
};

export const updateComment = (data, commentId) => dispatch => {
    return patchComment(data, commentId)
        .then(comment => {
            // debugger;
            dispatch(receiveUpdateComment(comment.data))
        })
        .catch(err => dispatch(receiveCommentErrors(err)))
};

export const removeComment = (commentId) => dispatch => {
    return deleteComment(commentId)
        .then(commentid => {
            // debugger;
            dispatch(receiveDeleteComment(commentid.data))
        })
        .catch(err => dispatch(receiveCommentErrors(err)))
};

export const addCommentLike = (data, commentId) => dispatch => (
    patchCommentLikes(data, commentId)
        .then(comment => dispatch(receiveCommentLike(comment)))
        .catch(err => dispatch(receiveCommentErrors(err)))
)

export const removeCommentLike = (data, commentId) => dispatch => (
    patchCommentLikes(data, commentId)
        .then(comment => dispatch(receiveCommentUnlike(comment)))
        .catch(err => dispatch(receiveCommentErrors(err)))
)
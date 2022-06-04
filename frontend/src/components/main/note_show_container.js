import { connect } from "react-redux";
import NoteShow from "./note_show";
import {
  addNoteLike,
  fetchNote,
  removeNote,
  removeNoteLike,
  updateNote,
  updateNotePublicStatus,
  updateNoteTags
} from "../../actions/note_actions";

import {
  fetchNoteComments,
  removeComment,
  composeComment,
  updateComment,
  addCommentLike,
  removeCommentLike,
} from "../../actions/comment_actions";

import { fetchUsers, fetchUser } from "../../actions/user_actions";
import { fetchCurrentUser } from "../../actions/session_actions";

const mapStateToProps = (state, { match }) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId],
    currentUser: state.session.user,
    comments: state.comments.note,
    newComment: state.comments.new,
    users: state.users.all,
    deletedComments: state.comments.deleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: noteId => dispatch(fetchNote(noteId)),
    removeNote: noteId => dispatch(removeNote(noteId)),
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId)),
    fetchNoteComments: (noteId) => dispatch(fetchNoteComments(noteId)),
    removeComment: (commentId) => dispatch(removeComment(commentId)),
    composeComment: (data) => dispatch(composeComment(data)),
    updateComment: (data, commentId) =>
      dispatch(updateComment(data, commentId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: () => dispatch(fetchUser()),
    addNoteLike: (data, noteId) => dispatch(addNoteLike(data, noteId)),
    removeNoteLike: (data, noteId) => dispatch(removeNoteLike(data, noteId)),
    addCommentLike: (data, commentId) =>
      dispatch(addCommentLike(data, commentId)),
    removeCommentLike: (data, commentId) => dispatch(removeCommentLike(data, commentId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    updateNoteTags: (tags, noteId) => dispatch(updateNoteTags(tags, noteId)),
    updateNotePublicStatus: (data, noteId) =>
      dispatch(updateNotePublicStatus(data, noteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow);
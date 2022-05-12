import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NoteShow from "./note_show";
import {
  fetchNote,
  removeNote, updateNote
} from "../../actions/note_actions";
import {
  fetchNoteComments,
  removeComment,
  composeComment,
  updateComment,
} from "../../actions/comment_actions";

const mapStateToProps = (state, { match }) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId],
    currentUser: state.session.user,
    comments: state.comments.note,
    newComment: state.comments.new
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: noteId => dispatch(fetchNote(noteId)),
    removeNote: noteId => dispatch(removeNote(noteId)),
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId)),
    fetchNoteComments: (noteId) => dispatch(fetchNoteComments(noteId)),
    removeComment: (commentId) => dispatch(removeComment(commentId)),
    composeComment: (data) => dispatch(composeComment(data)),        updateComment: (data, commentId) => dispatch(updateComment(data, commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow);
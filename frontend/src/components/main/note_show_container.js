import { connect } from "react-redux";
import NoteShow from "./note_show";
import { fetchNote, removeNote, updateNote } from "../../actions/note_actions";
import { fetchNoteComments } from "../../actions/comment_actions";

const mapStateToProps = (state, { match }) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId],
    currentUser: state.session.user,
    comments: state.comments.note,
    new: state.comments.new
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: noteId => dispatch(fetchNote(noteId)),
    removeNote: noteId => dispatch(removeNote(noteId)),
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId)),
    fetchNoteComments: (noteId) => dispatch(fetchNoteComments(noteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow);
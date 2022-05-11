import { connect } from "react-redux";
import NoteShow from "./note_show";
import { fetchNote, removeNote, updateNote } from "../../actions/note_actions";

const mapStateToProps = (state, { match }) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId],
    currentUser: state.session.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: noteId => dispatch(fetchNote(noteId)),
    removeNote: noteId => dispatch(removeNote(noteId)),
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow);
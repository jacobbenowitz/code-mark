import { connect } from "react-redux";
import NoteShow from "./note_show";
import { fetchNote } from "../../actions/note_actions";

const mapStateToProps = (state, { match }) => {
  return {
    noteId: match.params.noteId,
    note: state.notes.all[match.params.noteId]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNote: noteId => dispatch(fetchNote(noteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShow);
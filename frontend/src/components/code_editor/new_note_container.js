import { connect } from "react-redux";
import { composeNote, updateNote } from "../../actions/note_actions";
import { getResources } from "../../actions/webscrap_actions";
import NewNote from "./new_note";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    newNote: state.notes.new,
    newResources: state.notes.newResources
  }
}

const mapDispatchToProps = dispatch => {
  return {
    composeNote: noteData => dispatch(composeNote(noteData)),
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
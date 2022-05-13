import { connect } from "react-redux";
import { composeNote, updateNote } from "../../actions/note_actions";
import { getResources } from "../../actions/webscrap_actions";
import { getLanguage } from "../../util/webscrap_util";
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
    updateNote: (noteData, noteId) => dispatch(updateNote(noteData, noteId)),
    getResources: codebody => getResources(codebody),
    getLanguage: codebody => getLanguage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
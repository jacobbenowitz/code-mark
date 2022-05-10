import { connect } from "react-redux";
import { composeNote } from "../../actions/note_actions";
import NewNote from "./new_note";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    newNote: state.notes.new
  }
}

const mapDispatchToProps = dispatch => {
  return {
    composeNote: noteData => dispatch(composeNote(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
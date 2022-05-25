import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchNotes } from "../../actions/note_actions";
import { fetchCurrentUser } from "../../actions/session_actions";
import LikedNotes from "./liked_notes";


const mapStateToProps = (state, { match }) => {
  return {
    allNotes: state.notes.all,
    likedNoteIds: state.session.user.note_likes,
    currentUser: state.session.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedNotes);
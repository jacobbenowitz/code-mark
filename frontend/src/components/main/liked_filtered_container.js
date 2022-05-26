import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchNotes } from "../../actions/note_actions";
import { fetchCurrentUser } from "../../actions/session_actions"
import { fetchUsers } from "../../actions/user_actions"
import LikedFiltered from './liked_filtered';

const mapStateToProps = (state, {match}) => {

  return {
    allNotes: state.notes.all,
    allUsers: state.users.all,
    currentUser: state.session.user,
    likedNoteIds: state.session.user.note_likes,
    filter: match.params.tag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikedFiltered));
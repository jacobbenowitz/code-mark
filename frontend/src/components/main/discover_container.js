import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Discover from "./discover";
import { fetchNotes } from "../../actions/note_actions";
import { fetchUsers } from "../../actions/user_actions";


const mapStateToProps = (state, { match }) => {
  const uniqueTags = [...new Set(state.session.tags)]

  return {
    allNotes: Object.values(state.notes.all),
    currentUser: state.session.user,
    tags: uniqueTags,
    users: state.users.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: userId => dispatch(fetchNotes(userId)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discover));
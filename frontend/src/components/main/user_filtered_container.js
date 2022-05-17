import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFiltered from "./user_filtered";
import { fetchUserNotes } from "../../actions/note_actions";
import { fetchUser } from "../../actions/user_actions";


const mapStateToProps = (state, { match }) => {
  return {
    userNotes: Object.values(state.notes.user),
    currentUser: state.session.user,
    tags: state.session.tags,
    userId: match.params.userId,
    user: state.users.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId)),
    fetchUser: userId => dispatch(fetchUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFiltered);
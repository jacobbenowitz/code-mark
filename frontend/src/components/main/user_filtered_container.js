import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFiltered from "./user_filtered";
import { fetchUserNotes } from "../../actions/note_actions";
import { fetchUser, fetchUsers, changeUserFollowers } from "../../actions/user_actions";
import { fetchCurrentUser } from '../../actions/session_actions';
import { filterOnlyPublicNotes, orderUserNotes } from "../../util/selectors";

const mapStateToProps = (state, { match }) => {
  const publicNotes = filterOnlyPublicNotes(Object.values(state.notes.user))
  const orderedNotes = orderUserNotes(publicNotes)
  return {
    userNotes: orderedNotes,
    currentUser: state.session.user,
    tags: state.session.tags,
    userId: match.params.userId,
    user: state.users.user,
    status: state.notes.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    changeUserFollowers: userId => dispatch(changeUserFollowers(userId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFiltered));
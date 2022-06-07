import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFilteredByTag from "./user_filtered_by_tag";
import { fetchUserNotes, fetchNotes } from "../../actions/note_actions";
import { fetchUser, fetchUsers, changeUserFollowers } from "../../actions/user_actions";
import { fetchCurrentUser } from '../../actions/session_actions';

const mapStateToProps = ({ notes, users, session }, { match }) => {
  return {
    userNotes: notes.user,
    user: users.user,
    currentUser: session.user,
    userId: match.params.userId,
    filter: match.params.tag,
    status: notes.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: (userId) => dispatch(fetchUserNotes(userId)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    changeUserFollowers: userId => dispatch(changeUserFollowers(userId)),
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFilteredByTag));
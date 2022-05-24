import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFiltered from "./user_filtered";
import { fetchUserNotes } from "../../actions/note_actions";
import { fetchUser, changeUserFollowers } from "../../actions/user_actions";
import { fetchCurrentUser } from '../../actions/session_actions';

const mapStateToProps = (state, { match }) => {
  // debugger;
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
    fetchUser: userId => dispatch(fetchUser(userId)),
    changeUserFollowers: userId => dispatch(changeUserFollowers(userId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFiltered));
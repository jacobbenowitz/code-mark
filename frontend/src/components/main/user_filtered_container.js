import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFiltered from "./user_filtered";
import { fetchUserNotes } from "../../actions/note_actions";
import { fetchUser } from "../../actions/user_actions";


const mapStateToProps = (state, { match }) => {
  const uniqueTags = [...new Set(state.session.tags)]
  
  return {
    userNotes: Object.values(state.notes.user),
    currentUser: state.session.user,
    tags: uniqueTags,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserFiltered));
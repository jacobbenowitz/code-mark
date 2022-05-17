import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import UserFiltered from "./user_filtered";
import { fetchUserNotes } from "../../actions/note_actions";


const mapStateToProps = (state, { match }) => {
  return {
    userNotes: Object.values(state.notes.user),
    currentUser: state.session.user,
    tags: state.session.tags,
    userId: match.params.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFiltered);
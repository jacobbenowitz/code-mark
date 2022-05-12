import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Discover from "./discover";
import { fetchNotes } from "../../actions/note_actions";


const mapStateToProps = (state, { match }) => {
  return {
    allNotes: Object.values(state.notes.all),
    currentUser: state.session.user,
    tags: state.session.tags
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: userId => dispatch(fetchNotes(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discover));
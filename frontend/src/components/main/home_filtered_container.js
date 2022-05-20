import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import HomeFiltered from "./home_filtered";
import { fetchUserNotes } from "../../actions/note_actions";

const mapStateToProps = (state, { match }) => {
  const uniqueTags = [...new Set(state.session.tags)]

  return {
    userNotes: state.notes.user,
    currentUser: state.session.user,
    tags: uniqueTags,
    filter: match.params.tag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFiltered));
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import HomeFiltered from "./home_filtered";

const mapStateToProps = (state, { match }) => {
  return {
    userNotes: state.notes.user,
    currentUser: state.session.user,
    tags: state.session.tags,
    filter: match.params.tag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotes: userId => dispatch(fetchUserNotes(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFiltered));
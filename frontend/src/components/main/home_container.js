import { connect } from "react-redux";
import Home from "./home";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    userNotes: state.notes.user,
    tags: state.session.tags,
    currentUser: state.session.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserFollowers: userId => dispatch(changeUserFollowers(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
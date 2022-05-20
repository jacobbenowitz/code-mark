import { connect } from "react-redux";
import Home from "./home";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  const uniqueTags = [...new Set(state.session.tags)]
  return {
    userNotes: state.notes.user,
    tags: uniqueTags
  }
}

// const mapDispatchToProps = dispatch => {

// }

export default withRouter(connect(mapStateToProps)(Home));
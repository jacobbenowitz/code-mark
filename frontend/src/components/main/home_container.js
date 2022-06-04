import { connect } from "react-redux";
import Home from "./home";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    userNotes: state.notes.user,
    tags: state.session.tags,
    status: state.notes.status
  }
}

// const mapDispatchToProps = dispatch => {

// }

export default withRouter(connect(mapStateToProps)(Home));
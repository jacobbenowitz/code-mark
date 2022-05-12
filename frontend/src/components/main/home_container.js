import { connect } from "react-redux";
import Home from "./home"

const mapStateToProps = state => {
  return {
    userNotes: state.notes.user,
    tags: state.session.tags
  }
}

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(Home);
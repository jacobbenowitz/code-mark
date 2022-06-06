import { connect } from "react-redux";
import Home from "./home";
import { withRouter } from "react-router-dom";
import {fetchUsers} from '../../actions/user_actions'

const mapStateToProps = state => {
  return {
    userNotes: state.notes.user,
    tags: state.session.tags,
    currentUser: state.session.user,
    allUsers: state.users.all,
    status: state.notes.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserFollowers: userId => dispatch(changeUserFollowers(userId)),
    fetchUsers: () => dispatch(fetchUsers())

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
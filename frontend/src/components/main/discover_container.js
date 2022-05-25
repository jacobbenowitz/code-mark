import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Discover from "./discover";
import { fetchNotes } from "../../actions/note_actions";
import { fetchUsers } from "../../actions/user_actions";
import { filterOnlyPublicNotes } from "../../util/selectors";
import { selectNoteTags } from "../../util/selectors";


const mapStateToProps = (state, { match }) => {
  const filteredNotes = filterOnlyPublicNotes(Object.values(state.notes.all))
  const discoverTags = selectNoteTags(filteredNotes)
  return {
    allNotes: filteredNotes,
    tags: discoverTags,
    currentUser: state.session.user,
    users: state.users.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: userId => dispatch(fetchNotes(userId)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discover));
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Discover from "./discover";
import { fetchNotes } from "../../actions/note_actions";
import { fetchUsers } from "../../actions/user_actions";
import { filterOnlyPublicNotes, orderUserNotes } from "../../util/selectors";
import { selectNoteTags } from "../../util/selectors";


const mapStateToProps = (state, { match }) => {
  const filteredNotes = filterOnlyPublicNotes(Object.values(state.notes.all))
  const orderedNotes = orderUserNotes(filteredNotes)
  const discoverTags = selectNoteTags(filteredNotes)
  debugger
  return {
    allNotes: orderedNotes,
    tags: discoverTags,
    currentUser: state.session.user,
    users: state.users.all,
    noteCount: filteredNotes?.length || 0,
    status: state.notes.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: userId => dispatch(fetchNotes(userId)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Discover));
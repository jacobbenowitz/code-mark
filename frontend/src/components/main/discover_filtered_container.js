import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import DiscoverFiltered from "./discover_filtered";
import { fetchNotes } from "../../actions/note_actions";
import { fetchUser } from "../../actions/user_actions";
import { filterOnlyPublicNotes } from "../../util/selectors";
import { selectNoteTags } from "../../util/selectors";


const mapStateToProps = (state, { match }) => {
  const publicNotes = filterOnlyPublicNotes(Object.values(state.notes.all));
  const discoverTags = selectNoteTags(publicNotes)
  return {
    allNotes: publicNotes,
    tags: discoverTags,
    currentUser: state.session.user,
    filter: match.params.tag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiscoverFiltered));
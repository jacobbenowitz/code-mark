import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchNotes } from "../../actions/note_actions";
import { filterOnlyPublicNotes } from "../../util/selectors";
import { selectNoteTags, selectFollowingNotes } from "../../util/selectors";
import Following from './following';

const mapStateToProps = (state) => {
  const publicNotes = filterOnlyPublicNotes(Object.values(state.notes.all));
  const followingTags = selectNoteTags(publicNotes)
  return {
    allNotes: publicNotes,
    tags: followingTags,
    currentUser: state.session.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    selectFollowingNotes: selectFollowingNotes
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));
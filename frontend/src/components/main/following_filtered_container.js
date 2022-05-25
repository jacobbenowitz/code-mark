import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchNotes } from "../../actions/note_actions";
// import { filterOnlyPublicNotes } from "../../util/selectors";
// import { selectNoteTags, selectFollowingNotes } from "../../util/selectors";
import FollowingFiltered from './following_filtered';

const mapStateToProps = (state, {match}) => {
  // const publicNotes = filterOnlyPublicNotes(Object.values(state.notes.all));
  // const followingUserIds = state.session.user.following;
  // const followingNotes = selectFollowingNotes(followingUserIds, publicNotes);
  // const followingTags = selectNoteTags(followingNotes);

  return {
    followingNotes: followingNotes,
    tags: followingTags,
    currentUser: state.session.user,
    filter: match.params.tag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowingFiltered));
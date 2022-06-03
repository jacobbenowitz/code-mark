import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchNotes } from "../../actions/note_actions";
import { fetchCurrentUser } from "../../actions/session_actions"
import { fetchUsers } from "../../actions/user_actions"
import Following from './following';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes,
  orderUserNotes
} from '../../util/selectors';

const mapStateToProps = (state) => {
  const currentUser = state.session.user;
  const followingUserIds = currentUser.following;
  const allUsers = state.users.all;
  const allNotes = state.notes.all;
  const followingUsers = filterUsersById(allUsers, followingUserIds)
  const followingNotes = selectFollowingUsersNotes(followingUsers, allNotes)
  const publicNotes = filterOnlyPublicNotes(followingNotes)
  const orderedNotes = orderUserNotes(publicNotes)
  const followingTags = selectNoteTags(publicNotes)

  return {
    followingNotes: orderedNotes,
    followingUsers: followingUsers,
    currentUser: currentUser,
    noteCount: orderedNotes?.length,
    followingTags: followingTags
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));
import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes
} from '../../util/selectors';


export default class FollowingFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingNotes: [],
      followingTags: [],
      filter: undefined
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser, filter } = this.props;

    if (Object.values(allNotes).length && Object.values(allUsers).length
      || filter !== this.state.filter) {
      const followingUserIds = currentUser.following;
      const followingUsers = filterUsersById(allUsers, followingUserIds)
      const followingNotes =
        selectFollowingUsersNotes(followingUsers, allNotes)
      const publicNotes = filterOnlyPublicNotes(followingNotes)
      const followingTags = selectNoteTags(publicNotes)
      const filteredFollowingNotes = filterNotesByTag(filter, publicNotes)

      this.setState({
        notes: orderUserNotes(filteredFollowingNotes),
        followingNotes: followingTags,
        filter: filter
      })
    }
  }

  render() {
    return (
      <div className='main-sidebar'>
        <SideCarMenu tagType={'following'} tags={this.props.tags} />

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>My Follower's Notes</h1>
            </div>
            <div className='note-list-container'>
              {this.state.followingNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                <AllNotes notes={this.state.followingNotes} />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
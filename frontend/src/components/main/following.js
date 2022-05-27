import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes
} from '../../util/selectors';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';



export default class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingNotes: [],
      followingTags: [],
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser } = this.props;

    if (Object.values(allNotes).length && Object.values(allUsers).length && !this.state.followingNotes.length) {
      const followingUserIds = currentUser.following;
      const followingUsers = filterUsersById(allUsers, followingUserIds)
      const followingNotes =
      selectFollowingUsersNotes(followingUsers, allNotes)
      const publicNotes = filterOnlyPublicNotes(followingNotes)
      const followingTags = selectNoteTags(publicNotes)
      if (followingNotes.length !== this.state.followingNotes.length ||
        followingTags.length !== this.state.followingTags.length) {
        this.setState({
          followingNotes: publicNotes,
          followingTags: followingTags,
        })
      }
    }
  }

  isMobile() {
    // debugger;
    return window.innerWidth < 600;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'following'} tags={this.state.followingTags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'default'}
              title={'Following'}
              noteCount={this.state.followingNotes.length}
            />
            <div className='note-list-container'>
              {this.state.followingNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                this.isMobile() ?
                  <MobileNotes notes={this.state.followingNotes} />
                  : <AllNotes notes={this.state.followingNotes} />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes,
  filterNotesByTag,
  orderUserNotes
} from '../../util/selectors';
import SectionTitle from '../UI/section_title';


export default class FollowingFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingNotes: [],
      followingTags: [],
      filter: undefined
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.props.fetchNotes();
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser, filter } = this.props;
    // && filter !== this.state.filter
    if (Object.values(allNotes).length && Object.values(allUsers).length && filter !== this.state.filter) {
      const followingUserIds = currentUser.following;
      const followingUsers = filterUsersById(allUsers, followingUserIds)
      const followingNotes =
        selectFollowingUsersNotes(followingUsers, allNotes)
      const publicNotes = filterOnlyPublicNotes(followingNotes)
      const followingTags = selectNoteTags(publicNotes)
      const filteredFollowingNotes = filterNotesByTag(filter, publicNotes)

      this.setState({
        followingNotes: orderUserNotes(filteredFollowingNotes),
        followingTags: followingTags,
        filter: filter
      })
    }
  }

  isMobile(){
    // debugger;
    return window.innerWidth < 680;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'following'} tags={this.state.followingTags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              title={'Following'}
              noteCount={this.state.followingNotes.length}
              filter={this.state.filter}
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
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
    const mobileStatus = this.isMobile();

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
      
      if (this.state.mobile !== mobileStatus) {
        this.setState({ mobile: mobileStatus })
      }
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, filter, followingNotes, followingTags } = this.state;
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'following'} tags={followingTags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              title={'Following'}
              noteCount={followingNotes.length}
              filter={filter}
              status={this.props.status}
            />
            <div className='note-list-container'>
              {
                mobile ?
                  <MobileNotes
                    notes={followingNotes}
                    status={this.props.status}
                  />
                  : <AllNotes
                    notes={followingNotes}
                    status={this.props.status}
                  />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
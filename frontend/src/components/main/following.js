import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';
import MobileTags from './mobile/mobile_tags';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes,
  orderUserNotes
} from '../../util/selectors';

export default class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingNotes: [],
      followingTags: [],
      followingUsers: [],
      noteCount: 0,
      mobile: false,
      status: 'IDLE'
    }
  }

  
  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
    this.props.fetchNotes();
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser, status } = this.props;
      
    const mobileStatus = this.isMobile();
      
    if (allUsers && currentUser && status !== this.state.status) {
      const followingIds = currentUser.following
      const followingUsers = filterUsersById(allUsers, followingIds)
      const followingNotes = selectFollowingUsersNotes(followingUsers, allNotes)
      const publicNotes = filterOnlyPublicNotes(followingNotes)
      const orderedNotes = orderUserNotes(publicNotes)
      const followingTags = selectNoteTags(publicNotes)
      debugger

      this.setState({
        followingNotes: orderedNotes,
        followingTags: followingTags,
        followingUsers: followingUsers,
        noteCount: publicNotes?.length || 0,
        status: status,
        mobile: mobileStatus
      })
    }

  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, status, followingNotes,
      followingTags, followingUsers } = this.state;
    // const { followingNotes, followingTags, followingUsers,
    //   currentUser } = this.props;
    debugger

    let sideCarMenu, mobileTags;
    
    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'following'}
          tags={followingTags}
          status={status}
        />
      )
    }

    if (mobile && followingTags) {
      mobileTags = (
        <MobileTags
          tags={followingTags}
          type={'following'}
        />
      )
    }

    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        { sideCarMenu }

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'default'}
              title={'Following'}
              noteCount={followingNotes?.length || 0}
              status={status}
            />
            { mobileTags }
            <div className='note-list-container'>
              {
                mobile ?
                  <MobileNotes
                    notes={followingNotes}
                    status={status}
                  />
                  :
                  <AllNotes
                    notes={followingNotes}
                    status={status}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
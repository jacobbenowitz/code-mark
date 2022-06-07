import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';
import MobileTags from './mobile/mobile_tags';

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
    this.props.fetchCurrentUser();
    this.props.fetchNotes();
    this.props.fetchUsers();
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    // debugger
    const { followingNotes, followingTags, followingUsers,
      currentUser, status } = this.props;
    const mobileStatus = this.isMobile();
    if (status !== this.state.status) {
      this.setState({
        followingNotes: followingNotes ? followingNotes : [],
        followingTags: followingTags ? followingTags : [],
        followingUsers: followingUsers ? followingUsers : [],
        noteCount: followingNotes?.length || 0,
        status: status
      })
    }

    if (this.state.mobile !== mobileStatus) {
      this.setState({ mobile: mobileStatus })
    }

  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, status, noteCount, followingTags, followingNotes } = this.state;
    let sideCarMenu, mobileTags;

    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'following'}
          tags={followingTags ? followingTags : []}
          status={this.props.status}
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
              noteCount={noteCount}
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
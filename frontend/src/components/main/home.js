import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import SideCarMenu from './side_car_menu';
import SectionTitle from '../UI/section_title';
import UserHeader from '../profile/user_header';
import MobileTagsHome from './mobile/mobile_tags';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ mobile: this.isMobile()})
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile } = this.state;
    let sideCarMenu, mobileTags, userHeader;

    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'home'}
          tags={this.props.tags}
          status={this.props.status}
        />
      )
    }

    if (mobile && this.props.tags) {
      mobileTags = (
        <MobileTagsHome
          tags={this.props.tags}
          type={'home'}
        />
      )
    }
    
    if (this.props.currentUser) {
      userHeader = (
        <UserHeader
          user={this.props.currentUser}
          userNotes={this.props.userNotes}
          currentUser={this.props.currentUser}
          userId={this.props.currentUser.id}
          changeUserFollowers={this.props.changeUserFollowers}
          isCurrentUser={true}
          noteCount={this.props?.userNotes.length}
          fetchUsers={this.props.fetchUsers}
          allUsers={this.props.allUsers}
          followers={this.props.currentUser.followers}
          following={this.props.currentUser.following}
          userStatus={this.props.userStatus}
        />
      )
    }

    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        {sideCarMenu}
        <div className='home-main'>
          <NewNoteContainer />
          <div className='notes-section'>
            <SectionTitle
              // title={'My Notes'}
              noteCount={this.props?.userNotes.length}
              type={'default'}
              status={this.props.status}
              mobile={this.state.mobile}
            />
            {userHeader}
            {mobileTags}
            <div className='note-list-container'>
              <UserNotesContainer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
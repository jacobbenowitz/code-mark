import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import SideCarMenu from './side_car_menu';
import SectionTitle from '../UI/section_title';
import SidebarLoader from '../lazy_loaders/placeholder_components/sidebar_loader';
import MobileTagsHome from './mobile/mobile_tags_home';


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
    let sideCarMenu, mobileTags;

    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'home'}
          tags={this.props.tags}
        />
      )
    }

    if (mobile && this.props.tags) {
      mobileTags = (
        <MobileTagsHome tags={this.props.tags} />
      )
    }

    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        {sideCarMenu}
        <div className='home-main'>
          <NewNoteContainer />
          <div className='notes-section'>
            <SectionTitle
              title={'My Notes'}
              noteCount={this.props?.userNotes.length}
              type={'default'}
              status={this.props.status}
              mobile={this.state.mobile}
            />
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
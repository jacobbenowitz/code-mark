import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import SideCarMenu from './side_car_menu';
import SectionTitle from '../UI/section_title';
import UserHeader from '../profile/user_header';

export default class Home extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    if (this.isMobile()) {
      return (
        <div className='main-mobile'>
          {/* mobile menu was here */}
          <div className='home-main'>
            <NewNoteContainer />
            
            <div className='notes-section'>
              <SectionTitle
                title={'My Notes'}
                noteCount={this.props?.userNotes.length}
                type={'default'}
              />
              <UserHeader 
                user={this.props.currentUser}
                userNotes={this.props.userNotes}
                currentUser={this.props.currentUser}
                userId={this.props.currentUser.id}
                changeUserFollowers={this.props.changeUserFollowers}
                isCurrentUser={true}
                noteCount={this.props?.userNotes.length}
              />
              <div className='tags-wrapper-mobile'>
                <span className='tags-mobile-header'>Tags</span>
                <div className="code-note-tags-main">
                  {this.props.tags?.map((tag, i) =>
                    <NavLink to={`/home/tags/${tag}`}>
                      <div className="note-tag-mini link"
                        key={`${i}-tag`}>
                        {tag}
                      </div>
                    </NavLink>
                  )}
                  <div className='tag-spacer'></div>
                </div>
              </div>
              <div className='note-list-container'>
                <UserNotesContainer />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='main-sidebar'>
          <SideCarMenu
            tagType={'home'}
            tags={this.props.tags}
          />
          <div className='home-main'>
            <NewNoteContainer />
            <div className='notes-section'>
              <SectionTitle
                title={'My Notes'}
                noteCount={this.props?.userNotes.length}
                type={'default'}
              />
              
              <UserHeader
                user={this.props.currentUser}
                userNotes={this.props.userNotes}
                currentUser={this.props.currentUser}
                userId={this.props.currentUser.id}
                changeUserFollowers={this.props.changeUserFollowers}
                isCurrentUser={true}
                noteCount={this.props?.userNotes.length}
              />

              <div className='note-list-container'>
                <UserNotesContainer />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

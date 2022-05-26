import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import SideCarMenu from './side_car_menu';


export default class Home extends React.Component {

  isMobile() {
    return window.innerWidth < 600;
  }

  render() {
    if (window.innerWidth < 600) {
      return (
        <div className='main-mobile'>
          {/* mobile menu was here */}
          <div className='home-main'>
            <NewNoteContainer />
            <div className='notes-section'>
              <div className='tags-wrapper-mobile'>
                <span className='tags-mobile-header'>Tags</span>
                <div className="code-note-tags">
                  {this.props.tags?.map((tag, i) =>
                    <NavLink to={`/home/tags/${tag}`}>
                      <div className="note-tag-mini"
                        key={`${i}-tag`}>
                        {tag}
                      </div>
                    </NavLink>
                  )}
                </div>
              </div>
              <div className='section-title'>
                <h3>My Notes</h3>
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
          <SideCarMenu tagType={'home'} tags={this.props.tags} />

          <div className='home-main'>
            <NewNoteContainer />
            <div className='notes-section'>
              <div className='section-title'>
                <h3>My Notes</h3>
              </div>
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

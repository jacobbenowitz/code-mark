import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';

export default class Home extends React.Component {

  render() {
    if (window.innerWidth < 600) {
      return (
        <div className='main-mobile'>
          <div className='nav-menu-mobile'>
            <div className='nav-boxes'>
              <div className='nav-pages'>
                <h5>Pages</h5>
                <ul className='nav-list'>
                  <NavLink to={'/home'} className='nav-item-container'>
                    <div className='nav-item-link nav-home'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Home</span>
                    </div>
                  </NavLink>
                  <NavLink to={'/discover'} className='nav-item-container'>
                    <div className='nav-item-link'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DDiscover.svg" /> <span>Discover</span>
                    </div>
                  </NavLink>
                  <NavLink to={'/following'} className='nav-item-container'>
                    <div className='nav-item-link'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Following</span>
                    </div>
                  </NavLink>
                </ul>
                <h5>Tags</h5>
                <ul className='nav-list'>
                  {
                    this.props.tags?.map((tag, i) =>
                      <NavTagItem key={`tag-${i}`} tag={tag} />)
                  }
                </ul>
              </div>
            </div>
          </div>

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
    } else {
      return (
        <div className='main-sidebar'>
          <div className='nav-sidecar'>
            <div className='nav-boxes'>
              <div className='nav-pages'>
                <h5>Pages</h5>
                <ul className='nav-list'>
                  <NavLink to={'/home'} className='nav-item-container'>
                    <div className='nav-item-link nav-home'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Home</span>
                    </div>
                  </NavLink>
                  <NavLink to={'/discover'} className='nav-item-container'>
                    <div className='nav-item-link'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DDiscover.svg" /> <span>Discover</span>
                    </div>
                  </NavLink>
                  <NavLink to={'/following'} className='nav-item-container'>
                    <div className='nav-item-link'>
                      <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Following</span>
                    </div>
                  </NavLink>
                </ul>
                <h5>Tags</h5>
                <ul className='nav-list'>
                  {
                    this.props.tags?.map((tag, i) =>
                      <NavTagItem key={`tag-${i}`} tag={tag} />)
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className='home-main'>
            <NewNoteContainer />
            {/* <div className='notes-section'>
              <div className='section-title'>
                <h5>Recent Notes</h5>
              </div>
              <RecentNotesContainer />
            </div> */}
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

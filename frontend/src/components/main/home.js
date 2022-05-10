import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import UserNotesContainer from '../notes/user_notes_container';
import RecentNotesContainer from '../notes/recent_notes_container';

export default class Home extends React.Component {

  render() {
    return (
      <div className='main-sidebar'>

        <div className='nav-sidecar'>
          <div className='nav-boxes'>
            <div className='nav-pages'>
              <h5>Pages</h5>
              <ul></ul>
            </div>
            <div className='tags'>
              <h5>Tags</h5>
              <ul></ul>
            </div>
          </div>
        </div>

        <div className='home-main'>
          <NewNoteContainer />
          <div className='notes-section'>
            <div className='section-title'>
              <h5>Recent Notes</h5>
            </div>
            <div className='note-list-container'>
              <RecentNotesContainer />
            </div>
          </div>
          <div className='notes-section'>
            <div className='section-title'>
              <h5>All Notes</h5>
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

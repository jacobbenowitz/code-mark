import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import CodeNoteItem from '../notes/code_note_item';
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

          <div className='notes-section recent-notes'>
            <div className='section-title'>
              <h5>Recent Notes</h5>
            </div>
            <div className='note-list-container'>
              <RecentNotesContainer />
            </div>
          </div>

          <div className='notes-section all-notes'>
            <div className='section-title'>
              <h5>All Notes</h5>
            </div>
            <div className='note-list-container'>
              <CodeNoteItem />
              <CodeNoteItem />
            </div>
          </div>

        </div>

      </div>
    )
  }
}

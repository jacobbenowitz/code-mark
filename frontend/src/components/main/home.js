import React from 'react';
import NewNote from '../code_editor/new_note.js';

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
          <NewNote />
        </div>
      </div>
    )
  }
}

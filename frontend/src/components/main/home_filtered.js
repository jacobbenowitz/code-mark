import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import FilteredNotesContainer from '../notes/filtered_notes_container';
import SideCarMenu from './side_car_menu';

export default class HomeFiltered extends React.Component {

  render() {
    return (
      <div className='main-sidebar'>
        <SideCarMenu tagType={'home'} tags={this.props.tags} />

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>My notes</h1>
              <h5>Filtered by: {this.props.filter}</h5>
            </div>
            <div className='note-list-container'>
              <FilteredNotesContainer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

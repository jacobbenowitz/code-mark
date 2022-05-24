import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';

export default class Discover extends React.Component {

  componentWillMount() {
    this.props.fetchNotes();
  };

  render() {
    return (
      <div className='main-sidebar'>
        <SideCarMenu tagType={'discover'} tags={this.props.tags} />

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>Discover Notes</h1>
            </div>
            <div className='note-list-container'>
              {this.props.allNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                <AllNotes notes={this.props.allNotes} />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

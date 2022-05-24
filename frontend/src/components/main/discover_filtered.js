import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterNotesByTag,
  orderUserNotes
} from '../../util/selectors';

export default class DiscoverFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: undefined,
      notes: []
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
  };

  componentWillReceiveProps(nextState) {
    if (nextState.allNotes && nextState.filter !== this.state.filter) {
      let filtered = filterNotesByTag(nextState.filter, nextState.allNotes);
      this.setState({
        notes: orderUserNotes(filtered),
        filter: nextState.filter
      })
    }
  }

  render() {
    return (
      <div className='main-sidebar'>
        <div className='nav-sidecar'>
          <SideCarMenu tagType={'discover'} tags={this.props.tags} />
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>Discover Notes</h1>
              <h5>Filtered by: {this.state.filter}</h5>
            </div>
            <div className='note-list-container'>
              {this.state.notes.length === 0 ? (
                <span>No notes found</span>
              ) :
                <AllNotes notes={this.state.notes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

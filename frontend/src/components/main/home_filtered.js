import React from 'react';
import NewNoteContainer from '../code_editor/new_note_container';
import RecentNotesContainer from '../notes/recent_notes_container';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import FilteredNotesContainer from '../notes/filtered_notes_container';
import SideCarMenu from './side_car_menu';
import AllNotes from './all_notes';
import { filterNotesByTag, orderUserNotes } from '../../util/selectors';

export default class HomeFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: [],
      tags: [],
      filter: undefined
    }
  }

  componentWillMount() {
    this.props.fetchCurrentUser();
    this.props.fetchUserNotes(this.props.currentUser.id);
  }

  componentDidUpdate() {
    const { userNotes, currentUser, tags, filter } = this.props;
    if (userNotes.length && Object.values(currentUser).length
      && filter !== this.state.filter) {

      const filteredNotes = filterNotesByTag(filter, userNotes)

      this.setState({
        userNotes: orderUserNotes(filteredNotes),
        tags: tags,
        filter: filter
      })
    }
  }

  isMobile() {
    return window.innerWidth < 600;
  }

  render() {
    return (
      <div className='main-sidebar'>
        <SideCarMenu tagType={'home'} tags={this.props.tags} />

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>My notes</h1>
              <h5>Filtered by: {this.state.filter}</h5>
            </div>
            <div className='note-list-container'>
              {/* <FilteredNotesContainer /> */}
              {this.state.userNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                this.isMobile() ?
                  <MobileNotes notes={this.state.userNotes} />
                  : <AllNotes notes={this.state.userNotes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

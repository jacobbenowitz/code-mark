import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterNotesByTag,
  orderUserNotes
} from '../../util/selectors';
import { selectNoteTags, selectLikedNotes } from "../../util/selectors";

export default class LikedNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      likedTags: []
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.notes.length && nextProps.allNotes) {
      const likedNotes =
        selectLikedNotes(nextProps.allNotes, nextProps.likedNoteIds);
      const likedTags = selectNoteTags(likedNotes)
      this.setState({
        notes: likedNotes,
        likedTags: likedTags
      })
    }
  }

  render() {
    return (
      <div className='main-sidebar'>
        <div className='nav-sidecar'>
          <SideCarMenu tagType={'discover'} tags={this.props?.tags} />
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>Liked Notes</h1>
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

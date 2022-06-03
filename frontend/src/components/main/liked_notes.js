import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import {
  filterNotesByTag,
  orderUserNotes
} from '../../util/selectors';
import { selectNoteTags, selectLikedNotes } from "../../util/selectors";
import SectionTitle from '../UI/section_title';

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
    this.props.fetchCurrentUser();
  };

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    const { allNotes, likedNoteIds, currentUser } = this.props;
    if (Object.values(allNotes).length && likedNoteIds.length && !this.state.notes.length) {
      const likedNotes = selectLikedNotes(allNotes, likedNoteIds);
      const likedTags = selectNoteTags(likedNotes)
      this.setState({
        notes: likedNotes,
        likedTags: likedTags
      })
    }
  }

  isMobile(){
    return window.innerWidth < 600;
  }


  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <div className='nav-sidecar'>
          <SideCarMenu tagType={'likes'} tags={this.state.likedTags} />
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'default'}
              title={'Liked'}
              noteCount={this.state.notes.length}
            />
            <div className='note-list-container'>
              {
                this.isMobile() ?
                <MobileNotes notes={this.state.notes} />
                : <AllNotes notes={this.state.notes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

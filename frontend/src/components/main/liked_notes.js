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
import MobileTags from './mobile/mobile_tags';

export default class LikedNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedNotes: [],
      likedTags: [],
      noteCount: 0,
      status: 'IDLE',
      mobile: false,
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
    const { allNotes, likedNoteIds, currentUser, status } = this.props;
    const mobileStatus = this.isMobile();

    if (status === 'DONE' && likedNoteIds.length && !this.state.likedNotes.length) {
      const likedNotes = selectLikedNotes(allNotes, likedNoteIds);
      const likedTags = selectNoteTags(likedNotes)
      console.log(likedNotes)
      this.setState({
        likedNotes: likedNotes,
        noteCount: likedNotes.length,
        likedTags: likedTags,
        status: status
      })
    }

    if (this.state.mobile !== mobileStatus) {
      this.setState({ mobile: mobileStatus })
    }
  }

  isMobile(){
    return window.innerWidth < 600;
  }


  render() {
    const { mobile, status, likedNotes, likedTags, noteCount } = this.state;
    let sideCarMenu, mobileTags;

    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'likes'}
          tags={likedTags}
        />
      )
    }

    if (mobile && likedTags) {
      mobileTags = (
        <MobileTags
          tags={likedTags}
          type={'likes'}
        />
      )
    }
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        <div className='nav-sidecar'>
        { sideCarMenu}
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'default'}
              title={'Liked'}
              noteCount={noteCount}
              status={status}
            />
            { mobileTags }
            <div className='note-list-container'>
              {
                mobile ?
                  <MobileNotes
                    notes={likedNotes}
                    status={status}
                  />
                  :
                  <AllNotes
                    notes={likedNotes}
                    status={status}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

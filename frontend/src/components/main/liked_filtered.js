import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import {
  filterOnlyPublicNotes,
  selectNoteTags,
  filterUsersById,
  selectFollowingUsersNotes,
  filterNotesByTag,
  orderUserNotes,
  selectLikedNotes
} from '../../util/selectors';
import SectionTitle from '../UI/section_title';
import MobileNotes from './mobile_notes';

export default class LikedFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedNotes: [],
      likedTags: [],
      filter: undefined,
      mobile: false
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
  }
  
  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ mobile: this.isMobile() })
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser, filter, likedNoteIds } = this.props;
    const mobileStatus = this.isMobile();

    if (Object.values(allNotes).length && likedNoteIds.length && filter !== this.state.filter) {
      const likedNotes = selectLikedNotes(allNotes, likedNoteIds);
      const likedTags = selectNoteTags(likedNotes)
      const filteredLikedNotes = filterNotesByTag(filter, likedNotes)
      this.setState({
        likedNotes: filteredLikedNotes,
        likedTags: likedTags,
        filter: filter
      })

    }
    if (this.state.mobile !== mobileStatus) {
      this.setState({ mobile: mobileStatus })
    }
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, filter, likedNotes, likedTags } = this.state;
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'likes'} tags={likedTags} status={this.props.status}/>

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              filter={filter}
              title={'Liked'}
              noteCount={likedNotes.length}
              status={this.props.status}
            />
            <div className='note-list-container'>
              {mobile ?
                <MobileNotes
                  notes={likedNotes}
                  status={this.props.status}
                />
                : <AllNotes
                  notes={likedNotes}
                  status={this.props.status}
                />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
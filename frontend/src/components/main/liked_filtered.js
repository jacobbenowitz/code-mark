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

export default class LikedFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedNotes: [],
      likedTags: [],
      filter: undefined
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
    this.props.fetchCurrentUser();
    this.props.fetchUsers();
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    const { allNotes, allUsers, currentUser, filter, likedNoteIds } = this.props;
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
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'likes'} tags={this.state.likedTags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              filter={this.state.filter}
              title={'Liked'}
              noteCount={this.state.likedNotes.length}
            />
            <div className='note-list-container'>
              {this.state.likedNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
              this.isMobile() ?
                <MobileNotes notes={this.state.likedNotes} />
                : <AllNotes notes={this.state.likedNotes} />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
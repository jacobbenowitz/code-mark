import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';



export default class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followingNotes: [],
      followingTags: [],
      noteCount: 0
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
    const { followingNotes, followingUsers, currentUser,
      noteCount, followingTags, status } = this.props;

    if (status !== this.state.status || followingNotes && Object.values(followingUsers).length && (this.state.followingNotes !== followingNotes || this.state.followingTags !== followingTags)) {
      this.setState({
        followingNotes: followingNotes,
        followingTags: followingTags,
        noteCount: noteCount,
        status: status
      })
    }
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'following'} tags={this.state.followingTags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'default'}
              title={'Following'}
              noteCount={this.state.noteCount}
              status={this.state.status}
            />
            <div className='note-list-container'>
              {
                this.isMobile() ?
                  <MobileNotes
                    notes={this.state.followingNotes}
                    status={this.state.status}
                  />
                  :
                  <AllNotes
                    notes={this.state.followingNotes}
                    status={this.state.status}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
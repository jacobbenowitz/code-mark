import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import UserHeader from '../profile/user_header';
import MobileNotes from './mobile_notes';
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

export default class UserFilteredByTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userNotes: [],
      userTags: [],
      user: {},
      filter: undefined,
      mobile: false,
      status: 'IDLE'
    }
  }
  
  componentDidMount() {
    const mobileStatus = this.isMobile();
    window.scrollTo(0, 0)
    this.props.fetchUser(this.props.userId);
    this.props.fetchUserNotes(this.props.userId);
    this.setState({mobile: mobileStatus})
  }

  componentDidUpdate() {
    const { userNotes, user, currentUser,
      userId, filter, status } = this.props;
    if (filter !== this.state.filter && userNotes && user && status === 'DONE') {
      const publicNotes = filterOnlyPublicNotes(Object.values(userNotes))
      const filteredNotes = filterNotesByTag(filter, publicNotes)
      const orderedNotes = orderUserNotes(filteredNotes)
      const userTags = selectNoteTags(publicNotes)

      this.setState({
        userNotes: orderedNotes,
        userTags: userTags,
        user: user,
        filter: filter,
        status: status
      })
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {
    const { userNotes, userTags, user, filter, mobile, status } = this.state;
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        {/* /users/:userId/tags/:tag */}
        <SideCarMenu
          tags={userTags}
          tagType={`users/${this.props.userId}`}
          status={status}
          user={this.props.userId}
        />
        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              filter={filter}
              title={`${user?.username}'s Notes`}
              noteCount={userNotes.length}
              status={status}
            />
              {/* <UserHeader
                user={user}
                userNotes={userNotes}
                currentUser={this.props.currentUser}
                userId={this.props.userId}
                changeUserFollowers={this.props.changeUserFollowers}
                fetchUsers={this.props.fetchUsers}
              /> */}
            <div className={'note-list-container'}>
              {
                mobile ?
                  <MobileNotes
                    notes={userNotes}
                    status={status}
                  />
                  : <AllNotes
                    notes={userNotes}
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

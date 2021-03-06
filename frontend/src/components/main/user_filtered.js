import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import UserHeader from '../profile/user_header';
import MobileNotes from './mobile_notes';

export default class UserFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userNotes: [],
      currentUser: {}
    }
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userId);
    this.props.fetchUserNotes(this.props.userId);
    this.props.fetchUsers()
  };

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    const { user, userNotes, currentUser } = nextProps;
    if (user && userNotes && currentUser) {
      this.setState({
        user: user,
        userNotes: userNotes,
        currentUser: currentUser
      })
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {

    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu
          tags={this.props.tags}
          tagType={`users/${this.state.user._id}`}
          status={this.props.status}
          user={this.props.userId}
        />
        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              {Object.values(this.state.currentUser).length &&
                Object.values(this.state.user).length ? (
                <UserHeader
                    user={this.state.user}
                    userNotes={this.state.userNotes}
                    currentUser={this.state.currentUser}
                    userId={this.props.userId}
                    changeUserFollowers={this.props.changeUserFollowers}
                    fetchUsers={this.props.fetchUsers}
                    isCurrentUser={false}
                    allUsers={this.props.allUsers}
                    followers={this.state.user.followers}
                    following={this.state.user.following}
                    userStatus={this.props.userStatus}
                />
              ) : ""}
            </div>
            <div className={'note-list-container'}>
              {
                this.isMobile() ?
                  <MobileNotes
                    notes={this.props.userNotes}
                    status={this.props.status}
                  />
                  : <AllNotes
                    notes={this.props.userNotes}
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

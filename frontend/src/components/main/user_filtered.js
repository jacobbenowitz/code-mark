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
        {/* NEEDS TO BE REFACTORED FOR FILTERING USER'S TAGS (NOT HOME) */}
        <SideCarMenu tags={this.props.tags} tagType={'/home'} />
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
                />
              ) : ""}
            </div>
            <div className={'note-list-container'}>
              {this.props.userNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                // <AllNotes notes={this.props.userNotes} />
                this.isMobile() ?
                  <MobileNotes notes={this.props.userNotes} />
                  : <AllNotes notes={this.props.userNotes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

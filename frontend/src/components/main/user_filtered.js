import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu'

export default class UserFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      following: undefined,
      user: {},
      userNotes: []
    }
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserNotes(this.props.userId);
    this.props.fetchUser(this.props.userId);
  };

  componentWillReceiveProps(nextProps) {

    if (typeof this.state.following === 'undefined' &&
      nextProps.currentUser.following) {
      const following = nextProps.currentUser.following.includes(nextProps.userId)
      // const following = nextProps.user.follows.includes(nextProps.userId)
      this.setState({ following: following });
    }
    if (!this.state.userNotes.length && nextProps.userNotes.length) {
      this.setState({
        user: nextProps.user,
        userNotes: nextProps.userNotes
      });
    }
  }

  handleFollow() {
    this.props.changeUserFollowers(this.props.userId);
    this.setState({ following: true });
  }

  handleUnfollow() {
    this.props.changeUserFollowers(this.props.userId);
    this.setState({ following: false });
  }

  render() {
    // debugger;
    return (
      <div className='main-sidebar'>
        {/* NEEDS TO BE REFACTORED FOR FILTERING USER'S TAGS (NOT HOME) */}
        <SideCarMenu tags={this.props.tags} tagType={'/home'} />

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>{this.props.user.username}'s Notes</h1>
              {
                this.props.currentUser.id !== this.props.user._id ?
                  this.state.following ?
                    <button id='user-unfollow' onClick={() => this.handleUnfollow()}>Unfollow</button>
                    :
                    <button id='user-follow' onClick={() => this.handleFollow()}>Follow</button>
                  :
                  ''
              }
            </div>
            <div className='note-list-container'>
              {this.props.userNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                <AllNotes notes={this.props.userNotes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import UserHeader from '../profile/user_header';

export default class UserFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userNotes: []
    }
  }

  componentWillMount() {
    this.props.fetchUserNotes(this.props.userId);
    this.props.fetchUser(this.props.userId);
  };

  componentDidUpdate() {
    if (!this.state.userNotes.length && this.props.userNotes.length) {
      this.setState({
        user: this.props.user,
        userNotes: this.props.userNotes
      });
    }
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
              <UserHeader user={this.props.user} />
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

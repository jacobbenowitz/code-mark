import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';

export default class UserFiltered extends React.Component {

  componentWillMount() {
    this.props.fetchUserNotes(this.props.userId);
  };

  render() {
    return (
      <div className='main-sidebar'>
        <div className='nav-sidecar'>
          <div className='nav-boxes'>
            <div className='nav-pages'>
              <h5>Pages</h5>
              <ul className='nav-list'>
                <NavLink to={'/home'} className='nav-item-container'>
                  <div className='nav-item-link nav-home'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" /> <span>Home</span>
                  </div>
                </NavLink>
                <NavLink to={'/discover'} className='nav-item-container'>
                  <div className='nav-item-link'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DDiscover.svg" /> <span>Discover</span>
                  </div>
                </NavLink>
                <NavLink to={'/following'} className='nav-item-container'>
                  <div className='nav-item-link'>
                    <img src="https://code-mark.s3.amazonaws.com/type%3DFollowing.svg" /> <span>Following</span>
                  </div>
                </NavLink>
              </ul>
              <h5>Tags</h5>
              <ul className='nav-list'>
                {this.props.tags?.map(tag => <NavTagItem tag={tag} />)}
              </ul>
            </div>
          </div>
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <div className='section-title'>
              <h1>User's Notes</h1>
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

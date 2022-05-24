import React from 'react';
import { NavLink } from 'react-router-dom';
import NavTagItem from '../tags/nav_tag_item';
import AllNotes from './all_notes';

export default class UserFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      following: undefined
    }
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserNotes(this.props.userId);
    this.props.fetchUser(this.props.userId);
    // setState of following status
    
    // debugger;
    // document.getElementById('user-follow').style.display = this.state.following ? 'none' : 'block';
    // document.getElementById('user-unfollow').style.display = this.state.following ? 'block' : 'none';
  };

  componentWillReceiveProps(nextProps){
    if(typeof this.state.following === 'undefined'){
      this.setState({following:nextProps.following});
    }
  }

  handleFollow(){
    debugger;
    // document.getElementById('user-follow').style.display = 'none';
    // document.getElementById('user-unfollow').style.display = 'block';
    // debugger;
    // let newUser = this.props.user;
    // newUser.followers.push(this.props.currentUser.id);
    this.props.changeUserFollowers(this.props.userId);
    this.setState({following:true});
  }

  handleUnfollow(){
    debugger;
    // document.getElementById('user-follow').style.display = 'block';
    // document.getElementById('user-unfollow').style.display = 'none';
    // let newUser = this.props.user;
    // newUser.followers = newUser.followers.filter(item => item !== this.props.currentUser.id);
    this.props.changeUserFollowers(this.props.userId);
    this.setState({following:false});
  }

  render() {
    // debugger;
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

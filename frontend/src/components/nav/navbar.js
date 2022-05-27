import React from "react";
import { Link } from 'react-router-dom';
import UserNavModal from "./user_nav_modal";
import MobileNav from "./mobile_nav";
import Avatar from '../profile/avatar';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      username: '',
      color: ''
    }
    this.getLinks = this.getLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentUser, fetchCurrentUser, loggedIn } = this.props;
    if (!Object.values(currentUser).length && loggedIn) {
      fetchCurrentUser()
    } else {
      this.setState({
        username: currentUser.username,
        color: currentUser.color
      })
    }
  }

  componentDidUpdate() {
    const { currentUser, loggedIn } = this.props;
    debugger
    if (loggedIn) {
      if (currentUser.color !== this.state.color ||
      currentUser.username !== this.state.username) {
        this.setState({
          username: currentUser.username,
          color: currentUser.color
        })
      }
    }
  }

  handleClick(e) {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  // render links based on loggedIn
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link className="settings nav-item"
            to={'/settings'}>Settings
          </Link>
          
          <Link className="logout nav-item" to={'/'}
            onClick={() => this.props.logout()}>Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-links">
          <Link to={'/signup'} className="signup button">Signup</Link>
          <Link to={'/login'} className="login button">Login</Link>
        </div>
      );
    }
  }

  render() {

    let avatarOrHamburger;

    window.innerWidth > 600 ? (
      avatarOrHamburger = (
        <Avatar
          username={this.state.username}
          handleClick={this.handleClick}
          color={this.state.color}
        />
      )
    ) : (
      avatarOrHamburger = (
        <MobileNav
          currentUser={this.props.currentUser}
          logout={this.props.logout}
        />
      )
    )

    const userLinks = this.getLinks();
    const modalClass = this.state.modalOpen ? " on" : " modal-off";

    return (
      <div id="nav-header">
        <div id="logo-container">
          <Link to={'/'}>
            <img className="nav-logo" src="https://code-mark.s3.amazonaws.com/codemark-logo-primary.svg" alt="CodeMark logo" />
          </Link>
        </div>
        <UserNavModal handleClick={this.handleClick}
          userLinks={userLinks} modalClass={modalClass} />
        {this.props.loggedIn ? (
          <div id="user-links-container">
            {avatarOrHamburger}
          </div>
        ) : (userLinks)}

      </div>
    )
  }
}

import React from "react";
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/')
  }

  // render links based on loggedIn
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <button onClick={this.logoutUser}>Logout</button>
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
    return (
      <div id="nav-header">
        <div id="logo-container">
          <Link to={'/'}
          >Code<strong>Mark</strong>
          </Link>
        </div>
        <div className="search-bar">
        </div>
        <div id="user-links-container">
          {this.getLinks()}
        </div>
      </div>
    )
  }
}

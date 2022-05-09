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
  }

  // render links based on loggedIn
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={'/home'}>My notes</Link>
          <Link to={'/discover'}>discover</Link>
          <Link to={'following'}>Following</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {/* Logo HERE */}
        <span>CodeMark</span>
        {this.getLinks()}
      </div>
    )
  }
}

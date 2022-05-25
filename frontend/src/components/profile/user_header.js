import React from "react";
import FollowButton from '../profile/follow_button';

export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      user: undefined,
      userId: undefined
    }
  }

  componentDidMount() {
    this.props.fetchCurrentUser().then(data => this.setState({
      currentUser: data.currentUser
    }))
  }

  componentDidUpdate() {
    if (!this.state.user) {
      this.setState({
        user: this.props.user
      })
    }
    if (this.state.currentUser !== this.props.currentUser) {
      this.setState({
        currentUser: this.props.currentUser
      })
    }
    if (!this.state.userId) {
      this.setState({
        userId: this.props.userId
      })
    }
  }
  render() {
    const { changeUserFollowers } = this.props;
    debugger
    if (this.state.currentUser &&
      this.state.currentUser.id !== this.state.user._id) {
      return (
        <div className="user-header-wrapper">
          <h1>{this.state.user.username}'s Notes</h1>
          <div className="user-header-stats">
            <div className="user-stats">
              <div className="user-notes-stat"></div>
              <div className="user-notes-stat"></div>
              <div className="user-notes-stat"></div>
            </div>
            <FollowButton
              changeUserFollowers={changeUserFollowers}
              userId={this.state.userId}
              currentUser={this.state.currentUser}
            />
          </div>
        </div>
      )
    } else return (
      <h3>Loading./.../as.d,a/.dml;adn</h3>
    )
  }
}
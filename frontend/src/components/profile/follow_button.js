import React from 'react';

export default class FollowButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: undefined
    }
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount() {
    const { currentUser, userId } = this.props;
    debugger
    const following = currentUser.following.includes(userId)
    this.setState({ following: following })
  }

  componentDidUpdate() {
    debugger
    if (this.props.currentUser !== this.state.currentUser) {
      debugger
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
    return (
      this.state.following ?
        <button id='user-unfollow' onClick={() => this.handleUnfollow()}>Unfollow</button>
        :
        <button id='user-follow' onClick={() => this.handleFollow()}>Follow</button>
    )
  }
}
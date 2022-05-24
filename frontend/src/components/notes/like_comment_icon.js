import React from "react";

export default class LikeCommentIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount() {
    this.props.likes.includes(this.props.currentUserId) ? (
      this.setState({ liked: true })
    ) : (
      this.setState({ liked: false })
    )
  }

  addLike() {
    let newLikes = this.props.likes.concat([this.props.currentUserId]);
    let data = { "likes": newLikes };
    this.props.addCommentLike(data, this.props.commentId);
    this.setState({ liked: true });
  }

  removeLike() {
    let filteredLikes = this.props.likes.filter(userId =>
      userId !== this.props.currentUserId);
    let data = { "likes": filteredLikes };
    this.props.removeCommentLike(data, this.props.commentId);
    this.setState({ liked: false });
  }

  getIcon() {
    if (this.state.liked) {
      return (
        <div className='icon-wrapper'>
          <i className="fa-solid fa-heart-circle-minus fa-xl" />
        </div>
      )
    } else {
      return (
        <div className='icon-wrapper'>
          <i className="fa-solid fa-heart-circle-plus fa-xl"
          />
        </div>
      )
    }
  }

  handleClick() {
    this.state.liked ? this.removeLike() : this.addLike()
  }

  render() {
    return (
      <div className='note-icon like' onClick={() => this.handleClick()}>
        {this.getIcon()}
      </div>
    )
  }
}
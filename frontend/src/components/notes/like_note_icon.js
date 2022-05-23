import React from "react";

export default class LikeNoteIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount() {
    // this.props.likes.includes(this.props.currentUserId) ? (
    //   this.setState({ liked: true })
    // ) : (
    //   this.setState({ liked: false })
    // )
  }

  addLike() {
    // let newLikes = this.props.likes.push(this.props.currentUserId);
    // let data = { "likes": newLikes };
    this.setState(
      { liked: true })
    // this.setState(
    //   { liked: true },
    //   this.props.addNoteLike(data, this.props.noteId))
  }

  removeLike() {
    // let filteredLikes = this.props.likes.filter(userId =>
    //   userId !== this.props.currentUserId);
    // let data = { "likes": filteredLikes };
    this.setState(
      { liked: false })
    // this.setState(
    //   { liked: false },
    //   this.props.addNoteLike(data, this.props.noteId))
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
    this.state.liked ? (
      this.setState({ liked: false })
    ) : this.setState({ liked: true })
  }

  render() {
    return (
      <div className='note-icon like' onClick={() => this.handleClick()}>
        {this.getIcon()}
      </div>
    )
  }
}
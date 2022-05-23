import React from "react";

export default class LikeNoteIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  componentDidMount() {
    this.props.likes.includes(this.props.currentUserId) ? (
      this.setState({liked: true})
    ) : (
      this.setState({liked: false})
    )
  }

  addLike() {
    let newLikes = this.props.likes.push(this.props.currentUserId);
    let data = { "likes": newLikes };
    this.setState(
      { liked: true },
      this.props.addNoteLike(data, this.props.noteId))
  }

  removeLike() {
    let filteredLikes = this.props.likes.filter(userId =>
      userId !== this.props.currentUserId);
    let data = { "likes": filteredLikes };
    this.setState(
      { liked: false },
      this.props.addNoteLike(data, this.props.noteId))
  }

  render() {
    return (
      <div className='note-icon like'>
        <i class="fa-solid fa-heart-circle-plus fa-xl"></i>
      </div>
    )
  }
}
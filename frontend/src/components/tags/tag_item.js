import React from "react";

class TagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false
    }

    this.toggleDelete = this.toggleDelete.bind(this);
  }

  deleteTag() {
    const { tags, _id } = this.props.note;
    const { updateNoteTags, title } = this.props;
    
    let newTags = tags.filter(tag =>
      tag !== title);
    
    updateNoteTags({tags: newTags}, _id)
  }

  toggleDelete() {
    this.state.showDelete ? (
      this.setState({ showDelete: false })
    ) : (
      this.setState({ showDelete: true })
    )
  }

  render() {
    const { isCurrentUser, title } = this.props;

    return (
      isCurrentUser ? (
        <div className="tag-item-wrapper"
          onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
          <div className="tag-icon-wrapper">
            <i className="fa-solid fa-tag"></i>
          </div>
          <span className="tag-text">{title}</span>
          {this.state.showDelete ? (
            <button className='delete-icon-button'
              onClick={() => this.deleteTag()}
            >
              <i className="fa-solid fa-trash"/>
            </button>
          ) : ('')}
        </div>
      ) : (
        <div className="tag-item-wrapper">
          <div className="tag-icon-wrapper">
            <i className="fa-solid fa-tag"></i>
          </div>
          <span className="tag-text">{title}</span>
        </div>
      )
    )
  }
}

export default TagItem;
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
    let newTags = this.props.tags.filter(tag =>
      tag !== this.props.title);
    const { title, codebody, textdetails, resources, _id } = this.props.note;

    let nextNote = {
      title: title,
      codebody: codebody,
      textdetails: textdetails,
      resources: resources,
      tags: newTags
    }
    // / 
    this.props.updateNote(nextNote, _id)
  }

  toggleDelete() {
    this.state.showDelete ? (
      this.setState({ showDelete: false })
    ) : (
      this.setState({ showDelete: true })
    )
  }

  render() {
    return (
      this.props.isCurrentUser ? (
        <div className="tag-item-wrapper"
          onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
          <div className="tag-icon-wrapper">
            <i className="fa-solid fa-tag"></i>
          </div>
          <span className="tag-text">{this.props.title}</span>
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
          <span className="tag-text">{this.props.title}</span>
        </div>
      )
    )
  }
}

export default TagItem;
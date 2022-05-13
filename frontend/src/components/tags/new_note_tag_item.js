import React from "react";

class NewNoteTagItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false
    }

    this.toggleDelete = this.toggleDelete.bind(this);
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
      <div className="tag-item-wrapper"
        onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
        <div className="tag-icon-wrapper">
          <i className="fa-solid fa-tag"></i>
        </div>
        <span className="tag-text">{this.props.title}</span>
        {this.state.showDelete ? (
          <button className='tag-delete-button'
            onClick={() => this.props.deleteTag(this.props.title)}
          >
            <span>delete</span>
          </button>
        ) : ('')}
      </div>
    )
  }
}

export default NewNoteTagItem;
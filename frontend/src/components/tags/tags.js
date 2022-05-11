import React from 'react'
import TagItem from './tag_item';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      newtag: "",
      tagForm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
  }

  componentDidCatch() {
    this.setState({
      tags: this.props.tags
    })
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger
    let tag = {
      title: title,
      noteId: this.props.noteId
    }
    // debugger
    this.props.submitNewTag(tag)
      .then(() => (
        this.setState({
          newTag: "",
          tags: this.state.tags.push(tag)
        }, () => this.toggleTagForm())
      ))
  }

  toggleTagForm() {
    const tagForm = document.getElementById('new-tag-form');
    if (tagForm.className === "tag-form-off") {
      this.setState({ tagForm: true }, () =>
        tagForm.className = "tag-form-on")
    } else {
      this.setState({ tagForm: false }, () =>
        tagForm.className = "tag-form-off")

    }
  }

  render() {

    // const tags = this.state.tags.map(tag => {
    //   <TagItem title={tag.title} />
    // })

    return (
      <div className='note-tags-list'>
        <div className="tag-item-wrapper tag-icon-new"
          id='toggle-tag-form-button'
          onClick={this.toggleTagForm}>
          {this.state.tagForm ? (
            <i className="fa-solid fa-minus"></i>
          ) : (
            <i className="fa-solid fa-circle-plus"></i>
          )}
        </div>

        <div className="tag-form-off" id="new-tag-form">
          <div className="tag-icon-save">
            <i className="fa-solid fa-floppy-disk"></i>
          </div>
          <input type={'text'}
            className={'tag-form-input'}
            onChange={this.update('newTag')}
            placeholder={'New tag...'}
          ></input>
        </div>
        <TagItem />
        {/* {tags} */}
      </div>
    )
  }
}

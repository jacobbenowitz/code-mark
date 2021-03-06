import React from 'react'
import TagItem from './tag_item';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      newTag: "",
      tagForm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
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
    let newTags = this.state.newTag.length ? (
      this.state.tags.concat([this.state.newTag])
    ) : this.state.tags

    const { title, codebody, textdetails, resources, _id } = this.props.note;

    let nextNote = {
      title: title,
      codebody: codebody,
      textdetails: textdetails,
      resources: resources,
      tags: newTags,
    }

    this.props.updateNote(nextNote, _id)
      .then(() => (
        this.setState({
          newTag: "",
          tagForm: false,
          tags: newTags
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


        <form onSubmit={this.handleSubmit}
          className="tag-form-off" id="new-tag-form">
          <input type={'text'}
            className={'tag-form-input'}
            onChange={this.update('newTag')}
            placeholder={'New tag...'}
            value={this.state.newTag}
          />
          <button className='save tag' id='tag-icon-save' type='submit'>
            <i className="fa-solid fa-floppy-disk" />
          </button>
        </form>
        {
          this.state.tags?.map((tag, i) =>
            <TagItem title={tag} key={`tag-${i}`}
              updateNote={this.props.updateNote}
              note={this.props.note}
              tags={this.state.tags}
            />)
        }
      </div>
    )
  }
}

import React from 'react'
import TagItem from './tag_item';

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      note: {},
      newTag: "",
      tagForm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
  }

  componentDidCatch() {
    this.setState({
      tags: this.props.note.tags,
      note: this.props.note,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note.tags !== this.state.tags) {
      this.setState({
        tags: nextProps.note.tags,
        note: nextProps.note
      })
    }
  }

  update(type) {
    return e => {
      
      this.setState({
        [type]: e.target.value
      })
    }
  }

  removeWhiteSpace(tag) {
    let cleaned = tag.replace(/\s{2,}/g, ' ');

    if (cleaned.slice(cleaned.length - 1) === " ") {
      cleaned = cleaned.slice(0, cleaned.length - 1)
    }

    if (cleaned.slice(0, 1) === " ") {
      cleaned = cleaned.slice(1)
    }

    return cleaned;
  }

  validateTags() {
    const { newTag, tags } = this.state;

    const cleaned = this.removeWhiteSpace(newTag)
    
    if (cleaned.length === 0 ||
      tags.includes(cleaned) ||
      cleaned.split(' ').join('').length === 0
    ) {
      return false
    }
    else return true
  }

  handleSubmit(e) {
    e.preventDefault();
    const { _id } = this.state.note;

    const cleaned = this.removeWhiteSpace(this.state.newTag)
    
    let newTags = [...new Set(this.state.tags.concat(cleaned))]

    this.props.updateNoteTags({tags: newTags}, _id)
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

    let tagsTop, tagsBottom;

    if (this.state.tags.length) {
      tagsTop = (
        <>
          <span className='tags-header'>TAGS</span>
          <div className='tag-top'>
            {this.props.isCurrentUser ? (
              <div className="tag-item-wrapper tag-icon-new"
                id='toggle-tag-form-button'
                onClick={this.toggleTagForm}>
                {this.state.tagForm ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-circle-plus"></i>
                )}
              </div>
            ) : undefined}
            
            <div className={this.props.isCurrentUser ?
              'tags-overflow' : 'tags-overflow-sm'}>
              {
                this.state.tags?.map((tag, i) =>
                  <TagItem title={tag} key={`tag-${i}`}
                    isCurrentUser={this.props.isCurrentUser}
                    updateNoteTags={this.props.updateNoteTags}
                    note={this.state.note}
                    tags={this.state.tags}
                  />)
              }
            </div>
          </div>
        </>
      )
    }

    return (
      <div className='note-tags-list'>
        {tagsTop}
      </div>
    )
  }
}

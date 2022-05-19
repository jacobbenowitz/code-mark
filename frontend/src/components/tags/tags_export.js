import React from 'react'
import TagItem from './tag_item';

export default class TagsExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    }
  }

  componentDidCatch() {
    this.setState({
      tags: this.props.note.tags,
    })
  }

  render() {

    return (
      <div className='note-tags-list'>
        {
          this.state.tags?.map((tag, i) =>
            <TagItem title={tag} key={`tag-${i}`}
              isCurrentUser={this.props.isCurrentUser}
              updateNote={this.props.updateNote}
              note={this.props.note}
              tags={this.state.tags}
            />)
        }
      </div>
    )
  }
}

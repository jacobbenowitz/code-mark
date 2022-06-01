import React from 'react'
import TagItem from './tag_item';

export default class TagsExport extends React.Component {

  render() {
    return (
      <div className='note-tags-list'>
        {
          this.props.tags?.map((tag, i) =>
            <TagItem title={tag} key={`tag-${i}`}
              isCurrentUser={this.props.isCurrentUser}
              updateNote={this.props.updateNote}
              note={this.props.note}
              tags={this.props.tags}
            />)
        }
      </div>
    )
  }
}

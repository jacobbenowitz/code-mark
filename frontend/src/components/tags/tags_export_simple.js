import React from 'react'
import TagItem from './tag_item';

const TagsExportSimple = ({ tags }) => {
  let noteTags = (tags.map((tag, i) =>
    <div className="tag-item-wrapper" key={`tag-exp-${i}`}>
      <span className="tag-text sm">{tag}</span>
    </div>
  ))

  return (
    <div className='note-tags-list'>
      {noteTags}
    </div>
  )
}

export default TagsExportSimple;

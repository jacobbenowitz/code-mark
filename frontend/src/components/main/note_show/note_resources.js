import React from "react";
import NoteResourcesListLoaderMobile from '../../content_loaders/mobile/note_resources_list_loader_mobile'
import ResourceItem from '../../notes/resources/resource_item';

const NoteResources = ({ note, status }) => {

  let noteResources;

  if (status === "DONE") {
    if (note.resources.length) {
      noteResources = (
        <>
          <div className='resources-title'>
            <h4>Resources</h4>
          </div>
          <div className='resources-list'>
            {note.resources.map((resource, i) =>
              <ResourceItem
                resource={resource}
                key={`resource-${i}`}
              />
            )}
          </div>
        </>
      )
    }
  } else if (status === "BUSY") {
    noteResources = (
      <NoteResourcesListLoaderMobile />
    )
  }
  
  return (
    <div className='note-resources'>
      { noteResources }
    </div>
  )
}

export default NoteResources;
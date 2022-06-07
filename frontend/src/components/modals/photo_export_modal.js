import React from "react";
import CodeEditorExportImage from "../code_editor/code_editor_export_img";
import codeMarkLogo from '../main/logo/codemark-logo-primary.svg';
import TagsExportSimple from '../tags/tags_export_simple';

const PhotoExportModal = ({
  bodyHeight, note, toggleExportModal, exportImage }) => {

  return (
    <div id="note-export-modal" className='modal-off'
      style={{ 'height': bodyHeight }}
    >
      <div className='action-buttons'>
        <div className='export icon-button'
          onClick={exportImage}>
          <i className="fa-solid fa-download" />
          <span>download</span>
        </div>
        <div className='cancel-export icon-only-button'
          onClick={toggleExportModal}>
          <i className="fa-solid fa-xmark fa-xl" />
        </div>
      </div>
      <div className='spacer-150-h'></div>
      <div className='export-dots-wrapper'>
        <div id='content-export' className='note-show-main'>
          <div className='content-wrapper'>
            <div className='note-show-title'>
              <span className='username'>@{note.user.username}</span>
              <h4>{note.title}</h4>
            </div>
            <div className='note-tags-wrapper'>
              <TagsExportSimple
                tags={note.tags}
              />
            </div>
            <div className='code-note-body' id='code-note-view'>
              <CodeEditorExportImage codeBody={note.codebody} />
            </div>
            {note.textdetails ? (
              <div className='note-text-details'>
                <span className='textDetails-show'>
                  {note.textdetails}
                </span>
              </div>
            ) : ''}
          </div>
          <img className='export-logo'
            src={codeMarkLogo} />
        </div>
      </div>
    </div>
  )
}

export default PhotoExportModal;
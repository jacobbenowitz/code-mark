import React from 'react';
import CodeEditorReadOnly from '../code_editor/code_editor_readonly';
import NoteShowEditorLoader from '../code_editor/code_show_editor_loader';

export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: undefined
    }
  }

  componentWillMount() {
    this.props.fetchNote(this.props.noteId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      note: nextProps.note
    })
  }

  render() {
    const { note } = this.props;
    return note ? (
      <div className='note-show-container'>
        <div className='note-show-top-icons'>
          <div className='back-page'>
            <span>
              <i className="fa-solid fa-arrow-left fa-lg"></i>
              Back
            </span>
          </div>
          <div className='delete-note'>
            <span>
              <i className="fa-solid fa-trash fa-lg"></i>
              Delete
            </span>
          </div>
        </div>

        <div className='note-show-main'>
          <div className='note-show-title'>
            <h1>{note.title}</h1>
          </div>

          <div className='code-note-body'>
            <CodeEditorReadOnly
              codeBody={note.codeBody}
            />
          </div>

          <div className='note-textDetails'>
            <span className='textDetails-show'>
              {note.textdetails}
            </span>
          </div>
        </div>

        <div className='note-resources'>
          <div className='resources-title'>
            <h4>Resources</h4>
          </div>
          <div className='resources-list'>
            {/* resourceItem components */}
          </div>
        </div>
      </div>
    ) : (
      <NoteShowEditorLoader />
    )

  }
}

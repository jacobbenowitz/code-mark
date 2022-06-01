import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { getLanguage } from '../../util/webscrap_util';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/basic-setup';
import TextareaAutosize from 'react-textarea-autosize';

export default class EditNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      codebody: "",
      textdetails: "",
      isOpen: false // true when modal is open
    }
    this.bindHandlers();
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      title: this.props.note.title,
      codebody: this.props.note.codebody,
      textdetails: this.props.note.textdetails,
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.placeholderTitle = this.placeholderTitle.bind(this)
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  updateCode() {
    return e => {
      this.setState({
        codebody: e
      })
    }
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('edit-note-container');
    if (editNoteModal.className = "modal-on") {
      editNoteModal.className = "modal-off"
    } else {
      editNoteModal.className = "modal-on"
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails } = this.state;
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails
    }
    this.props.updateNote(note, this.props.noteId)
      .then(() => {
        this.toggleEditModal()
        // this.props.toggleModal();
      })
  }

  placeholderTitle(e) {
    // const title = this.state.codebody.slice(0, 20);
    const title = this.state.codebody.split('\n')[0];
    const selection = window.getSelection();

    this.setState({ title: title });
    setTimeout(() => {
      const titleInput = document.getElementById('title-code');
      titleInput.select()
    }, 0);
    // selection.setBaseAndExtent(titleInput, 0, titleInput, 1);
  }

  render() {
    const language = getLanguage(this.state.codebody);
    const extensions = {
      'JavaScript': javascript({ jsx: true }),
      'HTML': html(),
      'CSS': css(),
      'C++': cpp(),
    }
    return (
      <div className='new-note-container' id='edit-note-full'>
        <div className='new-note-form'>
          <form onSubmit={this.state.codebody.length ? this.handleSubmit : ""}>
            <div className='note-input'>
              <input type={'text'}
                onClick={this.state.title === "Untitled note" ? this.placeholderTitle : undefined }
                onChange={this.update('title')}
                id='title-code'
                className='title-input'
                value={this.state.title}
                placeholder={'Untitled note'} />
            </div>
            <div className='note-input'>
              <CodeMirror
                value={this.state.codebody}
                onChange={this.updateCode()}
                height="200px"
                theme='dark'
                extensions={[
                  extensions[language] ? extensions[language] : javascript({ jsx: true }),
                  EditorView.lineWrapping
                ]}
              />
            </div>
            <div className='note-input'>
              <TextareaAutosize
                onChange={this.update('textdetails')}
                id='details-textarea'
                className='note-input-details'
                placeholder='Any additional notes?'
                value={this.state.textdetails}
              />
            </div>
            <button type='submit' id='code-note-submit'
              className={(this.state.codebody.length > 1 && this.state.codebody.length < 5001) ? 'save-button' : "save-button disabled"}>Save</button>
          </form>
          <span className='hide-button'
            onClick={this.toggleEditModal}>Hide</span>
        </div>
      </div>
    )
  }
}

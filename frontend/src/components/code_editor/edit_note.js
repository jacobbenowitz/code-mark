import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

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
    this.setState({
      title: this.props.note.title,
      codebody: this.props.note.codebody,
      textdetails: this.props.note.textdetails,
    })
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
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

  // credit https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize

  init() {
    const observe = (element, event, handler) => {
      element.addEventListener(event, handler, false);
    };

    var text = document.getElementById('details-textarea');
    function resize() {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize() {
      window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
  }

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails } = this.state;
    debugger
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails
    }
    // debugger
    this.props.updateNote(note)
      .then(() => (
        this.setState({
          title: "",
          codebody: "",
          textdetails: "",
        }, () => this.toggleForm())
      ))
  }

  render() {
    return (
      <div className='new-note-container' id='edit-note-full'>
        <div className='new-note-form'>
          <form onSubmit={this.handleSubmit}>
            <div className='note-input'>
              <input type={'text'}
                onChange={this.update('title')}
                id='title-code'
                className='title-input'
                value={this.state.title}
                placeholder={'Title'} />
            </div>
            <div className='note-input'>
              <CodeMirror
                value={this.state.codebody}
                onChange={this.updateCode()}
                height="200px"
                theme='dark'
                extensions={[javascript({ jsx: true })]}
              />
            </div>
            <div className='note-input'>
              <textarea
                onChange={this.update('textdetails')}
                id='details-textarea'
                className='note-input-details'
                placeholder='Any additional notes?'
                value={this.state.textdetails}
              />
            </div>
            <button type='submit' id='code-note-submit'
              className='submit button'>Save</button>
          </form>
          <span className='hide-button' onClick={this.toggleEditModal}>Hide</span>
        </div>
      </div>
    )
  }
}

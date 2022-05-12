import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import CheckBoxItem from './checkbox_item'

export default class NewNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      codebody: "",
      textdetails: "",
      isOpen: false, // true when user clicks or types, false otherwise
      keywordsSelected: []
    }
    // this.resizeOnInput()
    this.bindHandlers();
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
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

  toggleResourcesModal() {
    const resourcesNoteModal = document.getElementById('resources-note-container');
    if (resourcesNoteModal.className === "modal-off") {
      resourcesNoteModal.className = "modal-on"
    } else {
      resourcesNoteModal.className = "modal-off"
    }
  }

  toggleForm() {
    const fullForm = document.getElementById('new-note-full');
    const miniForm = document.getElementById('new-note-mini');
    if (fullForm.style.display == 'none') {
      fullForm.style.display = 'flex';
      miniForm.style.display = 'none';
      this.init();
    } else {
      fullForm.style.display = 'none';
      miniForm.style.display = 'flex';
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

    resize();
  }

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails } = this.state;
    //  
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails
    }
    //  
    this.props.composeNote(note)
      .then(() => (
        this.setState({
          title: "",
          codebody: "",
          textdetails: "",
        }, () => this.toggleResourcesModal())
      ))
  }

  updateKeywords(e) {
    const pushed = this.state.keywordsSelected.push(e.target.value)
    this.setState({
      keywordsSelected: pushed
    })
  }

  // handleResourcesSubmit(e) {
  //   e.preventDefault();
  //   this.props.updateNote(noteData, noteId)
  // }

  render() {
    return (
      <>
        <div id='resources-note-container' className='modal-on' >
          <div className='modal-wrapper'>
            <div className='resources-modal'>
              <h4>Resources</h4>
              <span>Select the keywords that you'd like resources for</span>
              <form className='resource-options'
                onChange={this.updateKeywords}>
                {this.props.newResources?.map(keyword =>
                  <CheckBoxItem keyword={keyword} />)}
              </form>
            </div>
          </div>
        </div>
        <div className='new-note-container' id='new-note-full'>
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
            <span className='hide-button' onClick={this.toggleForm}>Hide</span>
          </div>
        </div>
        <div className='new-note-container' id='new-note-mini'
          onClick={this.toggleForm}>
          <div className='new-note-form' onClick={this.toggleForm}>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[javascript({ jsx: true })]}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

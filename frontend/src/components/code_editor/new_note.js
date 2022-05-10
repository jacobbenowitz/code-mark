import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      codebody: "",
      textdetails: "",
      newNote: "",
      isOpen: false // true when user clicks or types, false otherwise
    }

    this.bindHandlers();
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails } = this.state;
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails
    }
    debugger
    this.props.composeNote(note)
    this.setState({
      title: "",
      codebody: "",
      textdetails: "",
      newNote: "",
      isOpen: false
    })
  }

  render() {
    return (
      <div className='new-note-container'>
        <div className='new-note-form'>
          <form onSubmit={this.handleSubmit}>
            <div className='note-input'>
              <input type={'text'} onChange={this.update('title')}
                className='title-input'
                placeholder={'Title'} />
            </div>
            <div className='note-input'>
              <CodeMirror
                onChange={this.updateCode()}
                value="Save a new note..."
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
                placeholder='test'
              />
            </div>
            <button type='submit'
              className='submit button'>Save</button>
          </form>
        </div>
      </div>
    )
  }
}

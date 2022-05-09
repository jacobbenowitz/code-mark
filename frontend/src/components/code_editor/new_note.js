import React from 'react';
import CodeEditor from './code_editor';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props)

    this.bindHandlers();
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='new-note-container'>
        <div className='new-note-form'>
          <form onSubmit={this.handleSubmit}>
            <div className='note-input'>
              <input type={'text'} className='title-input'
                placeholder={'Title'} />
            </div>
            <div className='note-input'>
              <CodeEditor />
            </div>
            <div className='note-input'>
              <textarea
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

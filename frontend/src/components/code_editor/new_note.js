import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // lang: [javascript({ jsx: true })],
      title: "",
      codebody: "",
      textdetails: "",
      isOpen: false // true when user clicks or types, false otherwise
    }
    // this.resizeOnInput()
    this.bindHandlers();
  }

  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e){
    e.preventDefault();
    // this.setState({lang: e.target.value});
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++){
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName(e.target.value);
    for (var j = 0; j < chosen.length; j++){
      chosen[j].style.display = 'block';
    }
  }

  componentDidMount(){
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++){
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName('javascript');
    for (var j = 0; j < chosen.length; j++){
      chosen[j].style.display = 'block';
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
        }, () => this.toggleForm())
      ))
  }

  render() {
    return (
      <>
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
              <select value={this.state.lang} onChange={this.handleChange}>
                <option value={'javascript'} selected>JavaScript</option>
                <option value={'html'}>HTML</option>
                <option value={'cpp'}>C++</option>
                <option value={'css'}>CSS</option>
              </select>
              <div className='note-input'>
                <CodeMirror className='codemirror javascript'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[javascript({ jsx: true })]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror html'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[html()]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror cpp'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[cpp()]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror css'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[css()]}
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
              <CodeMirror className='codemirror javascript'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[javascript({ jsx: true })]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror html'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[html()]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror cpp'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[cpp()]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror css'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[css()]}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

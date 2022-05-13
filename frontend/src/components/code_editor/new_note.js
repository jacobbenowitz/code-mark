import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import CheckBoxItem from './checkbox_item';
import NewNoteTagItem from '../tags/new_note_tag_item';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // lang: [javascript({ jsx: true })],
      title: "",
      codebody: "",
      textdetails: "",
      tags: [],
      newTag: "",
      tagForm: false,
      suggestedLanguage: undefined,
      isOpen: false, // true when user clicks or types, false otherwise
      keywordsSelected: [],
      newResources: []
    }
    // this.resizeOnInput()
    this.bindHandlers();
  }

  // DISABLED UNTIL SCRAPER IS RESOLVED
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.newResources)
    // this.setState({
    //   newResources: nextProps.newResources
    // }, () => this.toggleResourcesModal())
  }

  bindHandlers() {
    this.addLangTag = this.addLangTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
    this.handleResourcesSubmit = this.handleResourcesSubmit.bind(this);
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
    let lang = this.props.getLanguage(this.state.codebody)
    return e => {
      this.setState({
        codebody: e,
        suggestedLanguage: lang
      })
    }
  }


  handleChange(e) {
    e.preventDefault();
    // this.setState({lang: e.target.value});
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++) {
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName(e.target.value);
    for (var j = 0; j < chosen.length; j++) {
      chosen[j].style.display = 'block';
    }
  }

  componentDidMount() {
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++) {
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName('javascript');
    for (var j = 0; j < chosen.length; j++) {
      chosen[j].style.display = 'block';
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
    const titleCode = document.getElementById('title-code');
    if (fullForm.style.display == 'none') {
      fullForm.style.display = 'flex';
      miniForm.style.display = 'none';
      this.init();
    } else {
      fullForm.style.display = 'none';
      miniForm.style.display = 'flex';
    }
    titleCode.focus();
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
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails
    }
    this.props.composeNote(note)
      .then(() => (
        this.setState({
          title: "",
          codebody: "",
          textdetails: "",
        })
      ))
  }

  // remove if possible
  updateKeywords(e) {
    e.preventDefault();
    // e.target.checked ? e.target.checked = false : e.target.checked = true;
    const keyword = e.target.value;
    let result;
    debugger
    this.state.keywordsSelected.includes(keyword) ? (
      result = this.state.keywordsSelected.filter(word => word !== keyword)
    ) : (
      result = [e.target.value, ...this.state.keywordsSelected]
    )
    this.setState({
      keywordsSelected: result
    })
  }

  handleResourcesSubmit(e) {
    e.preventDefault();

    debugger
    this.props.updateNote(noteData, noteId);
    this.toggleResourcesModal();
  }


  toggleTagForm() {
    const tagForm = document.getElementById('new-tag-form-new-note');
    if (tagForm.className === "tag-form-off") {
      this.setState({ tagForm: true }, () =>
        tagForm.className = "tag-form-on")
    } else {
      this.setState({ tagForm: false }, () =>
        tagForm.className = "tag-form-off")
    }
  }

  updateTags() {
    let newTags = this.state.newTag.length ? (
      this.state.tags.concat([this.state.newTag])
    ) : [this.state.newTag]
    this.setState({
      newTag: "",
      tagForm: false,
      tags: newTags
    }, () => this.toggleTagForm())
  }

  addLangTag(lang) {
    let newTags = this.state.newTag.length ? (
      this.state.tags.concat(lang)
    ) : [lang]
    this.setState({
      tags: newTags
    })
  }

  deleteTag(title) {
    let newTags = this.state.tags.filter(tag =>
      tag !== title);

    this.setState({
      tags: newTags
    })
  }

  render() {
    return (
      <>

        <div className='new-note-container' id='new-note-full'>
          {/* <button onClick={this.toggleResourcesModal}>ToggleTesting</button> */}
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
              <div className='select-wrapper'>
                <select id='lang-select'
                  value={this.state.lang} onChange={this.handleChange}>
                  <option value={'javascript'} selected>JavaScript</option>
                  <option value={'html'}>HTML</option>
                  <option value={'cpp'}>C++</option>
                  <option value={'css'}>CSS</option>
                </select>
              </div>
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

            <div className='recommended-tag'
              onClick={() => this.addLangTag(this.state.suggestedLanguage)}>
              {this.state.suggestedLanguage ? (
                <>
                  <span className='rec-tag'>Detected language:</span>
                  <span className='lang-tag'>{this.state.suggestedLanguage}</span>
                </>) : " "}
            </div>

            <div className='note-tags-list new'>
              <div className="tag-item-wrapper tag-icon-new new"
                id='toggle-tag-form-button'
                onClick={this.toggleTagForm}>
                {this.state.tagForm ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-circle-plus"></i>
                )}
              </div>

              <form onSubmit={this.updateTags}
                className="tag-form-off" id="new-tag-form-new-note">
                <input type={'text'}
                  className={'tag-form-input'}
                  onChange={this.update('newTag')}
                  placeholder={'New tag...'}
                  value={this.state.newTag}
                />
                <button id='tag-icon-save' type='submit'>
                  <i className="fa-solid fa-floppy-disk" />
                </button>
              </form>
              {
                this.state.tags?.map((tag, i) =>
                  <NewNoteTagItem title={tag} key={`tag-${i}`}
                    deleteTag={this.deleteTag}
                  />)
              }
            </div>

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


// <div id='resources-note-container' className='modal-off' >
//   <div className='modal-wrapper'>
//     <div className='resources-modal'>
//       {/* <button onClick={this.toggleResourcesModal}>ToggleTesting</button> */}
//       <h4>Resources</h4>
//       <span>Select the keywords that you'd like resources for</span>
//       <form className='resource-options'
//         onSubmit={this.toggleResourcesModal}
//       >
//         {this.props.newResources?.map(keyword =>
//           <CheckBoxItem keyword={keyword}
//             updateKeywords={this.updateKeywords}
//           />)
//         }
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   </div>
// </div>
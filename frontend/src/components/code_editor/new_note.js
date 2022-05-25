import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import CheckBoxItem from './checkbox_item';
import NewNoteTagItem from '../tags/new_note_tag_item';
import { getKeywords } from '../../util/webscrap_util';
import { EditorView } from '@codemirror/basic-setup';
import { withRouter } from 'react-router-dom'

class NewNote extends React.Component {
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
      keywordsSelected: [],
      allKeywords: [],
      newResources: []
    }
    // this.resizeOnInput()
    this.bindHandlers();
  }

  // DISABLED UNTIL SCRAPER IS RESOLVED
  // componentWillReceiveProps(nextProps) {
  // console.log(nextProps.newResources)
  // this.setState({
  //   newResources: nextProps.newResources
  // })
  // }

  bindHandlers() {
    this.addLangTag = this.addLangTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
    // this.handleResourcesSubmit = this.handleResourcesSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleResourcesModal = this.toggleResourcesModal.bind(this);
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
    this.placeholderTitle = this.placeholderTitle.bind(this);
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

  toggleResourcesModal(e) {
    e.preventDefault();
    const resourcesNoteModal = document.getElementById('resources-note-container');
    if (resourcesNoteModal.className === "modal-off") {
      // debugger
      const keywords = getKeywords(this.state.codebody);
      this.setState({
        allKeywords: keywords
      }, () => {
        resourcesNoteModal.className = "modal-on"
      })
    } else {
      resourcesNoteModal.className = "modal-off"
    }
  }

  toggleSuccessModal() {
    const step1 = document.getElementById('resources-step-1');
    const step2 = document.getElementById('resources-step-2');
    step1.className = 'modal-off'
    step2.className = 'modal-on resources-modal'
  }

  closeSuccessModal() {
    const resourcesNoteModal = document.getElementById('resources-note-container');
    const step2 = document.getElementById('resources-step-2');
    const step1 = document.getElementById('resources-step-1');
    resourcesNoteModal.className = 'modal-off';
    step1.className = 'resources-modal'
    step2.className = 'modal-off';
    this.toggleForm();
  }

  toggleForm() {
    const fullForm = document.getElementById('new-note-full');
    const miniForm = document.getElementById('new-note-mini');
    const codebody = document.getElementById('codebody-js');
    if (fullForm.style.display == 'none') {
      fullForm.style.display = 'flex';
      miniForm.style.display = 'none';
      this.init();
    } else {
      fullForm.style.display = 'none';
      miniForm.style.display = 'flex';
    }
    // codebody.focus();
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
    const { title, codebody, textdetails, tags, keywordsSelected } = this.state;

    const note = {
      title: (title.length ? title : "Untitled note"),
      codebody: codebody,
      textdetails: textdetails,
      tags: tags,
      keywords: keywordsSelected
    }
    // debugger
    this.props.composeNote(note)
      .then(() => (
        this.setState({
          title: "",
          codebody: "",
          textdetails: "",
          tags: [],
          newTag: "",
          tagForm: false,
          suggestedLanguage: undefined,
          keywordsSelected: [],
          allKeywords: [],
          newResources: []
        })
      ))
      .then(() => this.toggleSuccessModal())
  }

  // remove if possible
  updateKeywords(e) {
    e.preventDefault();
    // debugger
    // e.target.checked ? e.target.checked = false : e.target.checked = true;
    const keyword = e.target.value || e.target.innerHTML;
    let spaceRemoved = keyword.replace(/\s/g, '');
    let result;
    // debugger
    this.state.keywordsSelected.includes(spaceRemoved) ? (
      result = this.state.keywordsSelected.filter(word => word !== spaceRemoved)
    ) : (
      result = [spaceRemoved, ...this.state.keywordsSelected]
    )
    this.setState({
      keywordsSelected: result
    });
  };

  // handleResourcesSubmit(e) {
  //   e.preventDefault();
  // debugger
  //   this.props.updateNote(noteData, noteId);
  //   this.toggleResourcesModal();
  // }


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

  placeholderTitle(e){
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
    return (
      <>
        <div id='resources-note-container' className='modal-off' >
          <div className='modal-wrapper'>
            <div id="resources-step-1" className='resources-modal'>
              <h4>Resources</h4>
              <span>Select the keywords that you'd like resources for</span>
              <form className='resource-options'
                onSubmit={this.handleSubmit}>
                {this.state.allKeywords?.map((keyword, i) =>
                  <CheckBoxItem keyword={keyword} index={i}
                    key={i} updateKeywords={this.updateKeywords}
                  />)
                }
                <button type="submit">Submit</button>
              </form>
            </div>
            <div id="resources-step-2" className='modal-off'>
              <h4>Success!</h4>
              <span>Your CodeMark has been saved and your resources are ready to review.</span>
              <div className='buttons-wrapper'>
                <div className='icon-button' onClick={this.closeSuccessModal}>
                  <img src="https://code-mark.s3.amazonaws.com/type%3DHome.svg" />
                  <span>Home</span>
                </div>
                <div className='icon-button view-note' onClick={() => this.props.history.push(`/notes/${this.props.newNote._id}`)}>
                  <span>View note</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='new-note-container' id='new-note-full'>
          {/* <button onClick={this.toggleResourcesModal}>ToggleTesting</button> */}
          <div className='new-note-form'>
            <form onSubmit={this.state.codebody.length ? this.toggleResourcesModal : undefined}>
              <div id="note-title-input" className='note-input'>
                <input type={'text'}
                  onClick={this.placeholderTitle}
                  onChange={this.update('title')}
                  id='title-code'
                  className='title-input'
                  value={this.state.title}
                  placeholder={'Untitled note'} />
              </div>
              <div className='select-wrapper'>
                <select id='lang-select'
                  value={this.state.lang} onChange={this.handleChange}>
                  <option value={'javascript'} defaultValue>JavaScript</option>
                  <option value={'html'}>HTML</option>
                  <option value={'cpp'}>C++</option>
                  <option value={'css'}>CSS</option>
                </select>
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror javascript'
                  id='codebody-js'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[javascript({ jsx: true }),
                  EditorView.lineWrapping]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror html'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[html(),
                  EditorView.lineWrapping]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror cpp'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[cpp(),
                  EditorView.lineWrapping]}
                />
              </div>
              <div className='note-input'>
                <CodeMirror className='codemirror css'
                  value={this.state.codebody}
                  onChange={this.updateCode()}
                  height="200px"
                  theme='dark'
                  extensions={[css(),
                  EditorView.lineWrapping]}
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
              {/* Need to add conditional logic to disable submit button if codebody empty */}
              {this.state.codebody.length ? (
                <button type='submit' id='code-note-submit'
                  className='save-button'>Save</button>
              ) : (
                <button type='submit' id='code-note-submit' disabled
                  className={this.state.codebody.length ? 'save-button' : "save-button disabled"}>Save</button>)
              }
            </form>
            <div id='hide-note-form' className='icon-only-button' onClick={this.toggleForm}>
              <i className="fa-solid fa-square-minus"></i>
            </div>
            {/* <span className='hide-button' onClick={this.toggleForm}>Hide</span> */}

            <div className='recommended-tag'
              onClick={() => this.addLangTag(this.state.suggestedLanguage)}>
              {this.state.suggestedLanguage ? (
                <>
                  <span className='rec-tag'>Detected language:</span>
                  <span className='lang-tag'>{this.state.suggestedLanguage}</span>
                </>) : " "}
            </div>

            <div className='note-tags-list new'>
              <span>Tags</span>
              <div className="tag-item-wrapper tag-icon-new new"
                id='toggle-tag-form-button'
                onClick={this.toggleTagForm}>
                {this.state.tagForm ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-circle-plus"></i>
                )}
              </div>

              <form onSubmit={this.state.newTag.length ? this.updateTags : undefined}
                className="tag-form-off" id="new-tag-form-new-note">
                <input type={'text'}
                  className={'tag-form-input'}
                  onChange={this.update('newTag')}
                  placeholder={'New tag...'}
                  value={this.state.newTag}
                />
                <button className={this.state.newTag.length ? '' : 'save-tag disabled' } id='tag-icon-save' type='submit'>
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
                extensions={[javascript({ jsx: true }),
                EditorView.lineWrapping]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror html'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[html(),
                EditorView.lineWrapping]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror cpp'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[cpp(),
                EditorView.lineWrapping]}
              />
            </div>
            <div className='note-input' onClick={this.toggleForm}>
              <CodeMirror className='codemirror css'
                onMouseDown={this.toggleForm}
                value={"Save a new note..."}
                height="56px"
                theme='dark'
                extensions={[css(),
                EditorView.lineWrapping]}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(NewNote);
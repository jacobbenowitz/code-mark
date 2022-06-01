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
import NewNoteTagItem from '../tags/new_note_tag_item';

export default class EditNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      codebody: "",
      textdetails: "",
      tags: [],
      newTag: "",
      suggestedLanguage: undefined,
      isOpen: false // true when modal is open
    }
    this.bindHandlers();
  }

  componentDidMount() {
    this._isMounted = true;
    const { note } = this.props;
    this.setState({
      title: note.title,
      codebody: note.codebody,
      textdetails: note.textdetails,
      tags: note.tags
    })
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++) {
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName('javascript');
    for (var j = 0; j < chosen.length; j++) {
      chosen[j].style.display = 'block';
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  bindHandlers() {
    this.addLangTag = this.addLangTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.placeholderTitle = this.placeholderTitle.bind(this);
    this.updateCode = this.updateCode.bind(this);
    // this.updateKeywords = this.updateKeywords.bind(this);
    // this.toggleResourcesModal = this.toggleResourcesModal.bind(this);
    // this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
    // this.closeSuccessModal = this.closeSuccessModal.bind(this);
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  updateCode() {
    let lang = getLanguage(this.state.codebody)
    return e => {
      this.setState({
        codebody: e,
        suggestedLanguage: lang
      })
    }
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('edit-note-container');
    const commentHighlightModal = document.getElementById('comment-highlight-text');
    if (editNoteModal.className = "modal-on") {
      editNoteModal.className = "modal-out"
      commentHighlightModal.className = "modal-compact"
    } else {
      editNoteModal.className = "modal-on"
      commentHighlightModal.className = "modal-compact hidden"
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails, tags } = this.state;
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails,
      tags: tags
    }
    this.props.updateNote(note, this.props.noteId)
      .then(() => {
        this.toggleEditModal()
      })
  }
  
  updateTags(e) {
    e.preventDefault()
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
      <div className='edit-note-container' id='note-edit-wrapper'>
        <div className='new-note-form'>
          <div id="note-title-input" className='note-input'>
            <input type={'text'}
              onClick={this.state.title === "" ? this.placeholderTitle : undefined}
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
              onChange={this.updateCode}
              height="200px"
              theme='dark'
              extensions={[javascript({ jsx: true }),
              EditorView.lineWrapping]}
            />
          </div>
          <div className='note-input'>
            <CodeMirror className='codemirror html'
              value={this.state.codebody}
              onChange={this.updateCode}
              height="200px"
              theme='dark'
              extensions={[html(),
              EditorView.lineWrapping]}
            />
          </div>
          <div className='note-input'>
            <CodeMirror className='codemirror cpp'
              value={this.state.codebody}
              onChange={this.updateCode}
              height="200px"
              theme='dark'
              extensions={[cpp(),
              EditorView.lineWrapping]}
            />
          </div>
          <div className='note-input'>
            <CodeMirror className='codemirror css'
              value={this.state.codebody}
              onChange={this.updateCode}
              height="200px"
              theme='dark'
              extensions={[css(),
              EditorView.lineWrapping]}
            />
          </div>
            <TextareaAutosize
              onChange={this.update('textdetails')}
              id='details-textarea-edit'
              className='note-input-details'
              value={this.state.textdetails}
            />
          <div className='tags-header-wrapper'>
            <span className='tags-header'>TAGS</span>
            <div className='recommended-tag'
              onClick={() => this.addLangTag(this.state.suggestedLanguage)}>
              {this.state.suggestedLanguage ? (
                <>
                  <span className='rec-tag'>Detected language:</span>
                  <span className='lang-tag'>{this.state.suggestedLanguage}</span>
                </>) : ""}
            </div>
          </div>
          <div className='tag-list'>
            {
              this.state.tags?.map((tag, i) =>
                <NewNoteTagItem title={tag} key={`tag-${i}`}
                  deleteTag={this.deleteTag}
                />)
            }
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

            <div className="tag-form-off" id="new-tag-form-new-note">
              <input type={'text'}
                className={'tag-form-input'}
                onChange={this.update('newTag')}
                placeholder={'New tag...'}
                value={this.state.newTag.split(' ').join(' ')}
                maxLength="50"
              />

              <button className={this.state.newTag.split(' ').join('').length ? '' : 'save-tag disabled'} id='tag-icon-save'
                onClick={this.state.newTag.split(' ').join('').length ?
                  this.updateTags : undefined}>
                <i className="fa-solid fa-floppy-disk" />
              </button>
            </div>
          </div>
          <div className='submit-wrapper'>
            <button type='submit' id='code-note-submit'
              className={(this.state.codebody.length > 1 &&
                this.state.codebody.length < 5001) ? 'save-button' : "save-button disabled"}
              onClick={this.handleSubmit}
            >Update CodeMark</button>
          </div>

          <div id='hide-note-form'
            className='icon-only-button'
            title='hide form'
            onClick={this.toggleEditModal}>
            <i className="fa-solid fa-square-minus"></i>
          </div>
        </div>
      </div>
    )
  }
}

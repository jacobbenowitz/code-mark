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
      tags: [],
      newTag: "",
      suggestedLanguage: undefined,
      isOpen: false, // true when modal is open
      lang: javascript({ jsx: true})
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeholderTitle = this.placeholderTitle.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  updateCode(e) {
    let lang = this.props.getLanguage(e)
    // return e => {
      this.setState({
        codebody: e,
        suggestedLanguage: lang
      })
    // }
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('edit-note-container');
    if (editNoteModal.className = "modal-on") {
      editNoteModal.className = "modal-out"
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
      })
  }

  handleChange(e) {
    // e.preventDefault();
    // // this.setState({lang: e.target.value});
    // let codemirrors = document.getElementsByClassName('codemirror');
    // for (var i = 0; i < codemirrors.length; i++) {
    //   codemirrors[i].style.display = 'none';
    // }
    // let chosen = document.getElementsByClassName(e.target.value);
    // for (var j = 0; j < chosen.length; j++) {
    //   chosen[j].style.display = 'block';
    // }
    const languages = [javascript({ jsx: true}), html(), cpp(), css()];
    this.setState({ lang: languages[parseInt(e.target.value)] });
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
            <select id='lang-select' onChange={this.handleChange}>
              <option value={0} defaultValue>JavaScript</option>
              <option value={1}>HTML</option>
              <option value={2}>C++</option>
              <option value={3}>CSS</option>
            </select>
          </div>
          <div className='note-input'>
            <CodeMirror className='codemirror javascript'
              id='codebody-js'
              value={this.state.codebody}
              onChange={this.updateCode}
              height="200px"
              theme='dark'
              extensions={[this.state.lang,
                EditorView.lineWrapping]}
            />
          </div>
          {/* <div className='note-input'>
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
          </div> */}
          <div className='note-input'>
            <TextareaAutosize
              onChange={() => this.update('textdetails')}
              id='details-textarea'
              className='note-input-details'
              placeholder='Any additional notes?'
              value={this.state.textdetails}
            />
          </div>
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

            <form onSubmit={this.state.newTag.split(' ').join('').length ? this.updateTags : undefined}
              className="tag-form-off" id="new-tag-form-new-note">
              <input type={'text'}
                className={'tag-form-input'}
                onChange={this.update('newTag')}
                placeholder={'New tag...'}
                value={this.state.newTag.split(' ').join(' ')}
                maxLength="50"
              />

              <button className={this.state.newTag.split(' ').join('').length ? '' : 'save-tag disabled'} id='tag-icon-save' type='submit'>
                <i className="fa-solid fa-floppy-disk" />
              </button>
            </form>
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

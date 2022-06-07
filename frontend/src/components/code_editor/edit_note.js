import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { getLanguage, getKeywords } from '../../util/webscrap_util';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/basic-setup';
import TextareaAutosize from 'react-textarea-autosize';
import NewNoteTagItem from '../tags/new_note_tag_item';
import CheckBoxItem from './checkbox_item';

export default class EditNote extends React.Component {
  constructor(props) {
    super(props)
    const extensions = {
      'JavaScript': javascript({ jsx: true }),
      'HTML': html(),
      'CSS': css(),
      'C++': cpp(),
    }

    this.state = {
      title: "",
      codebody: "",
      textdetails: "",
      tags: [],
      newTag: "",
      suggestedLanguage: undefined,
      isOpen: false, // true when modal is open
      lang: extensions[this.props.note.language],
      language_name: this.props.note.language,
      keywordsSelected: [],
      allKeywords: []
    }
    this.bindHandlers();
  }

  componentDidMount() {
    this._isMounted = true;
    const { note } = this.props;

    const keywords = [];
    if (note.resources.length && note.resources[0].keyword) {
      this.props.note.resources.forEach(resource => {
        keywords.push(resource.keyword.split(' ')[1])
      })
    }
    
    this.setState({
      title: note.title,
      codebody: note.codebody,
      textdetails: note.textdetails,
      tags: note.tags,
      keywordsSelected: keywords
    })
    let codemirrors = document.getElementsByClassName('codemirror');
    for (var i = 0; i < codemirrors.length; i++) {
      codemirrors[i].style.display = 'none';
    }
    let chosen = document.getElementsByClassName('javascript');
    for (var j = 0; j < chosen.length; j++) {
      chosen[j].style.display = 'block';
    }
    let select_lang = document.getElementById('lang-select');
    select_lang.value = this.props.note.language;
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  bindHandlers() {
    this.addLangTag = this.addLangTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeholderTitle = this.placeholderTitle.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleResourceModal = this.toggleResourceModal.bind(this);
    this.cancelTextEdit = this.cancelTextEdit.bind(this);
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
      this.setState({
        codebody: e,
        suggestedLanguage: lang
      })
    // }
  }

  cancelTextEdit(){
    const editNoteModal = document.getElementById('edit-note-container');
    const commentHighlightModal = document.getElementById('comment-highlight-text');
    if (editNoteModal.className = "modal-on") {
      editNoteModal.className = "modal-out"
      this.props.toggleCommentModalVisibility()
    } else {
      editNoteModal.className = "modal-on"
      this.props.toggleCommentModalVisibility()
    }
  }

  toggleEditModal() {
    const editNoteModal = document.getElementById('note-edit-wrapper');
    const resourcesNoteModal = document.getElementById('resources-step-1');

    if (editNoteModal.className = "edit-note-container modal-on") {
      editNoteModal.className = "edit-note-container modal-out-removed"
    } else {
      editNoteModal.className = "edit-note-container modal-on"
    }

    if (resourcesNoteModal.className === "resources-modal modal-off") {
      const keywords = getKeywords(this.state.codebody);
      this.setState({
        allKeywords: [...new Set(this.state.keywordsSelected.concat(keywords))]
      }, () => {
        resourcesNoteModal.className = "resources-modal modal-on"
      })
    } else {
      resourcesNoteModal.className = "resources-modal modal-off"
    }
  }

  toggleResourceModal(){
    const step1 = document.getElementById('resources-step-1');
    step1.className = 'resources-modal modal-off';
    const wrapper = document.getElementById('edit-note-container');
    wrapper.className = 'modal-off';
    const noteEdit = document.getElementById('note-edit-wrapper');
    noteEdit.className = 'edit-note-container';
  }
  
  componentDidUpdate(){
    if(this.state.keywordsSelected.length === 5){
      this.limitKeywords();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { title, codebody, textdetails, tags, language_name, keywordsSelected } = this.state;
    let note = {
      title: title,
      codebody: codebody,
      textdetails: textdetails,
      tags: tags,
      language: language_name,
      keywords: keywordsSelected
    }
    this.props.updateNote(note, this.props.noteId)
      .then(() => {
        this.toggleResourceModal()
      })
  }

  updateKeywords(e) {
    e.preventDefault();
    // e.target.checked ? e.target.checked = false : e.target.checked = true;
    const keyword = e.target.value || e.target.innerText;
    let spaceRemoved = keyword.replace(/\s/g, '');
    let result;
    this.state.keywordsSelected.includes(spaceRemoved) ? (
      result = this.state.keywordsSelected.filter(word => word !== spaceRemoved)
    ) : (
      result = [spaceRemoved, ...this.state.keywordsSelected]
    )
    this.setState({
      keywordsSelected: result
    });
    // if(result.length === 5){
    //   this.limitKeywords();
    // }else 
    if(result.length === 4){
      this.freeKeywords();
    }
  };

  limitKeywords() {
    const keyword_checks = Object.values(document.getElementsByClassName('checkbox-option')).filter(ele => !ele.classList.contains('option-selected'));
    keyword_checks.forEach(checkbox => {
      checkbox.classList.add('disabled');
      // checkbox.disabled = true;
    })
  }

  freeKeywords(){
    const disabled_keywords = Object.values(document.getElementsByClassName('checkbox-option disabled'));
    disabled_keywords.forEach(disabled => {
      disabled.classList.remove('disabled');
      // checkbox.disabled = false;
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
    const languages = {
      'JavaScript': javascript({ jsx: true }),
      'HTML': html(),
      'CSS': css(),
      'C++': cpp(),
    }
    // const languages = [javascript({ jsx: true}), html(), cpp(), css()];
    // const language_names = ['JavaScript','HTML','C++','CSS'];
    this.setState({ lang: languages[e.target.value], language_name: e.target.value });
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
    const { isMobile } = this.props;
    const { allKeywords, keywordsSelected } = this.state;
    let resourceOptions;

    if (!isMobile) {
      const col1 = [];
      const col2 = [];
      allKeywords?.map((keyword,idx) => {
        if (idx % 2 === 0){
          col1.push(keyword);
        } else {
          col2.push(keyword);
        }
      })
      resourceOptions = (
        <>
          <div className='column1'>
            {
              col1?.map((keyword, i) =>
                <CheckBoxItem keyword={keyword} index={i}
                  key={`col1-${i}`} updateKeywords={this.updateKeywords}
                  selected={keywordsSelected.includes(keyword)}
                />
              )
            }

          </div>
          <div className='column2'>
            {
              col2?.map((keyword, i) =>
                <CheckBoxItem keyword={keyword} index={i}
                  key={`col2-${i}`} updateKeywords={this.updateKeywords}
                  selected={keywordsSelected.includes(keyword)}
                />
              )
            }
          </div>
        </>
      )
    } else {
      resourceOptions = (
        <div className='mobile-column'>
          {
            allKeywords.map((keyword, i) =>
              <CheckBoxItem keyword={keyword} index={i}
                key={`resource-${i}`} updateKeywords={this.updateKeywords}
                selected={keywordsSelected.includes(keyword)}
              />
            )
          }
        </div>
      )
    }

    return (
      <>
        {/* <div id='resources-note-container' className='modal-off'>
          <div className='modal-wrapper'> */}
          {/* </div>
        </div> */}
        <div className='edit-note-container' id='note-edit-wrapper'>
          <div className='edit-note-form'>
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
              {/* <span>{this.props.note.language}</span> */}
              <select id='lang-select' onChange={this.handleChange}>
                <option value={'JavaScript'}>JavaScript</option>
                <option value={'HTML'}>HTML</option>
                <option value={'C++'}>C++</option>
                <option value={'CSS'}>CSS</option>
              </select>
            </div>
            <div className='note-input'>
              <CodeMirror className='codemirror javascript'
                id='codebody-js'
                value={this.state.codebody}
                onChange={this.updateCode}
                height="200px"
                width='100%'
                theme='dark'
                extensions={[this.state.lang,
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
                onClick={this.toggleEditModal}
              >Update CodeMark</button>
            </div>

            <div id='hide-note-form'
              className='icon-only-button'
              title='hide form'
              onClick={this.cancelTextEdit}>
              <i className="fa-solid fa-square-minus"></i>
            </div>
          </div>
        </div>

        <div id="resources-step-1" className='resources-modal modal-off'>
          <div className='resources-header'>
            <h4>Resources</h4>
            <span>Select up to 5 keywords from the list below to get resources generated for.</span>
            <div>
              <strong>Currently selected: </strong> <span> {this.state.keywordsSelected.length}</span>
            </div>
          </div>
          <form className='resource-options'>
            <div className='keyword-options'>
              {resourceOptions}
            </div>
          </form>
          <div>
            <button id='keyword-submit' onClick={this.handleSubmit}>Submit</button>
          </div>
          <div id='hide-note-form'
          className='icon-only-button'
          title='hide form'
          onClick={this.toggleResourceModal}>
          <i className="fa-solid fa-square-minus"></i>
        </div>
        </div>
      </>
    )
  }
}

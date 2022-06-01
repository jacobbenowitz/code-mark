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
import TextareaAutosize from 'react-textarea-autosize';
import { getLanguage } from '../../util/webscrap_util';


export default class DummyHeroNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            codebody: "",
            textdetails: "",
            tags: [],
            newTag: "",
            tagForm: false,
            lang: javascript({ jsx: true }),
            suggestedLanguage: undefined,
            keywordsSelected: [],
            allKeywords: [],
            newResources: []
        }
        this.bindHandlers();
    }


    bindHandlers() {
        this.addLangTag = this.addLangTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.toggleTagForm = this.toggleTagForm.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        let lang = getLanguage(e)
        this.setState({
            codebody: e,
            suggestedLanguage: lang
        })
    }

    handleChange(e) {
        const languages = [javascript({ jsx: true }), html(), cpp(), css()];
        this.setState({ lang: languages[parseInt(e.target.value)] });
    }

    toggleResourcesModal(e) {
        e.preventDefault();
        const resourcesNoteModal =
            document.getElementById('resources-note-container');
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



    toggleForm() {
        const fullForm = document.getElementById('new-note-full');
        const miniForm = document.getElementById('new-note-mini');
        const codebody = document.getElementById('codebody-js');
        if (fullForm.style.display == 'none') {
            fullForm.style.display = 'flex';
            miniForm.style.display = 'none';
        } else {
            fullForm.style.display = 'none';
            miniForm.style.display = 'flex';
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
        return (
            <>
                <div className='new-note-container' id='new-note-full'>
                    <div className='new-note-form'>
                        <div id="note-title-input" className='note-input'>
                            <input type={'text'}
                                onClick={this.state.title === "" ? this.placeholderTitle : undefined}
                                onChange={this.update('title')}
                                id='title-code'
                                className='title-input'
                                value={this.state.title}
                                placeholder={'Signup to save'} />
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
                                height="100px"
                                width='300px'
                                theme='dark'
                                extensions={[this.state.lang,
                                EditorView.lineWrapping]}
                            />
                        </div>
                        <div className='note-input'>
                            <TextareaAutosize
                                onChange={this.update('textdetails')}
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
                                    </>) : " "}
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
                        {/* <div className='submit-wrapper'>
                            <button type='submit' id='code-note-submit'
                                className={(this.state.codebody.length > 1 &&
                                    this.state.codebody.length < 5001) ? 'save-button' : "save-button disabled"}
                                onClick={this.state.codebody.length ? this.toggleResourcesModal : undefined}
                            >Save CodeMark</button>
                        </div> */}

                        <div id='hide-note-form'
                            className='icon-only-button'
                            title='hide form'
                            onClick={this.toggleForm}>
                            <i className="fa-solid fa-square-minus"></i>
                        </div>
                    </div>
                </div>

                <div className='new-note-container' id='new-note-mini'
                    onClick={this.toggleForm}>
                    <div className='new-note-form' onClick={this.toggleForm}>
                        <div className='note-input' onClick={this.toggleForm}>
                            <CodeMirror className='codemirror javascript'
                                onMouseDown={this.toggleForm}
                                value={"Click to test out the CodeMark form..."}
                                height="56px"
                                width='320px'
                                theme='dark'
                                extensions={[html(),
                                EditorView.lineWrapping]}
                            />
                        </div>
                    </div>
                </div>
            </>
            // <>
            //     <div className='new-note-container' id='new-note-full'>
            //         {/* <button onClick={this.toggleResourcesModal}>ToggleTesting</button> */}
            //         <div className='new-note-form'>
            //             <form >
            //                 <div id="note-title-input" className='note-input'>
            //                     <input type={'text'}
            //                         onClick={this.placeholderTitle}
            //                         onChange={this.update('title')}
            //                         id='title-code'
            //                         className='title-input'
            //                         value={this.state.title}
            //                         placeholder={'Untitled note'} />
            //                 </div>
            //                 <div className='select-wrapper'>
            //                     <select id='lang-select'
            //                         value={this.state.lang} onChange={this.handleChange}>
            //                         <option value={'javascript'} defaultValue>JavaScript</option>
            //                         <option value={'html'}>HTML</option>
            //                         <option value={'cpp'}>C++</option>
            //                         <option value={'css'}>CSS</option>
            //                     </select>
            //                 </div>
            //                 <div className='note-input'>
            //                     <CodeMirror className='codemirror javascript'
            //                         id='codebody-js'
            //                         value={this.state.codebody}
            //                         onChange={this.updateCode()}
            //                         height="200px"
            //                         theme='dark'
            //                         extensions={[javascript({ jsx: true }),
            //                         EditorView.lineWrapping]}
            //                     />
            //                 </div>
            //                 <div className='note-input'>
            //                     <CodeMirror className='codemirror html'
            //                         value={this.state.codebody}
            //                         onChange={this.updateCode()}
            //                         height="200px"
            //                         theme='dark'
            //                         extensions={[html(),
            //                         EditorView.lineWrapping]}
            //                     />
            //                 </div>
            //                 <div className='note-input'>
            //                     <CodeMirror className='codemirror cpp'
            //                         value={this.state.codebody}
            //                         onChange={this.updateCode()}
            //                         height="200px"
            //                         theme='dark'
            //                         extensions={[cpp(),
            //                         EditorView.lineWrapping]}
            //                     />
            //                 </div>
            //                 <div className='note-input'>
            //                     <CodeMirror className='codemirror css'
            //                         value={this.state.codebody}
            //                         onChange={this.updateCode()}
            //                         height="200px"
            //                         theme='dark'
            //                         extensions={[css(),
            //                         EditorView.lineWrapping]}
            //                     />
            //                 </div>
            //                 <div className='note-input'>
            //                     <TextareaAutosize
            //                         onChange={this.update('textdetails')}
            //                         id='details-textarea'
            //                         className='note-input-details'
            //                         placeholder='Any additional notes?'
            //                         value={this.state.textdetails}
            //                     />
            //                 </div>
            //                 <button type='submit' id='code-note-submit'
            //                     className={"save-button dummy disabled"}
            //                 >Save</button>
            //             </form>


            //             <div id='hide-note-form' className='icon-only-button' onClick={this.toggleForm}>
            //                 <i className="fa-solid fa-square-minus"></i>
            //             </div>

            //             <div className='recommended-tag'
            //                 onClick={() => this.addLangTag(this.state.suggestedLanguage)}>
            //                 {this.state.suggestedLanguage ? (
            //                     <>
            //                         <span className='rec-tag'>Detected language:</span>
            //                         <span className='lang-tag'>{this.state.suggestedLanguage}</span>
            //                     </>) : " "}
            //             </div>

            //             <div className='tag-list'>
            //                 <span>Tags</span>
            //                 {
            //                     this.state.tags?.map((tag, i) =>
            //                         <NewNoteTagItem title={tag} key={`tag-${i}`}
            //                             deleteTag={this.deleteTag}
            //                         />)
            //                 }
            //             </div>

            //             <div className='note-tags-list new'>

            //                 <div className="tag-item-wrapper tag-icon-new new"
            //                     id='toggle-tag-form-button'
            //                     onClick={this.toggleTagForm}>
            //                     {this.state.tagForm ? (
            //                         <i className="fa-solid fa-minus"></i>
            //                     ) : (
            //                         <i className="fa-solid fa-circle-plus"></i>
            //                     )}
            //                 </div>

            //                 <form onSubmit={this.state.newTag.split(' ').join('').length ? this.updateTags : undefined}
            //                     className="tag-form-off" id="new-tag-form-new-note">
            //                     <input type={'text'}
            //                         className={'tag-form-input'}
            //                         onChange={this.update('newTag')}
            //                         placeholder={'New tag...'}
            //                         value={this.state.newTag.split(' ').join(' ')}
            //                         maxLength="50"
            //                     />

            //                     <button className={this.state.newTag.split(' ').join('').length ? '' : 'save-tag disabled'} id='tag-icon-save' type='submit'>
            //                         <i className="fa-solid fa-floppy-disk" />
            //                     </button>
            //                 </form>

            //             </div>

            //         </div>
            //     </div>
            //     <div className='new-note-container' id='new-note-mini'
            //         onClick={this.toggleForm}>
            //         <div className='new-note-form' onClick={this.toggleForm}>
            //             <div className='note-input' onClick={this.toggleForm}>
            //                 <CodeMirror className='codemirror javascript'
            //                     onMouseDown={this.toggleForm}
            //                     value={"Save a new note..."}
            //                     height="56px"
            //                     theme='dark'
            //                     extensions={[javascript({ jsx: true }),
            //                     EditorView.lineWrapping]}
            //                 />
            //             </div>
            //             <div className='note-input' onClick={this.toggleForm}>
            //                 <CodeMirror className='codemirror html'
            //                     onMouseDown={this.toggleForm}
            //                     value={"Save a new note..."}
            //                     height="56px"
            //                     theme='dark'
            //                     extensions={[html(),
            //                     EditorView.lineWrapping]}
            //                 />
            //             </div>
            //             <div className='note-input' onClick={this.toggleForm}>
            //                 <CodeMirror className='codemirror cpp'
            //                     onMouseDown={this.toggleForm}
            //                     value={"Save a new note..."}
            //                     height="56px"
            //                     theme='dark'
            //                     extensions={[cpp(),
            //                     EditorView.lineWrapping]}
            //                 />
            //             </div>
            //             <div className='note-input' onClick={this.toggleForm}>
            //                 <CodeMirror className='codemirror css'
            //                     onMouseDown={this.toggleForm}
            //                     value={"Save a new note..."}
            //                     height="56px"
            //                     theme='dark'
            //                     extensions={[css(),
            //                     EditorView.lineWrapping]}
            //                 />
            //             </div>
            //         </div>
            //     </div>
            // </>
        )
    }
}


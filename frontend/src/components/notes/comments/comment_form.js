import React from 'react';
import CommentItem from './comment_item';
import CodeCommentReadOnly from '../../code_editor/code_comment_readonly';
import TextareaAutosize from 'react-textarea-autosize';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippet: "",
      textbody: "",
      formActive: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this._clearSnippet = this._clearSnippet.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedText) {
      this.setState({
        codeSnippet: nextProps.selectedText
      })
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    let { codeSnippet, textbody } = this.state;
    let snippet;
    if (codeSnippet === 'Select text from the note above to comment') {
      snippet = ''
    } else snippet = codeSnippet;

    const comment = {
      codeSnippet: snippet,
      textbody: textbody,
      note: this.props.noteId
    }

    this.props.composeComment(comment)
      .then(() => {
        this.setState({
          codeSnippet: "",
          textbody: "",
        })
      }, () => this.props.clearSnippet())
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  _clearSnippet() {
    this.setState({ codeSnippet: '' })
    this.props.clearSnippet()
  }

  toggleForm() {
    if (this.state.formActive) {
      this.setState({ formActive: false })
    } else {
      this.setState({ formActive: true })
    }
  }

  promptCodeHighlight() {
    const noteMain = document.getElementById('note-show-main');
    const instructions = document.getElementById('highlight-instructions');
    // const codeHighlightButton1 =
    //   document.getElementById('code-highlight-button-1');
    // const codeHighlightButton2 =
    //   document.getElementById('code-highlight-button-2');
    instructions.classList = "visable"
    noteMain.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      instructions.classList = "hidden"
    }, 5000)
    // codeHighlightButton1.className = "hidden";
    // codeHighlightButton2.className = "hidden";
  }

  render() {

    let cancelSnippetIcon;

    if (this.state.codeSnippet.length) {
      cancelSnippetIcon = (
        <div title='remove code snippet'
          className='cancel-snippet-button icon-only-button'
          onClick={this._clearSnippet}
        >
          <i className="fa-solid fa-circle-minus" />
        </div>
      )
    }

    return (
      <>
        <div className='new-comment-container'>
          <form onSubmit={this.handleSubmit} className='comment-form'>
            <span className='comment-form-title'>Write a new comment</span>
            <div className='add-code-snippet-wrapper'>
              {cancelSnippetIcon}
              <div className="code-snippet-comment">
                <CodeCommentReadOnly
                  codeSnippet={this.state.codeSnippet} />
              </div>
            </div>
            <TextareaAutosize
              onChange={this.update('textbody')}
              id='new-comment-textarea'
              className='comment-body-input'
              placeholder={'Write your comment here!'}
              value={this.state.textbody}
              required
            />
            <button id="comment-submit" type='submit'>Comment</button>
          </form>
        </div>
      </>
    )
  }
}

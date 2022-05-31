import React from 'react';
import CommentItem from './comment_item';
import CodeCommentReadOnly from '../../code_editor/code_comment_readonly';

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
    const comment = {
      codeSnippet: codeSnippet,
      textbody: textbody,
      note: this.props.noteId
    }

    this.props.composeComment(comment)
      .then(() => {
        this.setState({
          codeSnippet: "",
          textbody: "",
        })
      })
    // .then(() => {
    //   this.props.fetchNoteComments(this.props.noteId)
    // })
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
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

    return (
      <>
        <div className='new-comment-container'>
            <form onSubmit={this.handleSubmit} className='comment-form'>
            <span className='comment-form-title'>Write a new comment</span>
            <div className='cancel-snippet-button icon-only-button'></div>
              <div className='add-code-snippet-wrapper'>
                <div className="code-snippet-comment">
                  <CodeCommentReadOnly
                    codeSnippet={this.state.codeSnippet} />
                </div>
              </div>
              <textarea
                onChange={this.update('textbody')}
                id='new-comment-textarea'
                className='comment-body-input'
                placeholder={'Have a something to say about this CodeMark? Let the author know!'}
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

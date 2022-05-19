import React from 'react';
import CommentItem from './comment_item';
import CodeCommentReadOnly from '../../code_editor/code_comment_readonly';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippet: "",
      textbody: "",
      // newComment: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.toggleForm = this.toggleForm.bind(this);
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

  render() {
    const tx = document.querySelectorAll("#code-snippet-new");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    }

    return (
      <>
        <div className='new-comment-container'>
          <form onSubmit={this.handleSubmit} className='comment-form'>
            <span className='comment-form-title'>Write a new comment</span>
            <div className='add-code-snippet-wrapper'>
              <div className="code-snippet-comment">
                <div className="code-snippet-comment">
                  <CodeCommentReadOnly
                    onChange={this.update('codeSnippet')}
                    codeSnippet={this.state.codeSnippet} />
                </div>
              </div>
            </div>
            <textarea
              onChange={this.update('textbody')}
              id='comment-textarea'
              className='comment-body-input'
              placeholder={'Have a question about this CodeMark? Let the author know!'}
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

import React from 'react';
import CommentItem from './comment_item';

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

    // toggleForm() {
    //   const 
    // }

    return (
      <>
        <div className='new-comment-container'>
          <form onSubmit={this.handleSubmit} className='comment-form'>
            <span className='comment-form-title'>Write a new comment</span>
            <div className='add-code-snippet-wrapper'>
              <div className="code-snippet-comment">
                <textarea id='code-snippet-new' className="code code-textarea"
                  value={this.state.codeSnippet}
                  defaultValue={'Add a code snippet'}
                  onChange={this.update('codeSnippet')}
                ></textarea>
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
        {/* {this.state.newComment ? (
          <CommentItem
            currentUser={this.props.currentUser}
            key={'new-comment-1'}
            comment={this.state.newComment}
            user={this.props.currentUser}
          />) : ''} */}
      </>
    )
  }
}

import React from 'react';
import CommentItem from './comment_item';

export default class CommentFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippet: '',
      textbody: "",
      newComment: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({
      codeSnippet: nextProps.selectedText
    })
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
    this.setState({
      codeSnippet: "",
      textbody: "",
      newComment: comment
    }, () => this.props.toggleCommentModal())
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  render() {
    // debugger
    // const tx = document.getElementsByTagName("textarea");
    // for (let i = 0; i < tx.length; i++) {
    //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    //   tx[i].addEventListener("input", OnInput, false);
    // }

    // function OnInput() {
    //   this.style.height = "auto";
    //   this.style.height = (this.scrollHeight) + "px";
    // }
    // const codeSnippetField = document.getElementById('code-snippet-new');
    // codeSnippetField.focus()
    return (
      <>
        <div className='new-comment-container'>
          <form onSubmit={this.handleSubmit} className='comment-form'>
            <div className='add-code-snippet-wrapper'>
              <div className="code-snippet-comment">
                <textarea id='code-snippet-new-modal' className="code"
                  value={this.state.codeSnippet}
                  onChange={this.update('codeSnippet')}
                />
              </div>
            </div>
            <textarea
              onChange={this.update('textbody')}
              id='comment-textarea'
              className='comment-body-input'
              placeholder='Have a question about this CodeMark? Let the author know!'
            // value={this.state.textbody}
            />
            <button id="comment-submit" type='submit'>Comment</button>
          </form>
        </div>
      </>
    )
  }
}

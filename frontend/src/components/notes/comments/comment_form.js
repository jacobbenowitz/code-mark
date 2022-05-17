import React from 'react';
import CommentItem from './comment_item';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippet: "Add a code snippet",
      textbody: "",
      newComment: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (nextProps.selectedText) {
      this.setState({
        codeSnippet: nextProps.selectedText
      })
    }
    if (nextProps.newComment) {
      this.setState({
        newComment: nextProps.newComment
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
    this.setState({
      codeSnippet: "",
      textbody: "",
      newComment: comment
    })
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
            <div className='add-code-snippet-wrapper'>
              <div className="code-snippet-comment">
                <textarea id='code-snippet-new' className="code code-textarea"
                  value={this.state.codeSnippet}
                  // defaultValue={'Code snippet here'}
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
            />
            <button id="comment-submit" type='submit'>Comment</button>
          </form>
        </div>
        {this.state.newComment ? (
          <CommentItem
            key={'new-comment-1'}
            id={this.state.newComment._id}
            comment={this.state.newComment}
          // deleteThisComment={this.deleteThisComment}
          />) : ''}
      </>
    )
  }
}

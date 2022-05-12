import React from 'react'

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSnippet: "",
      textbody: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    let { codeSnippet, textbody } = this.state;

    let comment = {
      codeSnippet: codeSnippet,
      textbody: textbody,
      note: this.props.noteId
    }

    this.props.composeComment(comment)
      .then(() => (
        this.setState({
          codeSnippet: "",
          textbody: ""
        })
      ))
  }

  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  render() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    }

    return (
      <div className='new-comment-container'>
        <form onSubmit={this.handleSubmit} className='comment-form'>
          <div className='add-code-snippet-wrapper'>
            <div className="code-snippet-comment">
              <textarea id='code-snippet-new' className="code code-textarea"
                // defaultValue={"Code from note "}
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
            value={this.state.textdetails}
          />
          <button id="comment-submit" type='submit'>Comment</button>
        </form>
      </div>
    )
  }
}

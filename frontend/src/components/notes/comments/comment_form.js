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
    // debugger
    let comment = {
      codeSnippet: codeSnippet,
      textbody: textbody
    }
    // debugger
    this.props.writeComment(comment)
      .then(() => (
        this.setState({
          codeSnippet: "",
          textbody: ""
        })
      ))
  }

  init() {
    const observe = (element, event, handler) => {
      element.addEventListener(event, handler, false);
    };

    var text = document.getElementById('comment-textarea');
    function resize() {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize() {
      window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
  }


  update(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  render() {
    return (
      <div className='new-comment-container'>
        <form onSubmit={this.handleSubmit} className='comment-form'>
          <textarea
            onChange={this.update('textbody')}
            onFocus={this.init}
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

import React from "react";

class CheckBoxItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e){
    e.stopPropagation();
    this.setState({checked: !this.state.checked});
    this.props.updateKeywords(e);
  }
  render() {
    let { keyword, updateKeywords, index } = this.props;
    // debugger;
    return (
      <div className={this.state.checked ? 'checkbox-option option-selected' : 'checkbox-option'} key={index}>
        <input type='checkbox' 
          id={`${keyword}-check`}
          key={`${keyword}-check`}
          onMouseUp={this.handleCheck}
          value={keyword}
          name={keyword}
          className='checkbox' />
        <label htmlFor={`${keyword}-check`}
          key={`${keyword}-label`}
          onMouseUp={this.handleCheck}
          className='checkbox-label'>
          {keyword} </label>
      </div>
    )
  }
}

export default CheckBoxItem;
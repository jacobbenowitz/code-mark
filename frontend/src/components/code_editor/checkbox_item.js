import React from "react";

class CheckBoxItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { keyword, updateKeywords, index } = this.props;
    return (
      <div className='checkbox-option' key={index}>
        <input type='checkbox' 
          id={`${keyword}-check`}
          key={`${keyword}-check`}
          onMouseUp={updateKeywords}
          value={keyword}
          name={keyword}
          className='checkbox' />
        <label htmlFor={`${keyword}-check`}
          key={`${keyword}-label`}
          onMouseUp={updateKeywords}
          className='checkbox-label'>
          {keyword} </label>
      </div>
    )
  }
}

export default CheckBoxItem;
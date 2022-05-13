import React from "react";

class CheckBoxItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { keyword, updateKeywords } = this.props;
    return (
      <div className='checkbox-option'>
        <input type='checkbox' id={`${keyword}-check`}
          onMouseUp={updateKeywords}
          value={keyword}
          name={keyword}
          className='checkbox' />
        <label htmlFor={`${keyword}-check`}
          className='checkbox-label'>
          {keyword} </label>
      </div>
    )
  }
}

export default CheckBoxItem;
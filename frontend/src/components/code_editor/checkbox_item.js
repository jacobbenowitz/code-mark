import React from "react";

const CheckBoxItem = ({keyword}) => (
  <div className='checkbox-option'>
    <label className='checkbox-label'> {keyword} </label>
    <input type={'checkbox'} value={keyword}
      className='checkbox' />
  </div>
)

export default CheckBoxItem;
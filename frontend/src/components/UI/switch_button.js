import React from 'react';

const SwitchButton = ({ onToggle, isToggled }) => {
  
  return (
    <label className='switch'>
      <input type='checkbox'
        checked={isToggled}
        onChange={() => onToggle()}
      />
      <span className='slider' />
    </label>
  )
}

export default SwitchButton;
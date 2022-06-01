import React from 'react';

const SwitchButton = ({onToggle, isToggled, isCurrentUser}) => {
  if (isCurrentUser) {
    return (
      <label className='switch'>
        <input type='checkbox'
          checked={isToggled}
          onChange={() => onToggle()}
        />
        <span className='slider' />
      </label>
    )
  } else return (
    <div className='public-status'>
      <span>{isToggled ? 'Public' : 'Private'}</span>
    </div>
  )
}

export default SwitchButton;
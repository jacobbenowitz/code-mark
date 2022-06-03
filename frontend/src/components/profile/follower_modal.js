import React from "react";




const Followers = ({ followers, toggleFollowerModal}) => (
    <div className='follower-header-container' id='follower-header-container'>
        <div id='hide-note-form'
            className='icon-only-button'
            title='hide form'
            onClick={toggleFollowerModal}>
            <i className="fa-solid fa-square-minus"></i>
        </div>
        <div>
            {followers.map(follower => (
               <li>
                    <span> {follower.username} </span>
               </li>
            ))}
        </div>
    </div>
    
)

export default Followers;
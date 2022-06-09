import React from "react";
import { Link } from "react-router-dom";




const Followers = ({ followers, following, toggleFollowerModal}) => { 
    let followersList, followingList;

    if (followers.length){
        followersList = (
        <div className="user-list-wrapper">
            <span className="following-header"> Followers </span>
            <ul className="user-list"> 
                {followers.map((follower,i) => (
                <li key={`follower-${i}`}>
                        <Link target="_blank" to={`/users/${follower._id}`}> {follower.username} </Link>
                </li>
                ))}
            </ul>
        </div>
        ) 
    }
    if (following.length){
        followingList = (
            <div className="user-list-wrapper">
                <span className="following-header"> Following </span>
                <ul className="user-list">
                    {following.map((following, i) => (
                        <li key={`follower-${i}`}>
                            <Link target="_blank" to={`/users/${following._id}`}> {following.username} </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ) 
    }
    return (
         <>

        <div id='hide-note-form'
            className='icon-only-button'
            title='hide form'
            onClick={toggleFollowerModal}>
            <i className="fa-solid fa-square-minus"></i>
        </div>
        {followersList} 
        {followingList}
     
</>
    )
}
export default Followers;
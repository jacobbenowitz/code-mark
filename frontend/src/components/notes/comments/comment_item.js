import React from "react";

const CommentItem = props => {


  // Only show comment delete button if the note's user is the current user 
  // session.user.id === notes.all[0].id


  // function toggleDeleteModal() {
  //    
  //   const deleteModal = document.getElementById('comment-modal-container');
  //   if (deleteModal.className === "modal-off") {
  //     deleteModal.className = "modal-on";
  //   } else {
  //     deleteModal.className = "modal-off";
  //   }
  // }

  return (
    <div>
      {/* modal div */}
      {/* <div id='comment-modal-container' className='modal-off' >
        <div className='modal-wrapper'>
          <div className='cancel-modal'>
            <span>Are you sure you want to delete this comment?</span>
            <div className='modal-buttons'>
              <div className='delete-note icon-button'
                // onClick={props.deleteThisComment(props.id)}>
                onClick={console.log('blahhhh delete me')}>
                <i className="fa-solid fa-trash fa-lg"></i>
                <span>Delete </span>
              </div>
              <div className='cancel icon-button'
                onClick={() => toggleDeleteModal()}>
                <i className="fa-solid fa-ban fa-lg"></i>
                <span>
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="comment-wrapper">
        <div className="user-info-wrapper">
          <div className="avatar-wrapper">
            <div className="avatar-container-sm">
              {/* <span>{props.user.username?.slice(0, 2).toUpperCase()}</span> */}
              <span>JM</span>
            </div>
          </div>
          <div className="user-details">
            <span className="username-comment">{props.user?.username}</span>
            <span className="comment-time">{props.comment.created_at}</span>
          </div>
        </div>

        <div className="code-snippet-comment">
          <textarea className="code code-textarea"
            value={props.comment.codeSnippet}
          />

        </div>
        <div className="comment-body-wrapper">
          <span className="comment-body">
            {props.comment.textbody}
          </span>
        </div>

        {/* toggle modal */}
        {/* <div className='delete-note icon-button'
          onClick={() => toggleDeleteModal()}>
          <i className="fa-solid fa-trash fa-lg"></i>
          <span>Delete</span>
        </div> */}
      </div>
    </div >
  )

  // return props.comment ? (

  // modal div
  // <div>
  //   <div id='comment-modal-container' className='modal-off' >
  //     <div className='modal-wrapper'>
  //       <div className='cancel-modal'>
  //         <span>Are you sure you want to delete this comment?</span>
  //         <div className='modal-buttons'>
  //           <div className='delete-note icon-button'
  //             onClick={() => props.removeComment(props.id)}>
  //             <i className="fa-solid fa-trash fa-lg"></i>
  //             <span>Delete </span>
  //           </div>
  //           <div className='cancel icon-button'
  //             onClick={() => toggleDeleteModal()}>
  //             <i className="fa-solid fa-ban fa-lg"></i>
  //             <span>
  //               Cancel
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //   <div className="comment-wrapper">
  //     <div className="user-info-wrapper">
  //       <div className="avatar-wrapper">
  //         <div className="avatar-container-sm">
  //           {/* match comment user to user to get username*/}
  //           {/* {props.comment.username} */}
  //           <span>CM</span>
  //         </div>
  //       </div>
  //       <div className="user-details">
  //         <span className="username-comment">{props.comment.username}</span>
  //         <span className="comment-time">{props.comment.created_at}</span>
  //       </div>
  //     </div>

  //     <div className="code-snippet-comment">
  //       <textarea className="code code-textarea"
  //         defaultValue={"Code from note "} />
  //     </div>
  //     <div className="comment-body-wrapper">
  //       <span className="comment-body">{props.comment.textbody}</span>
  //     </div>

  //     {/* toggle modal */}
  //     <div className='delete-note icon-button'
  //       onClick={() => toggleDeleteModal()}>
  //       <i className="fa-solid fa-trash fa-lg"></i>
  //       <span>Delete</span>
  //     </div>
  //   </div>
  // </div > ) : (<h4>Loading...</h4>)
}

export default CommentItem;
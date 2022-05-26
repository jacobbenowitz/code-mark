import React from "react"
import ContentLoader from "react-content-loader"
import CodeNoteItem from "../notes/code_note_item"

const AllNotes = (props) => {
    const col1 = [];
    const col2 = [];
    // debugger;
    props.notes?.map((note, idx) => {
        if (idx < 20) {
            if (idx % 2 === 0) {
                col1.push(note);
            } else {
                col2.push(note);
            }
        }
    })
    // debugger;
    return (
        <div className='desktop-notes'>
            <div className='column1'>
                {col1.map((note) =>
                    <CodeNoteItem key={note._id}
                        title={note.title}
                        tags={note.tags}
                        likes={note.likes}
                        username={note.user.username}
                        userId={note.user.userId}
                        textDetails={note.textdetails}
                        codeBody={note.codebody}
                        id={note._id}
                        comments={note.comments}
                        updatedAt={note.updatedAt}
                        createdAt={note.createdAt}
                    />
                )}
            </div>
            <div className='column2'>
                {col2.map((note) =>
                    <CodeNoteItem key={note._id}
                        title={note.title}
                        tags={note.tags}
                        likes={note.likes}
                        username={note.user.username}
                        userId={note.user.userId}
                        textDetails={note.textdetails}
                        codeBody={note.codebody}
                        id={note._id}
                        comments={note.comments}
                        updatedAt={note.updatedAt}
                        createdAt={note.createdAt}
                    />
                )}
            </div>
        </div>
    )
}


export default AllNotes
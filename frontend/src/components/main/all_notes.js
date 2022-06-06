import React from "react"
import CodeNoteItem from "../notes/code_note_item"
import CodeNoteItemLoader from "../content_loaders/placeholder_components/code_note_loader";

const AllNotes = (props) => {
    const col1 = [];
    const col2 = [];
    props.notes?.map((note, idx) => {
        if (idx < 20) {
            if (idx % 2 === 0) {
                col1.push(note);
            } else {
                col2.push(note);
            }
        }
    })
    debugger;
    if((!props.notes || props.notes.length === 0) && (props.status === 'DONE' || props.status === 'IDLE')){
        return (
            <div className='desktop-notes'>
                <div className='column1'>
                </div>
                <div className='column2'>
                </div>
            </div>
        )
    }else if (props.status === 'BUSY') {
        return (
            <div className='desktop-notes'>
                <div className='column1'>
                    <CodeNoteItemLoader />
                    <CodeNoteItemLoader />
                    <CodeNoteItemLoader />
                </div>
                <div className='column2'>
                    <CodeNoteItemLoader />
                    <CodeNoteItemLoader />
                </div>
            </div>
        )
    } else if (props.status === 'DONE' || (props.notes.length && props.status === 'IDLE') ) {
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
                                language={note.language}
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
                                language={note.language}
                            />
                        )}
                    </div>
            </div>
        )
    } 
    // else {
    //     return (
    //         <div className='desktop-notes'>
    //             <div className='column1'>
    //             </div>
    //             <div className='column2'>
    //             </div>
    //         </div>
    //     )
    // }

}


export default AllNotes
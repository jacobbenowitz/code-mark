import React from "react"
import ContentLoader from "react-content-loader"
import CodeNoteItem from "../notes/code_note_item"

const AllNotes = (props) => (
    props.notes?.map( (note) =>
                <CodeNoteItem key={note._id}
                    title={note.title}
                    tags={note.tags}
                    textDetails={note.textdetails}
                    codeBody={note.codebody}
                    id={note._id}
                />
    )
    
)


export default AllNotes
import React from "react"
import ContentLoader from "react-content-loader"
import CodeNoteItem from "../notes/code_note_item"

const AllNotes = (props) => (
    props.notes?.map((note) =>
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
    )

)


export default AllNotes
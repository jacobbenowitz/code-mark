import React from 'react';
import CodeNoteItem from './code_note_item';

class RecentNotes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.note ? (
      <div className='note-list-container'>
        <CodeNoteItem key={this.props.note?._id}
          likes={this.props.note?.likes}
          id={this.props.note?._id}
          username={this.props.note.user.username}
          userId={this.props.note.user.userId}
          tags={this.props.note?.tags}
          title={this.props.note?.title}
          textDetails={this.props.note?.textdetails}
          codeBody={this.props.note?.codebody}
          createdAt={this.propsnote?.createdAt}
          language={note.language}
        />
      </div>
    ) : (
      <span className='none-found'>No recent notes</span>
    )
    // return (
    //   <div className='note-list-container'>
    //     <CodeNoteItem key={this.props.note?._id}
    //       id={this.props.note?._id}
    //       tags={this.props.note?.tags}
    //       title={this.props.note?.title}
    //       textDetails={this.props.note?.textdetails}
    //       codeBody={this.props.note?.codebody}
    //       createdAt={this.propsnote?.createdAt}
    //     />
    //   </div>
    // )
  }
}

export default RecentNotes;
import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';

export default class Discover extends React.Component {

  componentWillMount() {
    this.props.fetchNotes();
  };

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  isMobile(){
    // debugger;
    return window.innerWidth < 680;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu
          tagType={'discover'}
          tags={this.props.tags}
        />
        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              title={'Discover Notes'}
              noteCount={this.props.noteCount}
              type={'default'}
            />
            <div className='note-list-container'>
              {this.props.allNotes.length === 0 ? (
                <span>No notes found</span>
              ) :
                this.isMobile() ?
                <MobileNotes notes={this.props.allNotes} />
                : <AllNotes notes={this.props.allNotes} />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

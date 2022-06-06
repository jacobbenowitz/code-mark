import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';
import MobileTags from './mobile/mobile_tags';

export default class Discover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: false
    }
  }

  componentWillMount() {
    this.props.fetchNotes();
  };

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({ mobile: this.isMobile() })
  }

  componentDidUpdate() {
    const mobileStatus = this.isMobile();

    if (this.state.mobile !== mobileStatus) {
      this.setState({ mobile: mobileStatus })
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {
    const { mobile } = this.state;
    let sideCarMenu, mobileTags;

    if (!mobile) {
      sideCarMenu = (
        <SideCarMenu
          tagType={'discover'}
          tags={this.props.tags}
          status={this.props.status}
        />
      )
    }

    if (mobile && this.props.tags) {
      mobileTags = (
        <MobileTags
          tags={this.props.tags}
          type={'discover'}
        />
      )
    }
    // debugger;
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        { sideCarMenu }
        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              title={'Discover Notes'}
              noteCount={this.props.noteCount}
              type={'default'}
              status={this.props.status}
            />
            {mobileTags}
            <div className='note-list-container'>
              {
                mobile ?
                  <MobileNotes
                    notes={this.props.allNotes}
                    status={this.props.status}
                  />
                  :
                  <AllNotes
                    notes={this.props.allNotes}
                    status={this.props.status}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

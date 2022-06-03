import React from 'react';
import AllNotes from './all_notes';
import SideCarMenu from './side_car_menu';
import MobileNotes from './mobile_notes';
import {
  filterNotesByTag,
  orderUserNotes
} from '../../util/selectors';
import SectionTitle from '../UI/section_title';

export default class DiscoverFiltered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: undefined,
      notes: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.props.fetchNotes();
  };

  componentWillReceiveProps(nextState) {
    if (nextState.allNotes && nextState.filter !== this.state.filter) {
      let filtered = filterNotesByTag(nextState.filter, nextState.allNotes);
      this.setState({
        notes: orderUserNotes(filtered),
        filter: nextState.filter
      })
    }
  }

  isMobile(){
    return window.innerWidth < 680;
  }

  render() {
    return (
      <div className={this.isMobile() ? 'main-mobile' : 'main-sidebar'}>
        <div className='nav-sidecar'>
          <SideCarMenu tagType={'discover'} tags={this.props.tags} />
        </div>

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              type={'filtered'}
              noteCount={this.state.notes.length}
              filter={this.state.filter}
              title={'Discover'}
            />
            <div className='note-list-container'>
              {
                this.isMobile() ?
                <MobileNotes notes={this.state.notes} />
                : <AllNotes notes={this.state.notes} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

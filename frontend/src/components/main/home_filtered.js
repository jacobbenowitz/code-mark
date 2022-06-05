
import React from 'react';
import SideCarMenu from './side_car_menu';
import AllNotes from './all_notes';
import { filterNotesByTag, orderUserNotes } from '../../util/selectors';
import MobileNotes from './mobile_notes';
import SectionTitle from '../UI/section_title';
import FilteredNotes from '../notes/filtered_notes';

export default class HomeFiltered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNotes: [],
      tags: [],
      filter: undefined,
      mobile: false
    }
  }

  componentWillMount() {
    this.props.fetchUserNotes(this.props.currentUser.id);
    this.props.fetchCurrentUser();
    this.setState({ mobile: this.isMobile() })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    const { userNotes, currentUser, tags, filter } = this.props;
    const mobileStatus = this.isMobile();

    if (userNotes.length && Object.values(currentUser).length
      && filter !== this.state.filter) {

      const filteredNotes = filterNotesByTag(filter, userNotes)

      this.setState({
        userNotes: orderUserNotes(filteredNotes),
        tags: tags,
        filter: filter
      })
      if (this.state.mobile !== mobileStatus) {
        this.setState({ mobile: mobileStatus })
      }
    }
  }

  isMobile() {
    return window.innerWidth < 680;
  }

  render() {
    const { mobile, filter, userNotes } = this.state;
    return (
      <div className={mobile ? 'main-mobile' : 'main-sidebar'}>
        <SideCarMenu tagType={'home'} tags={this.props.tags} />

        <div className='home-main'>
          <div className='notes-section'>
            <SectionTitle
              title={'My notes'}
              filter={filter}
              type={'filtered'}
              noteCount={userNotes.length}
              status={this.props.status}
              mobile={mobile}
            />
            <div className='note-list-container'>
              <FilteredNotes 
                notes={userNotes}
                status={this.props.status}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

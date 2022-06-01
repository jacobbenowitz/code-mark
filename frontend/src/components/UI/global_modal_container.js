import { connect } from "react-redux";
import GlobalModal from './global_modal'

const mapStateToProps = (state) => {
  const { notes, session, users, comments } = state.errors;
  return {
    noteErrors: notes,
    sessionErrors: session,
    userErrors: users,
    commentErrors: comments
  }
}

export default connect(mapStateToProps)(GlobalModal)
import { connect } from "react-redux";
import GlobalModal from './global_modal'

const mapStateToProps = (state) => {
  const { notes, session, users } = state.errors;
  return {
    noteErrors: notes,
    sessionErrors: session,
    userErrors: users
  }
}

export default connect(mapStateToProps)(GlobalModal)
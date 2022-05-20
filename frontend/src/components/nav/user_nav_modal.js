import React from "react";
import { Link } from "react-router-dom";

export default class UserNavModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const klass = this.props.modalClass;

    return (
      <div id="user-modal"
        className={"nav-modal-container" + klass}
        onClick={this.props.handleClick} >

        {this.props.userLinks}

      </div>
    )
  }
}

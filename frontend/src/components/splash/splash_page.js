import React from "react";
import Link from "react-router-dom";

export default class SplashPage extends React.Component {

  render() {
    return (
      <div className="splash-container">
        {/* hero */}
        <div className="splash-hero">
          <div className="hero-left-col">
            <h1>Welcome to CodeMark</h1>
            <p className="tagline">Smart bookmarks for code</p>
          </div>
          <div className="hero-right-col">
            {/* login and signup buttons */}
          </div>
        </div>

        {/* summary of features */}
        {/* credits to team members */}
      </div>
    )
  }
}
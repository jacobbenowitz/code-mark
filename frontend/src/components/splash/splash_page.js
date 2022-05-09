import React from "react";
import { Hero } from "./hero";
import { DemoInfo } from "./demo_info";


export default class SplashPage extends React.Component {

  render() {
    return (
      <div id="landing-page">
        { Hero }
        {/* summary of features */}
        {DemoInfo}
        {/* credits to team members */}
      </div>
    )
  }
}
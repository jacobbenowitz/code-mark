import React from "react";
import { Hero } from "./hero";
import { DemoInfo } from "./demo_info";
import { EditorsChoiceLanding } from "./editors_choice";
import { SimpleCTA } from "./simple_cta_section";

export default class SplashPage extends React.Component {

  render() {
    return (
      <div id="landing-page">
        { Hero }
        {/* summary of features */}
        {DemoInfo}
        {EditorsChoiceLanding}
        {/* credits to team members */}
        { SimpleCTA }
      </div>
    )
  }
}
import React from "react"
import ContentLoader from "react-content-loader"

const HomeHeaderLoader = (props) => (
  <ContentLoader
    speed={1}
    width={385}
    height={70}
    viewBox="0 0 385 70"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    // style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="12" ry="12" width="219" height="26" />
    <rect x="2" y="42" rx="12" ry="12" width="367" height="22" />
  </ContentLoader>
)

export default HomeHeaderLoader


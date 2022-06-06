import React from "react"
import ContentLoader from "react-content-loader"

const SectionTitleLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={360}
    height={75}
    viewBox="0 0 360 75"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="2" y="5" rx="15" ry="15" width="145" height="34" />
    <rect x="2" y="55" rx="8" ry="8" width="207" height="16" />
  </ContentLoader>
)

export default SectionTitleLoaderMobile


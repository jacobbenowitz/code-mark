import React from "react"
import ContentLoader from "react-content-loader"

const ActionIconsLoader = (props) => (
  <ContentLoader
    speed={1}
    width={775}
    height={33}
    viewBox="0 0 775 33"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="35" y="0" rx="7" ry="7" width="104" height="33" />
    <rect x="335" y="0" rx="7" ry="7" width="94" height="33" />
    <rect x="625" y="0" rx="7" ry="7" width="110" height="33" />
  </ContentLoader>
)

export default ActionIconsLoader


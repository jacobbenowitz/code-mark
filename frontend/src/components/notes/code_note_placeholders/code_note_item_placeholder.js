import React from "react"
import ContentLoader from "react-content-loader"

const CodeNotePlaceholder = (props) => (
  <ContentLoader
    speed={1}
    width={'100%'}
    height={275}
    viewBox="0 0 375 275"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    {...props}
  >
    <rect x="20" y="101" rx="2" ry="2" width="168" height="22" />
    <rect x="20" y="132" rx="2" ry="2" width="235" height="17" />
    <rect x="14" y="170" rx="12" ry="12" width="350" height="100" />
    <rect x="20" y="70" rx="2" ry="2" width="100" height="17" />
    <rect x="258" y="70" rx="2" ry="2" width="100" height="17" />
    <rect x="258" y="22" rx="2" ry="2" width="100" height="17" />
    <rect x="20" y="22" rx="2" ry="2" width="107" height="22" />
  </ContentLoader>
)

export default CodeNotePlaceholder;
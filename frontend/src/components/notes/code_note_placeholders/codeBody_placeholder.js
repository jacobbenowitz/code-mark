import React from "react"
import ContentLoader from "react-content-loader"

const CodeBodyPlaceholder = (props) => (
  <ContentLoader
    speed={1}
    width={'100%'}
    height={150}
    viewBox="0 0 350 150"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="350" height="150" />
  </ContentLoader>
)

export default CodeBodyPlaceholder


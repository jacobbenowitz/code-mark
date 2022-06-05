import React from "react"
import ContentLoader from "react-content-loader"

const SingleButtonLoader = (props) => (
  <ContentLoader
    speed={1}
    width={95}
    height={33}
    viewBox="0 0 95 33"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    {...props}
  >
    <rect x="0" y="0" rx="6" ry="6" width="95" height="32" />
  </ContentLoader>
)

export default SingleButtonLoader


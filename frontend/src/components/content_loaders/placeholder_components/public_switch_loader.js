import React from "react"
import ContentLoader from "react-content-loader"

const PublicSwitchLoader = (props) => (
  <ContentLoader
    speed={1}
    width={170}
    height={35}
    viewBox="0 0 170 35"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    {...props}
  >
    <rect x="0" y="0" rx="15" ry="15" width="165" height="32" />
  </ContentLoader>
)

export default PublicSwitchLoader


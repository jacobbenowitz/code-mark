import React from "react"
import ContentLoader from "react-content-loader"

const TagsMobileLoader = (props) => (
  <ContentLoader
    speed={2}
    width={380}
    height={70}
    viewBox="0 0 380 70"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <rect x="1" y="2" rx="10" ry="10" width="50" height="22" />
    <rect x="2" y="35" rx="5" ry="5" width="64" height="30" />
    <rect x="73" y="35" rx="5" ry="5" width="86" height="30" />
    <rect x="167" y="35" rx="5" ry="5" width="69" height="30" />
    <rect x="244" y="35" rx="5" ry="5" width="100" height="30" />
    <rect x="351" y="35" rx="5" ry="5" width="100" height="30" />
  </ContentLoader>
)

export default TagsMobileLoader


import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowTopLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={390}
    height={33}
    viewBox="0 0 390 33"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="12" y="1" rx="2" ry="2" width="105" height="30" />
    <rect x="151" y="1" rx="2" ry="2" width="90" height="30" />
    <rect x="272" y="1" rx="2" ry="2" width="105" height="30" />
  </ContentLoader>
)

export default NoteShowTopLoaderMobile


import React from "react"
import ContentLoader from "react-content-loader"

const NoteShowResourcesLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={370}
    height={30}
    viewBox="0 0 370 30"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    style={{ width: '100%' }}
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="14" ry="14" width="123" height="30" />
  </ContentLoader>
)

export default NoteShowResourcesLoaderMobile


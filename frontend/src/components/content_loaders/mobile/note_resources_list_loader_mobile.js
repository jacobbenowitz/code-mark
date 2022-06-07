import React from "react"
import ContentLoader from "react-content-loader"

const NoteResourcesListLoaderMobile = (props) => (
  <ContentLoader
    speed={1}
    width={375}
    height={105}
    viewBox="0 0 375 105"
    backgroundColor="#545454"
    foregroundColor="#6f6d6d"
    // style={{ width: '100%' }}
    // preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="130" height="24" />
    <rect x="0" y="48" rx="4" ry="4" width="250" height="53" />
    <rect x="258" y="48" rx="4" ry="4" width="250" height="53" />
  </ContentLoader>
)

export default NoteResourcesListLoaderMobile

